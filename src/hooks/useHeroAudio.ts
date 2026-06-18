import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'zyvora-sound'
const TARGET_VOL  = 0.45
const FADE_IN     = 1.6
const FADE_OUT    = 0.8

// Playback map:
//  ① Start at 1:13 (73s), play for 20 s  →  ends at 93s
//  ② Jump to 30s, play to end of track
//  ③ On every subsequent loop, restart from 30s
const INTRO_START = 73
const INTRO_END   = 93
const LOOP_FROM   = 30

// Wait until the audio can seek to `target` seconds
function waitSeekable(audio: HTMLAudioElement, target: number): Promise<void> {
  return new Promise(resolve => {
    const ready = () => {
      for (let i = 0; i < audio.seekable.length; i++) {
        if (audio.seekable.end(i) >= target) return true
      }
      return false
    }
    if (ready()) { resolve(); return }
    const check = () => { if (ready()) { off(); resolve() } }
    const off   = () => {
      audio.removeEventListener('progress',  check)
      audio.removeEventListener('canplay',   check)
      audio.removeEventListener('loadeddata', check)
    }
    audio.addEventListener('progress',   check)
    audio.addEventListener('canplay',    check)
    audio.addEventListener('loadeddata', check)
    setTimeout(() => { off(); resolve() }, 4000) // fallback
  })
}

export function useHeroAudio() {
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const audioRef    = useRef<HTMLAudioElement | null>(null)
  const ctxRef      = useRef<AudioContext | null>(null)
  const gainRef     = useRef<GainNode | null>(null)
  const readyRef    = useRef(false)
  const introDone   = useRef(false) // true once we've crossed INTRO_END once

  const fadeIn = useCallback(() => {
    const ctx = ctxRef.current, gain = gainRef.current
    if (!ctx || !gain) return
    // always resume — iOS/Chrome suspend AudioContext on page blur
    ctx.resume().catch(() => {})
    gain.gain.cancelScheduledValues(ctx.currentTime)
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(TARGET_VOL, ctx.currentTime + FADE_IN)
  }, [])

  const fadeOut = useCallback(() => {
    const ctx = ctxRef.current, gain = gainRef.current, audio = audioRef.current
    if (!ctx || !gain || !audio) return
    gain.gain.cancelScheduledValues(ctx.currentTime)
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + FADE_OUT)
    setTimeout(() => { audio.pause() }, (FADE_OUT + 0.1) * 1000)
  }, [])

  // ── Lazy init (runs once on first enable) ─────────────────
  const init = useCallback(async () => {
    if (readyRef.current) return
    readyRef.current = true
    setLoading(true)

    const audio = new Audio('/hero-audio.m4a')
    audio.loop    = false
    audio.preload = 'auto'
    audioRef.current = audio

    // intro guard: first playthrough jumps from INTRO_END → LOOP_FROM
    const onTimeUpdate = () => {
      if (audio.currentTime >= INTRO_END) {
        audio.removeEventListener('timeupdate', onTimeUpdate)
        introDone.current = true
        audio.currentTime = LOOP_FROM
      }
    }
    // every natural end → loop from LOOP_FROM
    const onEnded = () => {
      audio.currentTime = LOOP_FROM
      audio.play().catch(() => {})
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)

    const Ctx = window.AudioContext ??
      (window as never as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx  = new Ctx()
    const gain = ctx.createGain()
    gain.gain.value = 0
    ctx.createMediaElementSource(audio).connect(gain)
    gain.connect(ctx.destination)
    ctxRef.current  = ctx
    gainRef.current = gain

    // Resume AudioContext (required after user gesture, especially on iOS/Safari)
    await ctx.resume().catch(() => {})

    // Trigger load and wait until we can seek to INTRO_START before seeking
    audio.load()
    await waitSeekable(audio, INTRO_START)
    audio.currentTime = INTRO_START

    await audio.play().catch(() => {})
    setLoading(false)
  }, [])

  // ── Public toggle ──────────────────────────────────────────
  const toggle = useCallback(async () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')

    if (next) {
      await init()

      const audio = audioRef.current
      const ctx   = ctxRef.current
      if (!audio || !ctx) return

      // Resume context — may be suspended since last user interaction
      await ctx.resume().catch(() => {})

      if (audio.paused) {
        // If we already finished the intro but audio is stuck before LOOP_FROM,
        // jump to LOOP_FROM so we don't replay the pre-intro silence
        if (introDone.current && audio.currentTime < LOOP_FROM) {
          audio.currentTime = LOOP_FROM
        }
        await audio.play().catch(() => {})
      }
      fadeIn()
    } else {
      fadeOut()
    }
  }, [enabled, init, fadeIn, fadeOut])

  // ── Auto-restore on return visit ───────────────────────────
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== 'on') return
    const restore = async () => {
      cleanup()
      await init()
      fadeIn()
      setEnabled(true)
    }
    const cleanup = () => {
      window.removeEventListener('pointerdown', restore)
      window.removeEventListener('keydown',     restore)
    }
    window.addEventListener('pointerdown', restore, { once: true })
    window.addEventListener('keydown',     restore, { once: true })
    return cleanup
  }, [init, fadeIn])

  // ── Teardown ───────────────────────────────────────────────
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      ctxRef.current?.close().catch(() => {})
    }
  }, [])

  return { enabled, loading, toggle }
}

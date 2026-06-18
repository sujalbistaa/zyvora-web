import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'zyvora-sound'
const TARGET_VOL  = 0.45
const FADE_IN     = 1.6
const FADE_OUT    = 0.8

// Simple 20-second loop: 1:14 → 1:34, repeating forever
const LOOP_START = 74   // 1:14
const LOOP_END   = 94   // 1:14 + 20 s

export function useHeroAudio() {
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef   = useRef<AudioContext | null>(null)
  const gainRef  = useRef<GainNode | null>(null)
  const readyRef = useRef(false)

  const fadeIn = useCallback(() => {
    const ctx = ctxRef.current, gain = gainRef.current
    if (!ctx || !gain) return
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

    // Loop guard: when we reach LOOP_END, jump back to LOOP_START
    const onTimeUpdate = () => {
      if (audio.currentTime >= LOOP_END) {
        audio.currentTime = LOOP_START
      }
    }
    const onEnded = () => {
      audio.currentTime = LOOP_START
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

    await ctx.resume().catch(() => {})

    // Wait for metadata (just the file header — fast, <500ms).
    // After this the browser can make a targeted range-request for LOOP_START,
    // so playback streams continuously without 1-second buffer stalls.
    await new Promise<void>(resolve => {
      if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) { resolve(); return }
      audio.addEventListener('loadedmetadata', () => resolve(), { once: true })
      setTimeout(resolve, 3000) // fallback
    })

    audio.currentTime = LOOP_START
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
      await ctx.resume().catch(() => {})
      if (audio.paused) await audio.play().catch(() => {})
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

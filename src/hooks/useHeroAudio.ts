import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'zyvora-sound'
const TARGET_VOL  = 0.45
const FADE_IN     = 1.6
const FADE_OUT    = 0.8

// 20-second loop segment: 1:14 → 1:34
const LOOP_START = 74
const LOOP_END   = 94

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

  // Runs exactly once on first enable
  const init = useCallback(async () => {
    if (readyRef.current) return
    readyRef.current = true
    setLoading(true)

    const audio = new Audio('/hero-audio.m4a')
    audio.loop    = false
    audio.preload = 'auto'
    audioRef.current = audio

    // Strategy: start playing from position 0 immediately (browser already has
    // this data, no range request needed → no stall). Jump to LOOP_START on the
    // very first timeupdate tick (≤250ms). Gain is still 0 during that window
    // so the user hears nothing before the jump.
    let jumpedToLoop = false
    const onTimeUpdate = () => {
      if (!jumpedToLoop) {
        jumpedToLoop = true
        audio.currentTime = LOOP_START
        return
      }
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

    // Resume AudioContext (required after user gesture on iOS/Safari)
    await ctx.resume().catch(() => {})

    // Play from 0 — data is immediately available, no HTTP range request
    await audio.play().catch(() => {})
    setLoading(false)
  }, [])

  // Toggle — single clear code path, no competing listeners
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

  // Teardown
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      ctxRef.current?.close().catch(() => {})
    }
  }, [])

  return { enabled, loading, toggle }
}

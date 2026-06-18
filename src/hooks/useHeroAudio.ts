import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'zyvora-sound'
const TARGET_VOL   = 0.45
const FADE_IN      = 1.6   // seconds
const FADE_OUT     = 0.8

export function useHeroAudio() {
  const [enabled, setEnabled]   = useState(false)
  const [loading, setLoading]   = useState(false)

  const audioRef  = useRef<HTMLAudioElement | null>(null)
  const ctxRef    = useRef<AudioContext | null>(null)
  const gainRef   = useRef<GainNode | null>(null)
  const readyRef  = useRef(false)

  // ── Lazy init (only inside a user-gesture) ──────────────────
  const init = useCallback(async () => {
    if (readyRef.current) return
    readyRef.current = true
    setLoading(true)

    const audio = new Audio('/hero-audio.m4a')
    audio.loop    = true
    audio.preload = 'auto'
    audioRef.current = audio

    const Ctx = window.AudioContext ?? (window as never as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx  = new Ctx()
    const gain = ctx.createGain()
    gain.gain.value = 0
    ctx.createMediaElementSource(audio).connect(gain)
    gain.connect(ctx.destination)

    ctxRef.current  = ctx
    gainRef.current = gain

    audio.currentTime = 21
    await audio.play().catch(() => {})
    setLoading(false)
  }, [])

  const fadeIn = useCallback(() => {
    const ctx = ctxRef.current, gain = gainRef.current
    if (!ctx || !gain) return
    if (ctx.state === 'suspended') ctx.resume()
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

  // ── Public toggle ────────────────────────────────────────────
  const toggle = useCallback(async () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')

    if (next) {
      await init()
      if (audioRef.current?.paused) audioRef.current?.play().catch(() => {})
      fadeIn()
    } else {
      fadeOut()
    }
  }, [enabled, init, fadeIn, fadeOut])

  // ── Auto-restore on return visit (waits for first interaction) ─
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

  // ── Teardown ─────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      ctxRef.current?.close().catch(() => {})
    }
  }, [])

  return { enabled, loading, toggle }
}

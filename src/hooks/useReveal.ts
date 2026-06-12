import { useEffect } from 'react'

/**
 * Adds the `in` class to every `.reveal` element as it scrolls into view,
 * with a small staggered delay. Respects prefers-reduced-motion.
 */
export function useReveal(): void {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (reduce) {
      els.forEach((el) => el.classList.add('in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])
}

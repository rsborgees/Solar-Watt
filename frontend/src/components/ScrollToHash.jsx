import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't scroll for us on navigation. This scrolls to the
// target section when a link carries a hash (e.g. "/#simular", including
// from a different page), and resets to the top on a plain page change.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

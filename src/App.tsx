import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Partner from './pages/Partner'
import Tournaments from './pages/Tournaments'
import Play from './pages/Play'
import Creators from './pages/Creators'
import Bots from './pages/Bots'
import Jerseys from './pages/Jerseys'
import SuperchatHub from './pages/SuperchatHub'
import Superchat from './pages/Superchat'
import SuperchatThanks from './pages/SuperchatThanks'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <div id="top" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/players" element={<Play />} />
        <Route path="/play" element={<Navigate to="/players" replace />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/jerseys" element={<Jerseys />} />
        <Route path="/superchat" element={<SuperchatHub />} />
        <Route path="/c/:slug" element={<Superchat />} />
        <Route path="/c/:slug/thanks" element={<SuperchatThanks />} />
      </Routes>
      <Footer />
    </>
  )
}

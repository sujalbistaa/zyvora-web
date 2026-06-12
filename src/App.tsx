import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Partner from './pages/Partner'
import Play from './pages/Play'
import SuperchatHub from './pages/SuperchatHub'
import Superchat from './pages/Superchat'
import SuperchatThanks from './pages/SuperchatThanks'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView()
        return
      }
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
        <Route path="/play" element={<Play />} />
        <Route path="/superchat" element={<SuperchatHub />} />
        <Route path="/c/:slug" element={<Superchat />} />
        <Route path="/c/:slug/thanks" element={<SuperchatThanks />} />
      </Routes>
      <Footer />
    </>
  )
}

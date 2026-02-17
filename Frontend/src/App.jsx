import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AudioProvider } from './hooks/useAudio'
import { useEffect } from 'react'

// Pages
import Home from './pages/Home'
import ProductDescription from './pages/ProductDescription'
import IslandMap from './pages/IslandMap'
import CountingIsland from './pages/islands/CountingIsland'
import AdditionIsland from './pages/islands/AdditionIsland'
import PatternIsland from './pages/islands/PatternIsland'
import ShapeIsland from './pages/islands/ShapeIsland'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

// Components
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function App() {
  // Clear all game data on app initialization (fresh start every time website is opened)
  useEffect(() => {
    localStorage.clear()
    sessionStorage.clear()
  }, [])

  return (
    <AudioProvider>
      <Router basename="/MathSense-Journey">
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<ProductDescription />} />
                <Route path="/islands" element={<IslandMap />} />
                <Route path="/islands/counting" element={<CountingIsland />} />
                <Route path="/islands/addition" element={<AdditionIsland />} />
                <Route path="/islands/pattern" element={<PatternIsland />} />
                <Route path="/islands/shape" element={<ShapeIsland />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </AudioProvider>
  )
}

export default App

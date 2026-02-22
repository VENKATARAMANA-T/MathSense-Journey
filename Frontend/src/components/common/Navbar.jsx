import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let lastScrollY = 0
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      lastScrollY = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Islands', path: '/islands' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Screenshots', path: '/screenshots' },
    { name: 'About', path: '/about' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? location.pathname === '/islands'
            ? 'bg-transparent'
            : 'bg-gradient-to-r from-indigo-50 via-sky-50 to-primary-50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-gradient-to-br from-ocean-400 to-primary-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
            >
              <span className="text-2xl">🏝️</span>
            </motion.div>
            <div className="hidden sm:block leading-tight">
              <h1 className={`text-xl font-display font-bold ${isScrolled 
                ? location.pathname === '/islands'
                  ? 'text-sky-900'
                  : 'text-ocean-700'
                : 'gradient-text'}`}>
                MathSense Journey
              </h1>
              <p className={`text-xs font-medium leading-none ${isScrolled 
                ? location.pathname === '/islands'
                  ? 'text-sky-800'
                  : 'text-ocean-600'
                : 'text-ocean-500'}`}>Learn Math with Joy</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-ocean-500 text-white shadow-lg'
                    : isScrolled 
                      ? location.pathname === '/islands'
                        ? 'text-sky-900 hover:bg-sky-300'
                        : 'text-ocean-700 hover:bg-ocean-100'
                      : 'text-ocean-600 hover:bg-ocean-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              className={`ml-4 w-10 h-10 bg-gradient-to-br from-peach-400 to-lavender-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-110 transition-all ${isScrolled ? 'scale-100' : 'scale-95'} ${location.pathname === '/islands' && isScrolled ? 'opacity-90' : ''}`}
            >
              👤
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled 
              ? location.pathname === '/islands'
                ? 'hover:bg-sky-300'
                : 'hover:bg-ocean-100'
              : 'hover:bg-ocean-50'}`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 rounded transition-all ${isScrolled ? location.pathname === '/islands' ? 'bg-sky-900' : 'bg-ocean-700' : 'bg-ocean-600'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 rounded transition-all ${isScrolled ? location.pathname === '/islands' ? 'bg-sky-900' : 'bg-ocean-700' : 'bg-ocean-600'} ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 rounded transition-all ${isScrolled ? location.pathname === '/islands' ? 'bg-sky-900' : 'bg-ocean-700' : 'bg-ocean-600'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-semibold transition-all ${
                  location.pathname === link.path
                    ? 'bg-ocean-500 text-white'
                    : 'text-ocean-700 hover:bg-ocean-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar

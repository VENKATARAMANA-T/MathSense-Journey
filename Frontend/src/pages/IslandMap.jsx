import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAudio } from '../hooks/useAudio'

const IslandMap = () => {
  const defaultProgress = {
    counting: { completed: false, stars: 0 },
    addition: { completed: false, stars: 0 },
    pattern: { completed: false, stars: 0 },
    shape: { completed: false, stars: 0 }
  }

  const [progress, setProgress] = useState(defaultProgress)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [accuracy, setAccuracy] = useState(0)
  const { speak, playSound } = useAudio()

  useEffect(() => {
    // Check if this is a new browser session
    const sessionID = sessionStorage.getItem('sessionID')
    
    if (!sessionID) {
      // New session - reset progress and start fresh from Counting Island
      // Clear all previous data completely
      localStorage.clear()
      sessionStorage.clear()
      sessionStorage.setItem('sessionID', Date.now().toString())
      setProgress(defaultProgress)
      setAccuracy(0)
    } else {
      // Same session - load progress from localStorage and merge with defaults
      const savedProgress = localStorage.getItem('islandProgress')
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress)
          setProgress({ ...defaultProgress, ...parsed })
        } catch (e) {
          console.error('Failed to parse saved progress:', e)
          setProgress(defaultProgress)
        }
      } else {
        setProgress(defaultProgress)
      }
      
      // Load accuracy from islandStats
      const savedStats = JSON.parse(localStorage.getItem('islandStats')) || {}
      let totalCorrect = 0
      let totalWrong = 0
      Object.values(savedStats).forEach(stats => {
        totalCorrect += stats.correct || 0
        totalWrong += stats.wrong || 0
      })
      const acc = totalCorrect + totalWrong > 0 ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0
      setAccuracy(acc)
    }
    
    // Mouse parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Update accuracy in real-time when returning from islands
  useEffect(() => {
    const updateAccuracy = () => {
      const savedStats = JSON.parse(localStorage.getItem('islandStats')) || {}
      let totalCorrect = 0
      let totalWrong = 0
      Object.values(savedStats).forEach(stats => {
        totalCorrect += stats.correct || 0
        totalWrong += stats.wrong || 0
      })
      const acc = totalCorrect + totalWrong > 0 ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0
      setAccuracy(acc)
    }

    const interval = setInterval(updateAccuracy, 500)
    return () => clearInterval(interval)
  }, [])

  const islands = [
    {
      id: 'counting',
      name: 'Counting Island',
      path: '/islands/counting',
      emoji: '1️⃣',
      color: 'from-ocean-400 to-primary-500',
      description: 'Learn to count with fun objects!',
      position: { top: '45%', left: '15%' },
      size: 'large'
    },
    {
      id: 'addition',
      name: 'Addition Island',
      path: '/islands/addition',
      emoji: '➕',
      color: 'from-mint-400 to-ocean-400',
      description: 'Combine groups and discover sums!',
      position: { top: '30%', left: '40%' },
      size: 'large'
    },
    {
      id: 'pattern',
      name: 'Pattern Island',
      path: '/islands/pattern',
      emoji: '🔵',
      color: 'from-lavender-400 to-primary-500',
      description: 'Complete exciting patterns!',
      position: { top: '55%', left: '65%' },
      size: 'medium'
    },
    {
      id: 'shape',
      name: 'Shape Island',
      path: '/islands/shape',
      emoji: '🔺',
      color: 'from-peach-400 to-lavender-400',
      description: 'Explore wonderful shapes!',
      position: { top: '20%', left: '75%' },
      size: 'medium'
    }
  ]

  const handleIslandClick = (island) => {
    if (!progress[island.id].completed) {
      playSound('click')
      speak(`Welcome to ${island.name}! Let's start learning!`)
    }
  }

  const isIslandLocked = (island) => {
    // Counting island is always unlocked
    if (island.id === 'counting') return false
    // Addition unlocks after counting
    if (island.id === 'addition') return !progress.counting.completed
    // Pattern unlocks after addition
    if (island.id === 'pattern') return !progress.addition.completed
    // Shape unlocks after pattern
    if (island.id === 'shape') return !progress.pattern.completed
    return false
  }

  return (
    <div className="min-h-screen pt-20 overflow-hidden relative">
      {/* Animated Ocean Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-sky-200 via-ocean-100 to-ocean-200 -z-10">
        {/* Animated waves */}
        <div className="absolute bottom-0 w-full h-64 opacity-50">
          <motion.div
            className="absolute w-[200%] h-full bg-gradient-to-r from-ocean-300 to-primary-300 rounded-t-full"
            animate={{
              x: ['-50%', '0%', '-50%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              y: mousePosition.y * 0.1
            }}
          />
        </div>

        {/* Floating clouds */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-40"
            style={{
              top: `${10 + i * 15}%`,
              left: `${-10 + i * 20}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            ☁️
          </motion.div>
        ))}

        {/* Sun */}
        <motion.div
          className="absolute top-10 right-20 text-8xl"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity }
          }}
        >
          ☀️
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-display font-bold gradient-text mb-4">
            🏝️ Learning Islands 🏝️
          </h1>
          <p className="text-xl text-ocean-700 font-semibold">
            Choose an island to start your math adventure!
          </p>
          
          {/* Progress Summary */}
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-2xl mr-2">⭐</span>
              <span className="font-bold text-ocean-800">
                {Object.values(progress).reduce((sum, island) => sum + island.stars, 0)} Stars Collected
              </span>
            </div>
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-2xl mr-2">🏆</span>
              <span className="font-bold text-ocean-800">
                {Object.values(progress).filter(island => island.completed).length} Islands Completed
              </span>
            </div>
          </div>
        </motion.div>

        {/* Island Map - Relative positioned islands */}
        <div className="relative h-[600px] mt-20">
          {islands.map((island, index) => {
            const locked = isIslandLocked(island)
            const completed = progress[island.id].completed
            const stars = progress[island.id].stars

            return (
              <motion.div
                key={island.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, type: 'spring' }}
                className="absolute"
                style={{
                  top: island.position.top,
                  left: island.position.left,
                  transform: `translate(-50%, -50%)`
                }}
              >
                {/* Connection Path (if previous island completed) */}
                {index > 0 && !isIslandLocked(islands[index - 1]) && (
                  <svg className="absolute -z-10" style={{ top: '-100px', left: '-100px' }} width="200" height="200">
                    <motion.path
                      d="M 100 100 Q 50 50 0 0"
                      stroke="#0ea5e9"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: completed ? 1 : 0 }}
                      transition={{ duration: 1 }}
                    />
                  </svg>
                )}

                <motion.div
                  whileHover={!locked ? { scale: 1.1, rotate: 5 } : {}}
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                  style={{
                    x: mousePosition.x * (0.1 + index * 0.05),
                    y: mousePosition.y * (0.1 + index * 0.05)
                  }}
                >
                  {locked ? (
                    // Locked Island
                    <div className="relative">
                      <div className={`w-48 h-48 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex flex-col items-center justify-center shadow-2xl opacity-60 cursor-not-allowed`}>
                        <div className="text-6xl mb-2 filter grayscale">🔒</div>
                        <p className="text-sm font-semibold text-gray-600 text-center px-4">
                          Complete previous island
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Unlocked Island
                    <Link to={island.path} onClick={() => handleIslandClick(island)}>
                      <div className="relative group">
                        <div className={`w-56 h-56 bg-gradient-to-br ${island.color} rounded-full flex flex-col items-center justify-center shadow-2xl group-hover:shadow-ocean-400/50 transition-all cursor-pointer relative overflow-hidden`}>
                          {/* Shimmer effect on hover */}
                          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="text-7xl mb-2 group-hover:scale-110 transition-transform">
                            {island.emoji}
                          </div>
                          <h3 className="font-display font-bold text-white text-xl text-center px-4 drop-shadow-lg">
                            {island.name}
                          </h3>
                          <p className="text-white/90 text-sm text-center px-4 mt-2">
                            {island.description}
                          </p>

                          {/* Stars earned */}
                          {completed && (
                            <div className="absolute top-4 right-4 flex gap-1">
                              {[...Array(3)].map((_, i) => (
                                <span key={i} className={`text-2xl ${i < stars ? '' : 'opacity-30'}`}>
                                  ⭐
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Completed badge */}
                          {completed && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full text-sm font-bold text-ocean-600 shadow-lg">
                              ✓ Completed
                            </div>
                          )}
                        </div>

                        {/* Floating particles around island */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-white rounded-full"
                              style={{
                                top: `${25 + i * 20}%`,
                                left: `${20 + i * 15}%`,
                              }}
                              animate={{
                                y: [-10, 10, -10],
                                opacity: [0.3, 0.7, 0.3],
                                scale: [1, 1.5, 1]
                              }}
                              transition={{
                                duration: 2 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="glass max-w-2xl mx-auto p-8 rounded-3xl">
            <h3 className="text-2xl font-display font-bold text-ocean-800 mb-4">
              🎯 How to Navigate
            </h3>
            <div className="space-y-3 text-ocean-700 text-left">
              <p className="flex items-start">
                <span className="text-2xl mr-3">1️⃣</span>
                <span>Click on any <strong>unlocked island</strong> to start learning</span>
              </p>
              <p className="flex items-start">
                <span className="text-2xl mr-3">2️⃣</span>
                <span>Complete activities to earn <strong>stars ⭐</strong></span>
              </p>
              <p className="flex items-start">
                <span className="text-2xl mr-3">3️⃣</span>
                <span>Unlock new islands by finishing previous ones</span>
              </p>
              <p className="flex items-start">
                <span className="text-2xl mr-3">4️⃣</span>
                <span>Take your time - there's no rush! 😊</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick access to dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <Link to="/dashboard">
            <button className="btn-secondary text-lg">
              📊 View My Progress
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default IslandMap

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useScreenshot } from '../../hooks/useScreenshot'
import { useNavigate } from 'react-router-dom'

const ShapeIsland = () => {
  // Initialize level from localStorage if available
  const getInitialLevel = () => {
    const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
    return currentProgress.shape?.currentLevel || 1
  }

  const [targetShape, setTargetShape] = useState('circle')
  const [shapeOptions, setShapeOptions] = useState([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(getInitialLevel())
  const [showCelebration, setShowCelebration] = useState(false)
  const [accuracy, setAccuracy] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [askedShapes, setAskedShapes] = useState([])
  
  const { speak, playSound, playCelebration } = useAudio()
  const { captureElement } = useScreenshot()
  const navigate = useNavigate()

  const allShapes = [
    { name: 'circle', emoji: '🔵', path: 'M 50 20 A 30 30 0 1 1 49.99 20', color: 'from-ocean-400 to-primary-500' },
    { name: 'square', emoji: '🟥', path: 'M 25 25 L 75 25 L 75 75 L 25 75 Z', color: 'from-peach-400 to-lavender-400' },
    { name: 'triangle', emoji: '🔺', path: 'M 50 15 L 80 75 L 20 75 Z', color: 'from-mint-400 to-ocean-400' },
    { name: 'rectangle', emoji: '📦', path: 'M 15 35 L 85 35 L 85 65 L 15 65 Z', color: 'from-cyan-400 to-blue-400' },
    { name: 'star', emoji: '⭐', path: 'M 50 15 L 60 40 L 86 40 L 67 56 L 76 81 L 50 65 L 24 81 L 33 56 L 14 40 L 40 40 Z', color: 'from-yellow-400 to-orange-400' },
  ]

  // Generate options including the target shape
  const generateOptions = (targetShapeName) => {
    // Get all shapes except the target
    const otherShapes = allShapes.filter(shape => shape.name !== targetShapeName)
    // Randomly pick 2 other shapes
    const randomOthers = []
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * otherShapes.length)
      randomOthers.push(otherShapes[randomIndex])
      otherShapes.splice(randomIndex, 1)
    }
    // Combine target with 2 random shapes and shuffle
    const targetShapeObj = allShapes.find(s => s.name === targetShapeName)
    const options = [targetShapeObj, ...randomOthers].sort(() => Math.random() - 0.5)
    setShapeOptions(options)
  }

  // Initialize new level with random shape and options
  useEffect(() => {
    // Get shapes that haven't been asked yet
    let availableShapes = allShapes.filter(shape => !askedShapes.includes(shape.name))
    
    // If all shapes have been asked, reset and use all shapes
    if (availableShapes.length === 0) {
      availableShapes = allShapes
      setAskedShapes([])
    }
    
    // Pick a random shape from available ones
    const randomShape = availableShapes[Math.floor(Math.random() * availableShapes.length)]
    
    // Add to asked shapes
    setAskedShapes(prev => [...prev, randomShape.name])
    
    setTargetShape(randomShape.name)
    generateOptions(randomShape.name)
    setShowFeedback(false)
    setAttempts(0)
    speak(`Find the ${randomShape.name}!`)
  }, [level])

  // Track level progress in real-time
  useEffect(() => {
    const levelProgress = (level / 5) * 100
    const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
    if (!currentProgress.shape) currentProgress.shape = { completed: false, stars: 0 }
    currentProgress.shape.levelProgress = Math.min(levelProgress, 100)
    currentProgress.shape.currentLevel = level
    localStorage.setItem('islandProgress', JSON.stringify(currentProgress))
  }, [level])

  const handleShapeClick = (shapeName) => {
    if (showFeedback) return
    
    setAttempts(prev => prev + 1)
    const correct = shapeName === targetShape
    setIsCorrect(correct)
    setShowFeedback(true)
    
    // Track stats in localStorage
    const currentStats = JSON.parse(localStorage.getItem('islandStats')) || {
      counting: { correct: 0, wrong: 0 },
      addition: { correct: 0, wrong: 0 },
      pattern: { correct: 0, wrong: 0 },
      shape: { correct: 0, wrong: 0 }
    }
    currentStats.shape[correct ? 'correct' : 'wrong'] += 1
    localStorage.setItem('islandStats', JSON.stringify(currentStats))

    if (correct) {
      playSound('success')
      playCelebration()
      speak(`Correct! That's a ${shapeName}!`)
      setScore(prev => prev + 10)
      
      setTimeout(() => {
        if (level < 5) {
          setLevel(prev => prev + 1)
        } else {
          speak('You completed Shape Island!')
          setShowCelebration(true)
        }
      }, 2000)
    } else {
      playSound('error')
      speak(`That's not a ${targetShape}. Try again!`)
      
      setTimeout(() => {
        setShowFeedback(false)
      }, 1500)
    }
  }

  // Save progress when island is completed
  useEffect(() => {
    if (showCelebration) {
      const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
      const updatedProgress = {
        ...currentProgress,
        shape: { completed: true, stars: Math.min(Math.floor(score / 10), 3) }
      }
      localStorage.setItem('islandProgress', JSON.stringify(updatedProgress))
      
      // Calculate accuracy for this session
      const currentStats = JSON.parse(localStorage.getItem('islandStats')) || {
        counting: { correct: 0, wrong: 0 },
        addition: { correct: 0, wrong: 0 },
        pattern: { correct: 0, wrong: 0 },
        shape: { correct: 0, wrong: 0 }
      }
      const islandTotal = currentStats.shape.correct + currentStats.shape.wrong
      const islandAccuracy = islandTotal > 0 ? Math.round((currentStats.shape.correct / islandTotal) * 100) : 0
      setAccuracy(islandAccuracy)
    }
  }, [showCelebration])

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-peach-50 via-lavender-50 to-ocean-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-display font-bold gradient-text mb-2">🔺 Shape Island</h1>
          <p className="text-xl text-ocean-600">Find and match the shapes!</p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-ocean-700">Level {level} of 5</span>
            <span className="text-sm font-semibold text-ocean-700">Score: {score}</span>
          </div>
          <div className="w-full bg-ocean-100 rounded-full h-4">
            <div 
              className="progress-bar h-4"
              style={{ width: `${(level / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="card min-h-[500px]">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-peach-400 to-lavender-400 text-white px-8 py-4 rounded-full shadow-lg">
              <p className="text-3xl font-display font-bold">Find the {targetShape.toUpperCase()}!</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {shapeOptions.map((shape, i) => (
              <motion.button key={shape.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                whileHover={!showFeedback ? { scale: 1.1, rotate: 5 } : {}}
                whileTap={!showFeedback ? { scale: 0.9 } : {}}
                onClick={() => handleShapeClick(shape.name)}
                disabled={showFeedback}
                className={`aspect-square bg-gradient-to-br ${shape.color} rounded-3xl shadow-2xl transition-all p-8 ${
                  showFeedback && shape.name === targetShape
                    ? isCorrect 
                      ? 'ring-4 ring-green-400 shadow-green-400/50'
                      : 'ring-4 ring-green-400'
                    : ''
                } disabled:cursor-not-allowed`}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d={shape.path} fill="white" stroke="white" strokeWidth="0.5" />
                </svg>
              </motion.button>
            ))}
          </div>

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mt-8 text-center"
            >
              {isCorrect ? (
                <div className="text-6xl mb-4">✅</div>
              ) : (
                <div className="text-6xl mb-4">❌</div>
              )}
            </motion.div>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => navigate('/islands')} className="btn-secondary">← Back to Islands</button>
          <button onClick={() => { setScore(0); setLevel(1); setShowCelebration(false); setAskedShapes([]) }} className="btn-secondary">🔄 Restart</button>
        </div>

        {/* Completion Celebration */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowCelebration(false)}
            >
              <motion.div
                id="achievement-certificate"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="bg-white rounded-3xl p-12 max-w-md text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-9xl mb-6"
                >
                  🏆
                </motion.div>
                <h2 className="text-4xl font-display font-bold gradient-text mb-4">
                  Island Complete!
                </h2>
                <p className="text-xl text-ocean-700 mb-6">
                  You earned <span className="font-bold text-ocean-800">{score}</span> points!
                </p>
                <p className="text-lg text-ocean-600 mb-2">
                  Great job matching! 🎉
                </p>
                <p className="text-sm text-ocean-500 mb-6">
                  Accuracy: {accuracy}%
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={async () => {
                      await captureElement('achievement-certificate', {
                        islandName: 'Shape',
                        score: score,
                        accuracy: accuracy
                      })
                      alert('Screenshot saved! Check the Screenshots page.')
                    }}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    📸 Capture
                  </button>
                  <button
                    onClick={() => navigate('/islands')}
                    className="btn-primary"
                  >
                    Back to Islands
                  </button>
                  <button
                    onClick={() => { setShowCelebration(false); setScore(0); setLevel(1); setAskedShapes([]) }}
                    className="btn-secondary"
                  >
                    Play Again
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ShapeIsland

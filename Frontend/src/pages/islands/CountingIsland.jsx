import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useNavigate } from 'react-router-dom'

const CountingIsland = () => {
  // Initialize level from localStorage if available
  const getInitialLevel = () => {
    const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
    return currentProgress.counting?.currentLevel || 1
  }

  const [level, setLevel] = useState(getInitialLevel())
  const [targetNumber, setTargetNumber] = useState(3)
  const [selectedCount, setSelectedCount] = useState(0)
  const [objects, setObjects] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [accuracy, setAccuracy] = useState(0)
  
  const { speak, playSound, playCelebration } = useAudio()
  const navigate = useNavigate()

  const emojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍉', '🍑', '🥝']

  useEffect(() => {
    initializeLevel()
  }, [level])

  // Track level progress in real-time
  useEffect(() => {
    const levelProgress = (level / 5) * 100
    const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
    if (!currentProgress.counting) currentProgress.counting = { completed: false, stars: 0 }
    currentProgress.counting.levelProgress = Math.min(levelProgress, 100)
    currentProgress.counting.currentLevel = level
    localStorage.setItem('islandProgress', JSON.stringify(currentProgress))
  }, [level])

  const initializeLevel = () => {
    const count = Math.min(3 + level, 10)
    setTargetNumber(count)
    setSelectedCount(0)
    setShowFeedback(false)
    
    // Generate objects in grid layout
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const newObjects = Array(count + 2).fill(null).map((_, i) => ({
      id: i,
      emoji: emoji,
      selected: false
    }))
    setObjects(newObjects)
    
    speak(`Count ${count} ${emoji}`)
  }

  const toggleObject = (id) => {
    if (showFeedback) return

    const updatedObjects = objects.map(obj => 
      obj.id === id ? { ...obj, selected: !obj.selected } : obj
    )
    
    const count = updatedObjects.filter(obj => obj.selected).length
    setObjects(updatedObjects)
    setSelectedCount(count)
    playSound('click')
  }

  const checkAnswer = () => {
    setAttempts(prev => prev + 1)
    const correct = selectedCount === targetNumber
    setIsCorrect(correct)
    setShowFeedback(true)

    // Track stats in localStorage
    const currentStats = JSON.parse(localStorage.getItem('islandStats')) || {
      counting: { correct: 0, wrong: 0 },
      addition: { correct: 0, wrong: 0 },
      pattern: { correct: 0, wrong: 0 },
      shape: { correct: 0, wrong: 0 }
    }
    currentStats.counting[correct ? 'correct' : 'wrong'] += 1
    localStorage.setItem('islandStats', JSON.stringify(currentStats))

    if (correct) {
      playSound('success')
      playCelebration()
      speak('Amazing! You counted correctly!')
      setScore(prev => prev + 10)
      
      setTimeout(() => {
        if (level < 5) {
          setLevel(prev => prev + 1)
        } else {
          setShowCelebration(true)
          speak('Congratulations! You completed Counting Island!')
        }
      }, 2000)
    } else {
      playSound('error')
      speak(`Not quite! Try counting again. We need ${targetNumber}.`)
      
      setTimeout(() => {
        setShowFeedback(false)
        setObjects(objects.map(obj => ({ ...obj, selected: false })))
        setSelectedCount(0)
      }, 2000)
    }
  }

  // Save progress when island is completed
  useEffect(() => {
    if (showCelebration) {
      const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
      const updatedProgress = {
        ...currentProgress,
        counting: { completed: true, stars: Math.min(Math.floor(score / 10), 3) }
      }
      localStorage.setItem('islandProgress', JSON.stringify(updatedProgress))
      
      // Calculate accuracy for this session
      const currentStats = JSON.parse(localStorage.getItem('islandStats')) || {
        counting: { correct: 0, wrong: 0 },
        addition: { correct: 0, wrong: 0 },
        pattern: { correct: 0, wrong: 0 },
        shape: { correct: 0, wrong: 0 }
      }
      const islandTotal = currentStats.counting.correct + currentStats.counting.wrong
      const islandAccuracy = islandTotal > 0 ? Math.round((currentStats.counting.correct / islandTotal) * 100) : 0
      setAccuracy(islandAccuracy)
    }
  }, [showCelebration])

  const resetActivity = () => {
    setLevel(1)
    setScore(0)
    setAttempts(0)
    setShowCelebration(false)
    initializeLevel()
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-ocean-50 via-primary-50 to-mint-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-2">
            🏝️ Counting Island
          </h1>
          <p className="text-xl text-ocean-600">Click on the objects to count them!</p>
        </motion.div>

        {/* Progress Bar */}
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

        {/* Main Game Area */}
        <div className="card min-h-[500px] relative">
          {/* Instruction */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mb-8"
          >
            <div className="inline-block bg-gradient-to-r from-ocean-400 to-primary-500 text-white px-8 py-4 rounded-full shadow-lg">
              <p className="text-2xl font-display font-bold">
                Count {targetNumber} objects!
              </p>
            </div>
          </motion.div>

          {/* Objects to count */}
          <div className="bg-gradient-to-br from-sky-100 to-ocean-100 rounded-2xl p-8 mb-6">
            <div className="grid grid-cols-4 gap-8 justify-items-center">
              <AnimatePresence>
                {objects.map((obj, index) => (
                  <motion.button
                    key={obj.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: obj.selected ? 1.2 : 1,
                      rotate: 0
                    }}
                    exit={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: obj.selected ? 1.3 : 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ 
                      type: 'spring', 
                      delay: index * 0.1,
                      duration: 0.5
                    }}
                    onClick={() => toggleObject(obj.id)}
                    className={`text-6xl cursor-pointer transition-all ${
                      obj.selected ? 'filter drop-shadow-2xl' : ''
                    }`}
                    disabled={showFeedback}
                  >
                    <div className="relative">
                      {obj.emoji}
                      {obj.selected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-mint-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg"
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Count Display */}
          <div className="text-center mb-6">
            <div className="inline-block glass px-8 py-4 rounded-2xl">
              <p className="text-sm text-ocean-600 mb-1">Your Count:</p>
              <p className="text-5xl font-display font-bold text-ocean-800">
                {selectedCount}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          {!showFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <button
                onClick={checkAnswer}
                disabled={selectedCount === 0}
                className={`btn-primary text-xl ${selectedCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Check My Answer ✓
              </button>
            </motion.div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute inset-0 flex items-center justify-center ${
                  isCorrect ? 'bg-mint-500/90' : 'bg-peach-500/90'
                } rounded-2xl`}
              >
                <div className="text-center text-white">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: 3, duration: 0.5 }}
                    className="text-9xl mb-4"
                  >
                    {isCorrect ? '🎉' : '💪'}
                  </motion.div>
                  <h3 className="text-4xl font-display font-bold mb-2">
                    {isCorrect ? 'Correct!' : 'Try Again!'}
                  </h3>
                  <p className="text-2xl">
                    {isCorrect 
                      ? 'You counted perfectly!' 
                      : `Count ${targetNumber} objects`}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Emotion Check-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-ocean-600 mb-3 font-semibold">How are you feeling?</p>
          <div className="flex justify-center gap-4">
            {[
              { emoji: '😊', label: 'Happy' },
              { emoji: '😐', label: 'Okay' },
              { emoji: '😕', label: 'Confused' },
              { emoji: '😤', label: 'Frustrated' }
            ].map((mood) => (
              <button
                key={mood.label}
                className="emoji-btn hover:bg-ocean-100 transition-all"
                onClick={() => speak(`You're feeling ${mood.label}. That's okay!`)}
                title={mood.label}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/islands')}
            className="btn-secondary"
          >
            ← Back to Islands
          </button>
          <button
            onClick={resetActivity}
            className="btn-secondary"
          >
            🔄 Restart
          </button>
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
                <p className="text-lg text-ocean-600 mb-6">
                  Great job counting! 🎉
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigate('/islands')}
                    className="btn-primary"
                  >
                    Back to Islands
                  </button>
                  <button
                    onClick={resetActivity}
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

export default CountingIsland

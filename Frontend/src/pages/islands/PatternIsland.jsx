import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useScreenshot } from '../../hooks/useScreenshot'
import { useNavigate } from 'react-router-dom'

const PatternIsland = () => {
  // Initialize level from localStorage if available
  const getInitialLevel = () => {
    const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
    return currentProgress.pattern?.currentLevel || 1
  }

  const [pattern, setPattern] = useState([])
  const [userChoice, setUserChoice] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [level, setLevel] = useState(getInitialLevel())
  const [score, setScore] = useState(0)
  
  const { speak, playSound, playCelebration } = useAudio()
  const { captureElement } = useScreenshot()
  const navigate = useNavigate()

  const shapes = ['🔵', '🔴', '🟢', '🟡', '🟣', '🟠']
  const colors = ['from-ocean-400 to-primary-500', 'from-mint-400 to-ocean-400', 'from-peach-400 to-lavender-400']

  useEffect(() => {
    generatePattern()
  }, [level])

  // Track level progress in real-time
  useEffect(() => {
    const levelProgress = (level / 5) * 100
    const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
    if (!currentProgress.pattern) currentProgress.pattern = { completed: false, stars: 0 }
    currentProgress.pattern.levelProgress = Math.min(levelProgress, 100)
    currentProgress.pattern.currentLevel = level
    localStorage.setItem('islandProgress', JSON.stringify(currentProgress))
  }, [level])

  const generatePattern = () => {
    const patternLength = 3 + Math.floor(level / 2)
    const basePattern = shapes.slice(0, 2 + level % 2)
    const newPattern = []
    
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(basePattern[i % basePattern.length])
    }
    
    setCorrectAnswer(basePattern[patternLength % basePattern.length])
    setPattern(newPattern)
    setUserChoice(null)
    setShowFeedback(false)
    speak('What comes next in the pattern?')
  }

  const [showCelebration, setShowCelebration] = useState(false)
  const [accuracy, setAccuracy] = useState(0)

  const checkAnswer = (choice) => {
    setUserChoice(choice)
    const correct = choice === correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    // Track stats in localStorage
    const currentStats = JSON.parse(localStorage.getItem('islandStats')) || {
      counting: { correct: 0, wrong: 0 },
      addition: { correct: 0, wrong: 0 },
      pattern: { correct: 0, wrong: 0 },
      shape: { correct: 0, wrong: 0 }
    }
    currentStats.pattern[correct ? 'correct' : 'wrong'] += 1
    localStorage.setItem('islandStats', JSON.stringify(currentStats))

    if (correct) {
      playSound('success')
      playCelebration()
      speak('Perfect! You found the pattern!')
      setScore(prev => prev + 10)
      setTimeout(() => {
        if (level < 5) {
          setLevel(prev => prev + 1)
        } else {
          speak('You completed Pattern Island!')
          setShowCelebration(true)
        }
      }, 2000)
    } else {
      playSound('error')
      speak('Look at the pattern again!')
      setTimeout(() => setShowFeedback(false), 2000)
    }
  }

  // Save progress when island is completed
  useEffect(() => {
    if (showCelebration) {
      const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
      const updatedProgress = {
        ...currentProgress,
        pattern: { completed: true, stars: Math.min(Math.floor(score / 10), 3) }
      }
      localStorage.setItem('islandProgress', JSON.stringify(updatedProgress))
      
      // Calculate accuracy for this session
      const currentStats = JSON.parse(localStorage.getItem('islandStats')) || {
        counting: { correct: 0, wrong: 0 },
        addition: { correct: 0, wrong: 0 },
        pattern: { correct: 0, wrong: 0 },
        shape: { correct: 0, wrong: 0 }
      }
      const islandTotal = currentStats.pattern.correct + currentStats.pattern.wrong
      const islandAccuracy = islandTotal > 0 ? Math.round((currentStats.pattern.correct / islandTotal) * 100) : 0
      setAccuracy(islandAccuracy)
    }
  }, [showCelebration])

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-lavender-50 via-primary-50 to-ocean-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-display font-bold gradient-text mb-2">🔵 Pattern Island</h1>
          <p className="text-xl text-ocean-600">What comes next in the pattern?</p>
        </motion.div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-ocean-700">Level {level} of 5</span>
            <span className="text-sm font-semibold text-ocean-700">Score: {score}</span>
          </div>
          <div className="w-full bg-ocean-100 rounded-full h-4">
            <div className="progress-bar h-4" style={{ width: `${(level / 5) * 100}%` }} />
          </div>
        </div>

        <div className="card min-h-[500px]">
          <div className="text-center mb-12">
            <p className="text-2xl font-display font-semibold text-ocean-700 mb-6">Find the Next Shape:</p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {pattern.map((shape, i) => (
                <motion.div key={i} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * 0.15 }}
                  className={`w-20 h-20 bg-gradient-to-br ${colors[i % colors.length]} rounded-2xl flex items-center justify-center text-5xl shadow-lg`}
                >
                  {shape}
                </motion.div>
              ))}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: pattern.length * 0.15 }}
                className="w-20 h-20 border-4 border-dashed border-ocean-400 rounded-2xl flex items-center justify-center text-5xl"
              >
                ?
              </motion.div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-ocean-600 mb-4 font-semibold">Choose the Next Shape:</p>
            <div className="flex justify-center gap-6 flex-wrap">
              {shapes.slice(0, 3 + level % 3).map((shape, i) => (
                <motion.button key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => checkAnswer(shape)}
                  disabled={showFeedback}
                  className={`w-24 h-24 bg-gradient-to-br ${colors[i % colors.length]} rounded-2xl flex items-center justify-center text-6xl shadow-xl hover:shadow-2xl transition-all ${
                    userChoice === shape ? 'ring-4 ring-ocean-500' : ''
                  }`}
                >
                  {shape}
                </motion.button>
              ))}
            </div>
          </div>

          {showFeedback && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className={`absolute inset-0 flex items-center justify-center ${isCorrect ? 'bg-mint-500/90' : 'bg-peach-500/90'} rounded-2xl`}
            >
              <div className="text-center text-white">
                <div className="text-9xl mb-4">{isCorrect ? '🎉' : '🤔'}</div>
                <h3 className="text-4xl font-display font-bold mb-2">{isCorrect ? 'Amazing!' : 'Keep Trying!'}</h3>
                <p className="text-2xl">{isCorrect ? 'You found the pattern!' : 'Look closely at the sequence!'}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => navigate('/islands')} className="btn-secondary">← Back to Islands</button>
          <button onClick={() => { setLevel(1); setScore(0); setShowCelebration(false); generatePattern(); }} className="btn-secondary">🔄 Restart</button>
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
                  Great pattern solving! 🎉
                </p>
                <p className="text-sm text-ocean-500 mb-6">
                  Accuracy: {accuracy}%
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={async () => {
                      await captureElement('achievement-certificate', {
                        islandName: 'Pattern',
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
                    onClick={() => { setShowCelebration(false); setScore(0); setLevel(1); generatePattern() }}
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

export default PatternIsland

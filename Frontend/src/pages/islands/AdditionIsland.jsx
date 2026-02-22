import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useScreenshot } from '../../hooks/useScreenshot'
import { useNavigate } from 'react-router-dom'

const AdditionIsland = () => {
  // Initialize level from localStorage if available
  const getInitialLevel = () => {
    const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
    return currentProgress.addition?.currentLevel || 1
  }

  const [num1, setNum1] = useState(2)
  const [num2, setNum2] = useState(3)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [level, setLevel] = useState(getInitialLevel())
  const [score, setScore] = useState(0)
  
  const { speak, playSound, playCelebration } = useAudio()
  const { captureElement } = useScreenshot()
  const navigate = useNavigate()

  useEffect(() => {
    generateProblem()
  }, [level])

  // Track level progress in real-time
  useEffect(() => {
    const levelProgress = (level / 5) * 100
    const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
    if (!currentProgress.addition) currentProgress.addition = { completed: false, stars: 0 }
    currentProgress.addition.levelProgress = Math.min(levelProgress, 100)
    currentProgress.addition.currentLevel = level
    localStorage.setItem('islandProgress', JSON.stringify(currentProgress))
  }, [level])

  const generateProblem = () => {
    const max = Math.min(5 + level, 10)
    const n1 = Math.floor(Math.random() * max) + 1
    const n2 = Math.floor(Math.random() * max) + 1
    setNum1(n1)
    setNum2(n2)
    setUserAnswer('')
    setShowFeedback(false)
    speak(`What is ${n1} plus ${n2}?`)
  }

  const [showCelebration, setShowCelebration] = useState(false)
  const [accuracy, setAccuracy] = useState(0)

  const checkAnswer = () => {
    const correct = parseInt(userAnswer) === (num1 + num2)
    setIsCorrect(correct)
    setShowFeedback(true)

    // Track stats in localStorage
    const currentStats = JSON.parse(localStorage.getItem('islandStats')) || {
      counting: { correct: 0, wrong: 0 },
      addition: { correct: 0, wrong: 0 },
      pattern: { correct: 0, wrong: 0 },
      shape: { correct: 0, wrong: 0 }
    }
    currentStats.addition[correct ? 'correct' : 'wrong'] += 1
    localStorage.setItem('islandStats', JSON.stringify(currentStats))

    if (correct) {
      playSound('success')
      playCelebration()
      speak('Excellent! That\'s correct!')
      setScore(prev => prev + 10)
      setTimeout(() => {
        if (level < 5) setLevel(prev => prev + 1)
        else {
          speak('You completed Addition Island!')
          setShowCelebration(true)
        }
      }, 2000)
    } else {
      playSound('error')
      speak('Not quite. Try counting the objects!')
      setTimeout(() => setShowFeedback(false), 2000)
    }
  }

  // Save progress when island is completed
  useEffect(() => {
    if (showCelebration) {
      const currentProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
      const updatedProgress = {
        ...currentProgress,
        addition: { completed: true, stars: Math.min(Math.floor(score / 10), 3) }
      }
      localStorage.setItem('islandProgress', JSON.stringify(updatedProgress))
      
      // Calculate accuracy for this session
      const currentStats = JSON.parse(localStorage.getItem('islandStats')) || {
        counting: { correct: 0, wrong: 0 },
        addition: { correct: 0, wrong: 0 },
        pattern: { correct: 0, wrong: 0 },
        shape: { correct: 0, wrong: 0 }
      }
      const islandTotal = currentStats.addition.correct + currentStats.addition.wrong
      const islandAccuracy = islandTotal > 0 ? Math.round((currentStats.addition.correct / islandTotal) * 100) : 0
      setAccuracy(islandAccuracy)
    }
  }, [showCelebration])

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-mint-50 via-ocean-50 to-primary-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-display font-bold gradient-text mb-2">➕ Addition Island</h1>
          <p className="text-xl text-ocean-600">Combine groups to find the sum!</p>
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
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-mint-400 to-ocean-400 text-white px-8 py-4 rounded-full shadow-lg">
              <p className="text-3xl font-display font-bold">{num1} + {num2} = ?</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-12 mb-12">
            <div className="text-center">
              <p className="text-sm text-ocean-600 mb-3 font-semibold">First Group</p>
              <div className="flex flex-wrap gap-3 justify-center max-w-xs">
                {[...Array(num1)].map((_, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-mint-400 to-mint-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                  >
                    🍎
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-6xl font-bold text-ocean-500">+</div>

            <div className="text-center">
              <p className="text-sm text-ocean-600 mb-3 font-semibold">Second Group</p>
              <div className="flex flex-wrap gap-3 justify-center max-w-xs">
                {[...Array(num2)].map((_, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (num1 + i) * 0.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-ocean-400 to-ocean-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                  >
                    🍎
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-lg text-ocean-600 mb-3 font-semibold">Your Answer:</p>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
              className="w-32 h-20 text-5xl font-display font-bold text-center border-4 border-ocean-300 rounded-2xl focus:border-ocean-500 focus:outline-none"
              placeholder="?"
              disabled={showFeedback}
            />
          </div>

          {!showFeedback && (
            <div className="text-center">
              <button onClick={checkAnswer} disabled={!userAnswer} className={`btn-primary text-xl ${!userAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Check Answer ✓
              </button>
            </div>
          )}

          {showFeedback && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className={`absolute inset-0 flex items-center justify-center ${isCorrect ? 'bg-mint-500/90' : 'bg-peach-500/90'} rounded-2xl`}
            >
              <div className="text-center text-white">
                <div className="text-9xl mb-4">{isCorrect ? '🎉' : '💪'}</div>
                <h3 className="text-4xl font-display font-bold mb-2">{isCorrect ? 'Correct!' : 'Try Again!'}</h3>
                <p className="text-2xl">{isCorrect ? `${num1} + ${num2} = ${num1 + num2}` : 'Count all the apples!'}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => navigate('/islands')} className="btn-secondary">← Back to Islands</button>
          <button onClick={() => { setLevel(1); setScore(0); setShowCelebration(false); generateProblem(); }} className="btn-secondary">🔄 Restart</button>
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
                  Great job adding! 🎉
                </p>
                <p className="text-sm text-ocean-500 mb-6">
                  Accuracy: {accuracy}%
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={async () => {
                      await captureElement('achievement-certificate', {
                        islandName: 'Addition',
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
                    onClick={() => { setShowCelebration(false); setScore(0); setLevel(1); generateProblem() }}
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

export default AdditionIsland

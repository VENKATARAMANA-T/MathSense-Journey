import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStars: 0,
    islandsCompleted: 0,
    totalActivities: 4,
    streakDays: 0,
    accuracy: 0
  })

  const [islandStats, setIslandStats] = useState({
    counting: { correct: 0, wrong: 0 },
    addition: { correct: 0, wrong: 0 },
    pattern: { correct: 0, wrong: 0 },
    shape: { correct: 0, wrong: 0 }
  })

  const [islandProgress, setIslandProgress] = useState({
    counting: { progress: 0, stars: 0, completed: false },
    addition: { progress: 0, stars: 0, completed: false },
    pattern: { progress: 0, stars: 0, completed: false },
    shape: { progress: 0, stars: 0, completed: false }
  })

  const [recentAchievements, setRecentAchievements] = useState([])

  useEffect(() => {
    // Load all data from localStorage in real-time
    const updateDashboard = () => {
      // Check if this is a fresh session
      const sessionID = sessionStorage.getItem('sessionID')
      
      // If no session ID, reset to initial values (fresh start)
      if (!sessionID) {
        setStats({
          totalStars: 0,
          islandsCompleted: 0,
          totalActivities: 4,
          streakDays: 0,
          accuracy: 0
        })
        setIslandStats({
          counting: { correct: 0, wrong: 0 },
          addition: { correct: 0, wrong: 0 },
          pattern: { correct: 0, wrong: 0 },
          shape: { correct: 0, wrong: 0 }
        })
        setIslandProgress({
          counting: { progress: 0, stars: 0, completed: false },
          addition: { progress: 0, stars: 0, completed: false },
          pattern: { progress: 0, stars: 0, completed: false },
          shape: { progress: 0, stars: 0, completed: false }
        })
        setRecentAchievements([])
        return
      }

      // Load island progress
      const savedProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
      
      // Load island stats (correct/wrong answers)
      const savedStats = JSON.parse(localStorage.getItem('islandStats')) || {
        counting: { correct: 0, wrong: 0 },
        addition: { correct: 0, wrong: 0 },
        pattern: { correct: 0, wrong: 0 },
        shape: { correct: 0, wrong: 0 }
      }
      setIslandStats(savedStats)

      // Calculate total correct and wrong
      let totalCorrect = 0
      let totalWrong = 0
      let totalStars = 0
      let completedCount = 0

      Object.keys(savedStats).forEach(island => {
        totalCorrect += savedStats[island].correct
        totalWrong += savedStats[island].wrong
      })

      // Calculate accuracy
      const totalAttempts = totalCorrect + totalWrong
      const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

      // Update island progress
      const newProgress = {}
      Object.keys(savedProgress).forEach(island => {
        totalStars += savedProgress[island].stars || 0
        if (savedProgress[island].completed) completedCount += 1
        newProgress[island] = {
          progress: savedProgress[island].completed ? 100 : (savedProgress[island].levelProgress || 0),
          stars: savedProgress[island].stars || 0,
          completed: savedProgress[island].completed || false
        }
      })

      // Set default values for uncompleted islands
      if (!newProgress.counting) newProgress.counting = { progress: 0, stars: 0, completed: false }
      if (!newProgress.addition) newProgress.addition = { progress: 0, stars: 0, completed: false }
      if (!newProgress.pattern) newProgress.pattern = { progress: 0, stars: 0, completed: false }
      if (!newProgress.shape) newProgress.shape = { progress: 0, stars: 0, completed: false }

      setIslandProgress(newProgress)

      // Update stats
      setStats({
        totalStars,
        islandsCompleted: completedCount,
        totalActivities: 4,
        streakDays: completedCount > 0 ? 1 : 0,
        accuracy
      })

      // Generate recent achievements - only for island completions
      const achievements = []
      Object.keys(savedProgress).forEach(island => {
        if (savedProgress[island].completed) {
          const islandNames = {
            counting: 'Counting Island',
            addition: 'Addition Island',
            pattern: 'Pattern Island',
            shape: 'Shape Island'
          }
          achievements.push({
            icon: '🏝️',
            title: `${islandNames[island]} Completed!`,
            desc: `Earned ${savedProgress[island].stars} ⭐`,
            date: 'Today'
          })
        }
      })
      
      setRecentAchievements(achievements)
    }

    updateDashboard()
    // Set up interval to check for updates every second
    const interval = setInterval(updateDashboard, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-sky-50 via-ocean-50 to-lavender-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold gradient-text mb-2">📊 My Dashboard</h1>
          <p className="text-xl text-ocean-600">Track your amazing progress!</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Stars', value: stats.totalStars, icon: '⭐', color: 'from-peach-400 to-lavender-400' },
            { label: 'Islands Done', value: `${stats.islandsCompleted}/${stats.totalActivities}`, icon: '🏝️', color: 'from-ocean-400 to-primary-500' },
            { label: 'Streak', value: `${stats.streakDays} days`, icon: '🔥', color: 'from-mint-400 to-ocean-400' },
            { label: 'Accuracy', value: `${stats.accuracy}%`, icon: '🎯', color: 'from-lavender-400 to-primary-500' }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <p className="text-3xl font-display font-bold text-ocean-800 mb-1">{stat.value}</p>
              <p className="text-sm text-ocean-600 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Island Activity Chart */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="text-2xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-3xl mr-2">📊</span>
              Island Activity
            </h3>
            <div className="flex items-end justify-between gap-6 h-64">
              {Object.entries(islandStats).map(([island, data], i) => {
                const max = Math.max(data.correct, data.wrong, 5)
                const islandNames = {
                  counting: 'Counting',
                  addition: 'Addition',
                  pattern: 'Pattern',
                  shape: 'Shape'
                }
                return (
                  <div key={island} className="flex-1 flex flex-col items-center">
                    <div className="flex items-end justify-center gap-2 h-48 w-full">
                      {/* Correct answers (Green) */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.correct / max) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                        className="flex-1 bg-gradient-to-t from-mint-400 to-mint-500 rounded-t-lg shadow-lg hover:shadow-xl transition-all"
                        title={`Correct: ${data.correct}`}
                      />
                      {/* Wrong answers (Red) */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.wrong / max) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                        className="flex-1 bg-gradient-to-t from-peach-400 to-peach-500 rounded-t-lg shadow-lg hover:shadow-xl transition-all"
                        title={`Wrong: ${data.wrong}`}
                      />
                    </div>
                    <p className="text-xs text-ocean-600 font-semibold mt-3 text-center">{islandNames[island]}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-ocean-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-mint-400 rounded"></div>
                <span className="text-sm text-ocean-600">Correct</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-peach-400 rounded"></div>
                <span className="text-sm text-ocean-600">Wrong</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-2xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-3xl mr-2">🏆</span>
              Recent Achievements
            </h3>
            <div className="space-y-4">
              {recentAchievements.map((achievement, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-start bg-ocean-50 p-4 rounded-xl hover:bg-ocean-100 transition-colors"
                >
                  <div className="text-3xl mr-3">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-ocean-800">{achievement.title}</h4>
                    <p className="text-sm text-ocean-600">{achievement.desc}</p>
                    <p className="text-xs text-ocean-500 mt-1">{achievement.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Island Progress */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-2xl font-display font-bold text-ocean-800 mb-6 flex items-center">
            <span className="text-3xl mr-2">🏝️</span>
            Island Progress
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { id: 'counting', name: 'Counting Island', color: 'ocean', emoji: '1️⃣' },
              { id: 'addition', name: 'Addition Island', color: 'mint', emoji: '➕' },
              { id: 'pattern', name: 'Pattern Island', color: 'lavender', emoji: '🔵' },
              { id: 'shape', name: 'Shape Island', color: 'peach', emoji: '🔺' }
            ].map((island, i) => {
              const progress = islandProgress[island.id] || { progress: 0, stars: 0, completed: false }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="bg-ocean-50 p-6 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{island.emoji}</span>
                      <h4 className="font-bold text-ocean-800">{island.name}</h4>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, j) => (
                        <motion.span
                          key={j}
                          animate={{ scale: j < progress.stars ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`text-lg ${j < progress.stars ? '' : 'opacity-30'}`}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-ocean-200 rounded-full h-3 mb-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.progress}%` }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className={`h-3 bg-gradient-to-r from-${island.color}-400 to-${island.color}-600 rounded-full`}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-ocean-600 font-semibold">
                      {progress.completed ? '✓ Completed' : `${progress.progress}% Complete`}
                    </p>
                    {progress.completed && (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-lg"
                      >
                        🏆
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link to="/islands">
            <button className="btn-primary text-xl">Continue Learning 🚀</button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard

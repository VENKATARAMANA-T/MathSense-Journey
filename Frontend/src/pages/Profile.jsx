import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Math Explorer',
    avatar: '😊',
    level: 1,
    joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    favoriteIsland: 'Counting Island',
    totalStars: 0,
    accuracy: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  })

  const [badges, setBadges] = useState([])

  useEffect(() => {
    // Load all data from localStorage in real-time
    const updateProfile = () => {
      // Check if this is a fresh session
      const sessionID = sessionStorage.getItem('sessionID')
      
      // If no session ID, reset to initial values (fresh start)
      if (!sessionID) {
        setUser({
          name: 'Math Explorer',
          avatar: '😊',
          level: 1,
          joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
          favoriteIsland: 'Counting Island',
          totalStars: 0,
          accuracy: 0,
          correctAnswers: 0,
          wrongAnswers: 0
        })
        setBadges([])
        return
      }

      const savedProgress = JSON.parse(localStorage.getItem('islandProgress')) || {}
      const savedStats = JSON.parse(localStorage.getItem('islandStats')) || {
        counting: { correct: 0, wrong: 0 },
        addition: { correct: 0, wrong: 0 },
        pattern: { correct: 0, wrong: 0 },
        shape: { correct: 0, wrong: 0 }
      }

      // Calculate totals
      let totalStars = 0
      let completedIslands = 0
      let totalCorrect = 0
      let totalWrong = 0
      let favoriteIsland = 'Counting Island'

      Object.entries(savedProgress).forEach(([island, data]) => {
        totalStars += data.stars || 0
        if (data.completed) completedIslands += 1
      })

      Object.entries(savedStats).forEach(([_, data]) => {
        totalCorrect += data.correct || 0
        totalWrong += data.wrong || 0
      })

      const totalAttempts = totalCorrect + totalWrong
      const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

      // Determine favorite island (most practiced)
      let maxAttempts = 0
      Object.entries(savedStats).forEach(([island, data]) => {
        const attempts = data.correct + data.wrong
        if (attempts > maxAttempts) {
          maxAttempts = attempts
          const islandNames = {
            counting: 'Counting Island',
            addition: 'Addition Island',
            pattern: 'Pattern Island',
            shape: 'Shape Island'
          }
          favoriteIsland = islandNames[island]
        }
      })

      // Update badges based on which islands are completed
      const newBadges = []
      const badgeTemplates = [
        { icon: '🔵', name: 'Counting Island', desc: 'Complete' },
        { icon: '➕', name: 'Addition Island', desc: 'Complete' },
        { icon: '🔄', name: 'Pattern Island', desc: 'Complete' },
        { icon: '🔺', name: 'Shape Island', desc: 'Complete' }
      ]
      if (savedProgress.counting?.completed) newBadges.push(badgeTemplates[0])
      if (savedProgress.addition?.completed) newBadges.push(badgeTemplates[1])
      if (savedProgress.pattern?.completed) newBadges.push(badgeTemplates[2])
      if (savedProgress.shape?.completed) newBadges.push(badgeTemplates[3])

      setBadges(newBadges)

      setUser(prev => ({
        ...prev,
        totalStars,
        accuracy,
        correctAnswers: totalCorrect,
        wrongAnswers: totalWrong,
        favoriteIsland,
        level: completedIslands + 1
      }))
    }

    updateProfile()
    // Set up interval to check for updates every second
    const interval = setInterval(updateProfile, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-sky-50 via-ocean-50 to-lavender-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-ocean-400 to-primary-500 rounded-full flex items-center justify-center text-8xl mx-auto mb-6 shadow-2xl">
            {user.avatar}
          </div>
          <h1 className="text-5xl font-display font-bold gradient-text mb-2">{user.name}</h1>
          <p className="text-xl text-ocean-600">Level {user.level} Math Explorer</p>
          <p className="text-ocean-500 mt-2">Joined {user.joinDate}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Stars', value: user.totalStars, icon: '⭐' },
            { label: 'Accuracy', value: `${user.accuracy}%`, icon: '🎯' },
            { label: 'Correct', value: user.correctAnswers, icon: '✅' },
            { label: 'Level', value: user.level, icon: '📊' }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-display font-bold text-ocean-800">{stat.value}</p>
              <p className="text-sm text-ocean-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-2xl font-display font-bold text-ocean-800 mb-6 flex items-center">
            <span className="text-3xl mr-2">🏅</span>
            Badges & Achievements
          </h3>
          {badges.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-ocean-600 mb-2">No badges earned yet!</p>
              <p className="text-sm text-ocean-500">Complete islands to earn badges 🎉</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="p-6 rounded-2xl text-center bg-gradient-to-br from-ocean-50 to-primary-50 shadow-lg"
                >
                  <div className="text-5xl mb-3">{badge.icon}</div>
                  <h4 className="font-bold text-ocean-800 mb-1">{badge.name}</h4>
                  <p className="text-xs text-ocean-600">{badge.desc}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Favorite Island */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="card mt-8"
        >
          <h3 className="text-2xl font-display font-bold text-ocean-800 mb-4 flex items-center">
            <span className="text-3xl mr-2">❤️</span>
            Favorite Island
          </h3>
          <div className="bg-gradient-to-r from-ocean-400 to-primary-500 p-6 rounded-2xl text-white text-center">
            <p className="text-4xl mb-2">🏝️</p>
            <p className="text-2xl font-display font-bold">{user.favoriteIsland}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile

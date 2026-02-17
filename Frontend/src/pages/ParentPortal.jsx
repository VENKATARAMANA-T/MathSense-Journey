import { motion } from 'framer-motion'
import { useState } from 'react'

const ParentPortal = () => {
  const [childData, setChildData] = useState({
    name: 'Child Name',
    totalActivities: 24,
    averageAccuracy: 87,
    totalTime: 120,
    lastActive: 'Today at 2:30 PM',
    strongAreas: ['Counting', 'Pattern Recognition'],
    needsWork: ['Advanced Addition', 'Complex Patterns']
  })

  const sessionHistory = [
    { date: 'Feb 14, 2026', activity: 'Counting Island', duration: '15 min', accuracy: '95%', mood: '😊' },
    { date: 'Feb 13, 2026', activity: 'Addition Island', duration: '20 min', accuracy: '80%', mood: '😐' },
    { date: 'Feb 12, 2026', activity: 'Pattern Island', duration: '18 min', accuracy: '85%', mood: '😊' },
    { date: 'Feb 11, 2026', activity: 'Counting Island', duration: '12 min', accuracy: '100%', mood: '😊' },
  ]

  const emotionData = [
    { mood: '😊 Happy', count: 15, percentage: 62 },
    { mood: '😐 Neutral', count: 6, percentage: 25 },
    { mood: '😕 Confused', count: 2, percentage: 8 },
    { mood: '😤 Frustrated', count: 1, percentage: 5 }
  ]

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-sky-50 via-ocean-50 to-lavender-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold gradient-text mb-2">👨‍👩‍👧 Parent Portal</h1>
          <p className="text-xl text-ocean-600">Monitor your child's learning journey</p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Activities', value: childData.totalActivities, icon: '📚', color: 'ocean' },
            { label: 'Average Accuracy', value: `${childData.averageAccuracy}%`, icon: '🎯', color: 'mint' },
            { label: 'Total Time', value: `${childData.totalTime} min`, icon: '⏱️', color: 'lavender' },
            { label: 'Last Active', value: 'Today', icon: '🕐', color: 'peach' }
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Strengths & Areas for Growth */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="text-2xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-3xl mr-2">💪</span>
              Learning Insights
            </h3>
            
            <div className="mb-6">
              <h4 className="font-bold text-mint-600 mb-3 flex items-center">
                <span className="text-xl mr-2">✓</span>
                Strong Areas
              </h4>
              <div className="space-y-2">
                {childData.strongAreas.map((area, i) => (
                  <div key={i} className="bg-mint-50 px-4 py-2 rounded-lg text-mint-700 font-semibold">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-peach-600 mb-3 flex items-center">
                <span className="text-xl mr-2">📈</span>
                Needs Practice
              </h4>
              <div className="space-y-2">
                {childData.needsWork.map((area, i) => (
                  <div key={i} className="bg-peach-50 px-4 py-2 rounded-lg text-peach-700 font-semibold">
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Emotional Tracking */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="text-2xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-3xl mr-2">😊</span>
              Emotional State During Learning
            </h3>
            
            <div className="space-y-4">
              {emotionData.map((emotion, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-ocean-700 font-semibold">{emotion.mood}</span>
                    <span className="text-ocean-600">{emotion.count} sessions ({emotion.percentage}%)</span>
                  </div>
                  <div className="w-full bg-ocean-100 rounded-full h-3">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${emotion.percentage}%` }}
                      transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                      className="h-3 bg-gradient-to-r from-ocean-400 to-primary-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-ocean-50 p-4 rounded-xl">
              <p className="text-sm text-ocean-700">
                <strong>💡 Insight:</strong> Your child is mostly happy during learning sessions (62%), which is excellent! 
                The few confused moments are normal and show they're being challenged appropriately.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Session History */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-2xl font-display font-bold text-ocean-800 mb-6 flex items-center">
            <span className="text-3xl mr-2">📊</span>
            Recent Session History
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-ocean-100">
                <tr>
                  <th className="px-6 py-3 text-left text-ocean-800 font-bold">Date</th>
                  <th className="px-6 py-3 text-left text-ocean-800 font-bold">Activity</th>
                  <th className="px-6 py-3 text-left text-ocean-800 font-bold">Duration</th>
                  <th className="px-6 py-3 text-left text-ocean-800 font-bold">Accuracy</th>
                  <th className="px-6 py-3 text-left text-ocean-800 font-bold">Mood</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ocean-100">
                {sessionHistory.map((session, i) => (
                  <tr key={i} className="hover:bg-ocean-50 transition-colors">
                    <td className="px-6 py-4 text-ocean-700">{session.date}</td>
                    <td className="px-6 py-4 font-semibold text-ocean-800">{session.activity}</td>
                    <td className="px-6 py-4 text-ocean-600">{session.duration}</td>
                    <td className="px-6 py-4 text-ocean-600">{session.accuracy}</td>
                    <td className="px-6 py-4 text-2xl">{session.mood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="card mt-8 bg-gradient-to-r from-lavender-50 to-peach-50"
        >
          <h3 className="text-2xl font-display font-bold text-ocean-800 mb-6 flex items-center">
            <span className="text-3xl mr-2">💡</span>
            Recommendations
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl">
              <h4 className="font-bold text-ocean-800 mb-2">📚 Offline Practice</h4>
              <p className="text-ocean-600">
                Use physical counting objects (toys, blocks) to reinforce digital learning. This helps with generalization skills.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl">
              <h4 className="font-bold text-ocean-800 mb-2">⏰ Optimal Learning Time</h4>
              <p className="text-ocean-600">
                Based on activity patterns, your child performs best around 2:00-3:00 PM. Try scheduling learning during this window.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl">
              <h4 className="font-bold text-ocean-800 mb-2">🎯 Next Focus Area</h4>
              <p className="text-ocean-600">
                Consider more practice with Addition Island before moving to Pattern Island. Mastery builds confidence!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Export & Settings */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center gap-4"
        >
          <button className="btn-primary text-lg">📄 Export Report (PDF)</button>
          <button className="btn-secondary text-lg">⚙️ Configure Alerts</button>
        </motion.div>
      </div>
    </div>
  )
}

export default ParentPortal

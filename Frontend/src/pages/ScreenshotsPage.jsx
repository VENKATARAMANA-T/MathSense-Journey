import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useScreenshot } from '../hooks/useScreenshot'
import Navbar from '../components/common/Navbar'

const ScreenshotsPage = () => {
  const [screenshots, setScreenshots] = useState([])
  const { getScreenshots, deleteScreenshot, downloadScreenshot } = useScreenshot()

  useEffect(() => {
    loadScreenshots()
  }, [])

  const loadScreenshots = () => {
    const shots = getScreenshots()
    setScreenshots(shots.reverse()) // Show newest first
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this screenshot?')) {
      deleteScreenshot(id)
      loadScreenshots()
    }
  }

  const handleDownload = (screenshot) => {
    const filename = `${screenshot.islandName || 'achievement'}_${new Date(screenshot.timestamp).toLocaleDateString()}.png`
    downloadScreenshot(screenshot.image, filename)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-ocean-50 to-mint-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold gradient-text mb-4">
            📸 My Screenshots
          </h1>
          <p className="text-xl text-ocean-700">
            Your captured achievements and island completions
          </p>
        </motion.div>

        {screenshots.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-9xl mb-6">📷</div>
            <h2 className="text-3xl font-display font-bold text-ocean-700 mb-4">
              No Screenshots Yet
            </h2>
            <p className="text-lg text-ocean-600">
              Complete islands to capture your achievements!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative group">
                  <img
                    src={screenshot.image}
                    alt={`Achievement from ${screenshot.islandName || 'Island'}`}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleDownload(screenshot)}
                      className="bg-ocean-500 text-white px-4 py-2 rounded-lg hover:bg-ocean-600 transition-colors"
                      title="Download"
                    >
                      ⬇️ Download
                    </button>
                    <button
                      onClick={() => handleDelete(screenshot.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      title="Delete"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-ocean-800 mb-2">
                    {screenshot.islandName ? `${screenshot.islandName} Island` : 'Achievement'}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-ocean-600">
                    <span>Score: {screenshot.score || 0}</span>
                    <span>{new Date(screenshot.timestamp).toLocaleDateString()}</span>
                  </div>
                  {screenshot.accuracy && (
                    <div className="mt-2 text-sm text-ocean-600">
                      Accuracy: {screenshot.accuracy}%
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-ocean-600"
        >
          <p className="text-sm">
            💡 Tip: Complete more islands to collect achievement screenshots!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ScreenshotsPage

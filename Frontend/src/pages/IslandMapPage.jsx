import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProgressContext } from '../App';
import Navbar from '../components/common/Navbar';
import { FaLock, FaCheck } from 'react-icons/fa';

const IslandMapPage = () => {
  const { progress } = useContext(ProgressContext);

  const islands = [
    {
      id: 'counting',
      name: 'Counting Island',
      emoji: '🔢',
      description: 'Learn to count with fun objects!',
      path: '/islands/counting',
      position: { top: '70%', left: '20%' },
      difficulty: 'Beginner',
      locked: false,
      skills: ['Number Recognition', 'Counting 1-10', 'One-to-One Correspondence'],
    },
    {
      id: 'addition',
      name: 'Addition Island',
      emoji: '➕',
      description: 'Combine groups and watch them grow!',
      path: '/islands/addition',
      position: { top: '50%', left: '40%' },
      difficulty: 'Easy',
      locked: !progress.completedIslands?.includes('counting'),
      skills: ['Basic Addition', 'Combining Groups', 'Number Bonds'],
    },
    {
      id: 'subtraction',
      name: 'Subtraction Island',
      emoji: '➖',
      description: 'Take away and count what remains!',
      path: '/islands/subtraction',
      position: { top: '30%', left: '60%' },
      difficulty: 'Medium',
      locked: !progress.completedIslands?.includes('addition'),
      skills: ['Basic Subtraction', 'Taking Away', 'Difference'],
    },
    {
      id: 'patterns',
      name: 'Pattern Island',
      emoji: '🎨',
      description: 'Discover beautiful patterns everywhere!',
      path: '/islands/patterns',
      position: { top: '60%', left: '75%' },
      difficulty: 'Medium',
      locked: !progress.completedIslands?.includes('counting'),
      skills: ['Pattern Recognition', 'Sequencing', 'Prediction'],
    },
    {
      id: 'shapes',
      name: 'Shape Island',
      emoji: '🔷',
      description: 'Explore circles, squares, and more!',
      path: '/islands/shapes',
      position: { top: '40%', left: '30%' },
      difficulty: 'Easy',
      locked: !progress.completedIslands?.includes('counting'),
      skills: ['Shape Recognition', 'Attributes', 'Sorting'],
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-24 px-4">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gradient-rainbow mb-4">
            Your Math Journey 🗺️
          </h1>
          <p className="text-xl text-gray-600">
            Explore magical islands and master math skills!
          </p>
        </motion.div>

        {/* Island Map */}
        <div className="relative w-full max-w-6xl mx-auto h-[800px] bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 rounded-3xl overflow-hidden shadow-2xl">
          {/* Ocean Waves Animation */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
            <motion.div
              className="absolute bottom-0 w-full h-20 bg-blue-400 rounded-t-full"
              animate={{ x: [-20, 20, -20] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Clouds */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-40"
              style={{
                top: `${10 + i * 15}%`,
                left: `${i * 20}%`,
              }}
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            >
              ☁️
            </motion.div>
          ))}

          {/* Sailing Boat (Progress Indicator) */}
          <motion.div
            className="absolute text-5xl z-20"
            style={{ top: '45%', left: '15%' }}
            animate={{ 
              y: [0, -10, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⛵
          </motion.div>

          {/* Islands */}
          {islands.map((island, index) => {
            const isCompleted = progress.completedIslands?.includes(island.id);
            
            return (
              <motion.div
                key={island.id}
                className="absolute"
                style={island.position}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {island.locked ? (
                  // Locked Island
                  <div className="relative group">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-5xl cursor-not-allowed grayscale opacity-60"
                    >
                      {island.emoji}
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <FaLock className="text-white text-xl" />
                    </div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-800 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap">
                        Complete previous island first!
                      </div>
                    </div>
                  </div>
                ) : (
                  // Unlocked Island
                  <Link to={island.path}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      className="relative group"
                    >
                      <div className={`w-32 h-32 rounded-full ${isCompleted ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-primary-400 to-secondary-400'} flex items-center justify-center text-5xl shadow-2xl cursor-pointer hover:shadow-3xl transition-all`}>
                        {island.emoji}
                      </div>
                      
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <FaCheck className="text-white text-xl" />
                        </motion.div>
                      )}

                      {/* Tooltip on Hover */}
                      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                        <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-primary-200">
                          <h3 className="font-display font-bold text-gray-800 mb-1 text-center">
                            {island.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 text-center">
                            {island.description}
                          </p>
                          <div className="text-center">
                            <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                              {island.difficulty}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-gray-500 text-center">
                            Click to explore!
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            );
          })}

          {/* Progress Path - Dotted line connecting islands */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            <motion.path
              d="M 20% 70% Q 30% 60%, 40% 50% T 60% 30%"
              stroke="#FFB900"
              strokeWidth="4"
              strokeDasharray="10,10"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-8 glass p-6 rounded-3xl"
        >
          <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400"></div>
              <span className="text-gray-700 font-medium">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
              <FaCheck className="text-green-600" />
              <span className="text-gray-700 font-medium">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <FaLock className="text-gray-600" />
              <span className="text-gray-700 font-medium">Locked</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IslandMapPage;

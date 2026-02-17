import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ProgressContext } from '../App';
import Navbar from '../components/common/Navbar';

const AchievementsPage = () => {
  const { progress } = useContext(ProgressContext);

  const allAchievements = [
    { id: 'first_star', name: 'First Star', emoji: '⭐', description: 'Earn your first star!', unlocked: (progress.totalStars || 0) >= 1 },
    { id: 'star_collector', name: 'Star Collector', emoji: '🌟', description: 'Collect 10 stars!', unlocked: (progress.totalStars || 0) >= 10 },
    { id: 'counting_master', name: 'Counting Master', emoji: '🔢', description: 'Complete Counting Island!', unlocked: progress.completedIslands?.includes('counting') },
    { id: 'addition_expert', name: 'Addition Expert', emoji: '➕', description: 'Complete Addition Island!', unlocked: progress.completedIslands?.includes('addition') },
    { id: 'pattern_finder', name: 'Pattern Finder', emoji: '🎨', description: 'Complete Pattern Island!', unlocked: progress.completedIslands?.includes('patterns') },
    { id: 'shape_genius', name: 'Shape Genius', emoji: '🔷', description: 'Complete Shape Island!', unlocked: progress.completedIslands?.includes('shapes') },
    { id: 'math_explorer', name: 'Math Explorer', emoji: '🗺️', description: 'Visit all islands!', unlocked: (progress.completedIslands?.length || 0) >= 5 },
    { id: 'super_learner', name: 'Super Learner', emoji: '🚀', description: 'Earn 50 stars!', unlocked: (progress.totalStars || 0) >= 50 },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="text-5xl font-display font-bold text-gradient-rainbow mb-2">Your Achievements</h1>
          <p className="text-xl text-gray-600">Look at all the amazing things you've done!</p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`card text-center ${achievement.unlocked ? 'bg-gradient-to-br from-accent-100 to-peach-100' : 'grayscale opacity-50'}`}
            >
              <div className="text-7xl mb-4">{achievement.emoji}</div>
              <h3 className="text-xl font-display font-bold text-gray-800 mb-2">{achievement.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
              {achievement.unlocked ? (
                <div className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold">
                  Unlocked! ✓
                </div>
              ) : (
                <div className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-full text-sm font-semibold">
                  Locked 🔒
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mt-12 bg-gradient-to-r from-primary-100 to-secondary-100 text-center"
        >
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">
            You've unlocked {allAchievements.filter(a => a.unlocked).length} of {allAchievements.length} achievements!
          </h2>
          <p className="text-gray-700">Keep learning to unlock them all!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsPage;

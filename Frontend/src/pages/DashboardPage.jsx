import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserContext, ProgressContext } from '../App';
import { FaMap, FaStar, FaFire, FaTrophy } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import EmotionCheck from '../components/common/EmotionCheck';

const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const { progress } = useContext(ProgressContext);

  const todayDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const stats = [
    { icon: FaStar, label: 'Total Stars', value: progress.totalStars || 0, color: 'from-yellow-400 to-yellow-600' },
    { icon: FaFire, label: 'Day Streak', value: progress.streak || 1, color: 'from-orange-400 to-red-600' },
    { icon: FaTrophy, label: 'Achievements', value: progress.achievements?.length || 0, color: 'from-purple-400 to-purple-600' },
    { icon: FaMap, label: 'Islands Completed', value: progress.completedIslands?.length || 0, color: 'from-blue-400 to-blue-600' },
  ];

  const suggestedActivities = [
    { island: 'Counting Island', emoji: '🔢', path: '/islands/counting', level: 'Beginner', color: 'bg-blue-100' },
    { island: 'Addition Island', emoji: '➕', path: '/islands/addition', level: 'Easy', color: 'bg-green-100' },
    { island: 'Pattern Island', emoji: '🎨', path: '/islands/patterns', level: 'Medium', color: 'bg-purple-100' },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass p-8 rounded-3xl mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-2">
                Welcome back, {user?.name || 'Friend'}! 👋
              </h1>
              <p className="text-lg text-gray-600">{todayDate}</p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-4xl shadow-xl"
            >
              {user?.avatar || user?.name?.charAt(0) || '😊'}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="card text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="text-3xl text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Emotion Check */}
        <div className="mb-8">
          <EmotionCheck compact={false} />
        </div>

        {/* Suggested Activities */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">
            Ready to Learn? 🎯
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {suggestedActivities.map((activity, index) => (
              <motion.div
                key={activity.island}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link to={activity.path} className="block">
                  <div className={`${activity.color} rounded-3xl p-6 transition-all hover:shadow-2xl`}>
                    <div className="text-6xl mb-4 text-center">{activity.emoji}</div>
                    <h3 className="text-xl font-display font-bold text-gray-800 text-center mb-2">
                      {activity.island}
                    </h3>
                    <div className="text-center">
                      <span className="inline-block px-4 py-1 rounded-full bg-white/60 text-sm font-semibold text-gray-700">
                        {activity.level}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/map">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card bg-gradient-to-br from-primary-100 to-secondary-100 p-8 text-center"
            >
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
                Explore Island Map
              </h3>
              <p className="text-gray-600">See all learning adventures!</p>
            </motion.div>
          </Link>

          <Link to="/achievements">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card bg-gradient-to-br from-accent-100 to-peach-100 p-8 text-center"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
                View Achievements
              </h3>
              <p className="text-gray-600">See your awesome progress!</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

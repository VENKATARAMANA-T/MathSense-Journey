import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ProgressContext } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/common/Navbar';

const ProgressPage = () => {
  const { progress } = useContext(ProgressContext);

  const skillsData = Object.entries(progress.skillsMastery || {}).map(([skill, mastery]) => ({
    skill: skill.charAt(0).toUpperCase() + skill.slice(1),
    mastery,
  }));

  const emotionData = (progress.emotionLog || []).slice(-5).map((log, i) => ({
    time: `Check ${i + 1}`,
    emotion: log.emotion,
  }));

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <div className="text-8xl mb-4">📊</div>
          <h1 className="text-5xl font-display font-bold text-gradient-primary mb-2">Your Progress</h1>
          <p className="text-xl text-gray-600">See how amazing you're doing!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Skills Mastery</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mastery" fill="#1991B9" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Achievements</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-100 rounded-xl">
                <div className="text-5xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-gray-800">{progress.totalStars || 0}</div>
                <div className="text-sm text-gray-600">Total Stars</div>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-xl">
                <div className="text-5xl mb-2">🏝️</div>
                <div className="text-3xl font-bold text-gray-800">{progress.completedIslands?.length || 0}</div>
                <div className="text-sm text-gray-600">Islands Done</div>
              </div>
              <div className="text-center p-4 bg-purple-100 rounded-xl">
                <div className="text-5xl mb-2">🏆</div>
                <div className="text-3xl font-bold text-gray-800">{progress.achievements?.length || 0}</div>
                <div className="text-sm text-gray-600">Badges</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Recent Emotion Check-ins</h2>
          <div className="flex flex-wrap gap-4">
            {emotionData.map((log, i) => (
              <div key={i} className="px-6 py-3 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
                <span className="font-semibold">{log.time}:</span> {log.emotion}
              </div>
            ))}
            {emotionData.length === 0 && (
              <p className="text-gray-500">No emotion check-ins yet. Keep learning!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;

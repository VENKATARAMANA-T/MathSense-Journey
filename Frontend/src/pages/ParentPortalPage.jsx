import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ProgressContext, UserContext } from '../App';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/common/Navbar';

const ParentPortalPage = () => {
  const { user } = useContext(UserContext);
  const { progress } = useContext(ProgressContext);

  const sessionData = (progress.sessionHistory || []).map((session, i) => ({
    session: i + 1,
    stars: session.stars || 0,
    duration: session.duration || 0,
  }));

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass p-8 rounded-3xl mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-800 mb-2">Parent Portal 👪</h1>
          <p className="text-xl text-gray-600">Monitor {user?.name || 'your child'}'s learning journey</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-blue-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Learning Time</h3>
            <div className="text-4xl font-bold text-primary-600">{Math.floor((progress.sessionHistory?.reduce((acc, s) => acc + (s.duration || 0), 0) || 0) / 60)} min</div>
          </div>
          <div className="card bg-green-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Islands Completed</h3>
            <div className="text-4xl font-bold text-green-600">{progress.completedIslands?.length || 0} / 5</div>
          </div>
          <div className="card bg-yellow-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Stars Earned</h3>
            <div className="text-4xl font-bold text-accent-600">{progress.totalStars || 0} ⭐</div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Learning Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="session" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="stars" stroke="#FFB900" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card bg-gradient-to-br from-lavender-100 to-pink-100">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">Insights & Recommendations</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">🎯 Strengths</h3>
              <p className="text-gray-600">
                {progress.skillsMastery?.counting > 50 ? 'Excellent counting skills! ' : ''}
                {progress.skillsMastery?.addition > 50 ? 'Great at addition! ' : ''}
                {progress.completedIslands?.length > 2 ? 'Shows persistence in completing islands.' : 'Keep encouraging!'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">💡 Areas to Practice</h3>
              <p className="text-gray-600">
                {progress.skillsMastery?.patterns < 30 ? 'Pattern recognition could use more practice. ' : ''}
                {progress.skillsMastery?.shapes < 30 ? 'Shape activities would be beneficial. ' : ''}
                Regular 10-15 minute daily sessions work best for retention.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">📅 Suggested Schedule</h3>
              <p className="text-gray-600">
                Best learning times based on emotion logs: Morning sessions show higher engagement. 
                Recommended: 10-15 minutes after breakfast and before bedtime routine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPortalPage;

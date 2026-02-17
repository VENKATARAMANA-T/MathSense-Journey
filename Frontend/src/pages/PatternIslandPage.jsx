import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../App';
import Navbar from '../components/common/Navbar';

const PatternIslandPage = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useContext(ProgressContext);
  const [pattern] = useState(['🔴', '🔵', '🔴', '🔵']);
  const [answer, setAnswer] = useState('');

  const checkAnswer = () => {
    if (answer === '🔴' || answer === 'red') {
      updateProgress({
        totalStars: (progress.totalStars || 0) + 3,
        skillsMastery: { ...progress.skillsMastery, patterns: Math.min((progress.skillsMastery?.patterns || 0) + 10, 100) },
      });
      alert('Correct! The pattern continues with 🔴');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="pt-24 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <div className="text-8xl mb-4">🎨</div>
          <h1 className="text-5xl font-display font-bold text-gradient-primary mb-2">Pattern Island</h1>
          <p className="text-xl text-gray-600">Discover beautiful patterns!</p>
        </motion.div>

        <div className="card text-center mb-8">
          <h3 className="text-2xl font-bold mb-6">What comes next?</h3>
          <div className="flex items-center justify-center space-x-4 mb-8">
            {pattern.map((item, i) => (
              <div key={i} className="text-6xl w-20 h-20 flex items-center justify-center bg-white rounded-xl shadow-lg">{item}</div>
            ))}
            <div className="text-6xl">→</div>
            <div className="w-20 h-20 flex items-center justify-center border-4 border-dashed border-primary-400 rounded-xl text-4xl">?</div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button onClick={() => setAnswer('🔴')} className="text-6xl p-4 bg-red-100 rounded-xl hover:scale-110 transition">🔴</button>
            <button onClick={() => setAnswer('🔵')} className="text-6xl p-4 bg-blue-100 rounded-xl hover:scale-110 transition">🔵</button>
          </div>

          <button onClick={checkAnswer} className="btn-primary text-xl px-8 py-4">Check Answer ✓</button>
        </div>

        <div className="text-center">
          <button onClick={() => navigate('/map')} className="btn-secondary px-6 py-3">Back to Map</button>
        </div>
      </div>
    </div>
  );
};

export default PatternIslandPage;

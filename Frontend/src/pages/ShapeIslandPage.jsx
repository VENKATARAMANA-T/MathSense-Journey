import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../App';
import Navbar from '../components/common/Navbar';

const ShapeIslandPage = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useContext(ProgressContext);
  const shapes = [
    { name: 'Circle', emoji: '🔵', svg: '<circle cx="50" cy="50" r="40" fill="#3B82F6"/>' },
    { name: 'Square', emoji: '🟦', svg: '<rect x="10" y="10" width="80" height="80" fill="#3B82F6"/>' },
    { name: 'Triangle', emoji: '🔺', svg: '<polygon points="50,10 90,90 10,90" fill="#EF4444"/>' },
  ];

  const [selectedShape, setSelectedShape] = useState(null);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="pt-24 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <div className="text-8xl mb-4">🔷</div>
          <h1 className="text-5xl font-display font-bold text-gradient-primary mb-2">Shape Island</h1>
          <p className="text-xl text-gray-600">Explore circles, squares, and more!</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {shapes.map((shape) => (
            <motion.div
              key={shape.name}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelectedShape(shape);
                updateProgress({
                  totalStars: (progress.totalStars || 0) + 1,
                  skillsMastery: { ...progress.skillsMastery, shapes: Math.min((progress.skillsMastery?.shapes || 0) + 5, 100) },
                });
              }}
              className={`card cursor-pointer ${selectedShape?.name === shape.name ? 'ring-4 ring-primary-500' : ''}`}
            >
              <div className="text-8xl mb-4 text-center">{shape.emoji}</div>
              <h3 className="text-2xl font-bold text-center text-gray-800">{shape.name}</h3>
            </motion.div>
          ))}
        </div>

        {selectedShape && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="card bg-green-100 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl font-bold">You selected: {selectedShape.name}!</p>
            <p className="text-gray-700 mt-2">Great job learning shapes! ⭐</p>
          </motion.div>
        )}

        <div className="text-center mt-8">
          <button onClick={() => navigate('/map')} className="btn-secondary px-6 py-3">Back to Map</button>
        </div>
      </div>
    </div>
  );
};

export default ShapeIslandPage;

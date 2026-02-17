import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../App';
import Navbar from '../components/common/Navbar';
import AudioPlayer from '../components/common/AudioPlayer';

const AdditionIslandPage = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useContext(ProgressContext);
  const [num1] = useState(Math.floor(Math.random() * 5) + 1);
  const [num2] = useState(Math.floor(Math.random() * 5) + 1);
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const correct = parseInt(answer) === num1 + num2;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      updateProgress({
        totalStars: (progress.totalStars || 0) + 3,
        skillsMastery: {
          ...progress.skillsMastery,
          addition: Math.min((progress.skillsMastery?.addition || 0) + 10, 100),
        },
      });
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="pt-24 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <div className="text-8xl mb-4">➕</div>
          <h1 className="text-5xl font-display font-bold text-gradient-primary mb-2">Addition Island</h1>
          <p className="text-xl text-gray-600">Combine groups and watch them grow!</p>
        </motion.div>

        <div className="flex justify-center mb-6">
          <AudioPlayer src="addition-narration.mp3" type="narration" />
        </div>

        <div className="card text-center mb-8">
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-6xl mb-2">{Array(num1).fill('🍎').join('')}</div>
              <div className="text-4xl font-bold text-primary-600">{num1}</div>
            </div>
            <div className="text-6xl">➕</div>
            <div className="text-center">
              <div className="text-6xl mb-2">{Array(num2).fill('🍎').join('')}</div>
              <div className="text-4xl font-bold text-primary-600">{num2}</div>
            </div>
            <div className="text-6xl">=</div>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-24 h-24 text-4xl text-center font-bold border-4 border-primary-300 rounded-2xl focus:border-primary-500 focus:outline-none"
              placeholder="?"
            />
          </div>

          <button onClick={checkAnswer} className="btn-primary text-xl px-8 py-4">
            Check Answer ✓
          </button>

          {showFeedback && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`mt-6 p-6 rounded-2xl ${isCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}
            >
              <div className="text-6xl mb-2">{isCorrect ? '🎉' : '🤔'}</div>
              <p className="text-2xl font-bold">{isCorrect ? 'Correct! Amazing!' : 'Try again! You can do it!'}</p>
              {isCorrect && <p className="text-gray-700 mt-2">{num1} + {num2} = {num1 + num2} ⭐</p>}
            </motion.div>
          )}
        </div>

        <div className="text-center">
          <button onClick={() => navigate('/map')} className="btn-secondary px-6 py-3">
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionIslandPage;

import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../App';
import Navbar from '../components/common/Navbar';
import AudioPlayer from '../components/common/AudioPlayer';
import EmotionCheck from '../components/common/EmotionCheck';
import { FaLightbulb, FaRedo } from 'react-icons/fa';

const CountingIslandPage = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useContext(ProgressContext);
  
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetNumber, setTargetNumber] = useState(3);
  const [collectedItems, setCollectedItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [stars, setStars] = useState(0);

  const itemEmojis = ['🍎', '🍊', '🍌', '🍇', '🍓', '🍒', '🍑', '🥝'];

  useEffect(() => {
    generateLevel();
  }, [currentLevel]);

  const generateLevel = () => {
    const levelNumbers = [3, 4, 5, 6, 7, 8, 9, 10];
    const target = levelNumbers[Math.min(currentLevel - 1, levelNumbers.length - 1)];
    setTargetNumber(target);
    
    const randomEmoji = itemEmojis[Math.floor(Math.random() * itemEmojis.length)];
    const items = Array(target + 3).fill(null).map((_, i) => ({
      id: i,
      emoji: randomEmoji,
    }));
    
    setAvailableItems(items);
    setCollectedItems([]);
    setShowFeedback(false);
    setShowHint(false);
    setAttempts(0);
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', JSON.stringify(item));
  };

  const handleDrop = (e, zone) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('text/html'));
    
    if (zone === 'collect' && !collectedItems.find(i => i.id === item.id)) {
      setCollectedItems([...collectedItems, item]);
      setAvailableItems(availableItems.filter(i => i.id !== item.id));
    } else if (zone === 'available' && !availableItems.find(i => i.id === item.id)) {
      setAvailableItems([...availableItems, item]);
      setCollectedItems(collectedItems.filter(i => i.id !== item.id));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    const correct = collectedItems.length === targetNumber;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const earnedStars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setStars(stars + earnedStars);
      
      // Update progress
      updateProgress({
        totalStars: (progress.totalStars || 0) + earnedStars,
        skillsMastery: {
          ...progress.skillsMastery,
          counting: Math.min((progress.skillsMastery?.counting || 0) + 10, 100),
        },
      });

      setTimeout(() => {
        if (currentLevel < 8) {
          setCurrentLevel(currentLevel + 1);
        } else {
          // Mark island as completed
          if (!progress.completedIslands?.includes('counting')) {
            updateProgress({
              completedIslands: [...(progress.completedIslands || []), 'counting'],
            });
          }
          setTimeout(() => navigate('/map'), 2000);
        }
      }, 2000);
    } else {
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  const reset = () => {
    generateLevel();
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-24 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="text-8xl mb-4">🔢</div>
          <h1 className="text-5xl font-display font-bold text-gradient-primary mb-2">
            Counting Island
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Collect exactly {targetNumber} items! 🎯
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">Level {currentLevel}/8</span>
              <span className="text-sm font-semibold text-gray-600">⭐ {stars} stars</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${(currentLevel / 8) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Audio Player */}
        <div className="flex justify-center mb-6">
          <AudioPlayer src="narration-counting.mp3" type="narration" autoPlay={false} />
        </div>

        {/* Game Area */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Available Items */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="card"
          >
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-4 text-center">
              Available Items 📦
            </h3>
            <div
              className="drop-zone min-h-[300px]"
              onDrop={(e) => handleDrop(e, 'available')}
              onDragOver={handleDragOver}
            >
              <div className="grid grid-cols-4 gap-4">
                {availableItems.map((item) => (
                  <motion.div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    whileHover={{ scale: 1.1 }}
                    whileDrag={{ scale: 1.2 }}
                    className="draggable text-6xl cursor-grab active:cursor-grabbing bg-white rounded-xl shadow-md p-4 flex items-center justify-center"
                  >
                    {item.emoji}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Collection Basket */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="card"
          >
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-4 text-center">
              My Basket 🧺
            </h3>
            <div
              className={`drop-zone min-h-[300px] ${collectedItems.length > 0 ? 'drop-zone-active' : ''}`}
              onDrop={(e) => handleDrop(e, 'collect')}
              onDragOver={handleDragOver}
            >
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-primary-600">
                  {collectedItems.length} / {targetNumber}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {collectedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileDrag={{ scale: 1.2 }}
                    className="draggable text-6xl cursor-grab active:cursor-grabbing bg-white rounded-xl shadow-md p-4 flex items-center justify-center"
                  >
                    {item.emoji}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="card bg-lavender-100 mb-6 text-center"
            >
              <div className="text-5xl mb-2">💡</div>
              <p className="text-lg text-gray-700">
                <strong>Hint:</strong> You need exactly {targetNumber} items. 
                {collectedItems.length < targetNumber 
                  ? ` Add ${targetNumber - collectedItems.length} more!`
                  : ` Remove ${collectedItems.length - targetNumber}!`
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAnswer}
            className="btn-primary text-xl px-8 py-4"
          >
            Check Answer ✓
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="btn-secondary text-xl px-8 py-4"
          >
            <FaRedo className="inline mr-2" />
            Try Again
          </motion.button>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={`card text-center ${isCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}
            >
              <div className="text-8xl mb-4">
                {isCorrect ? '🎉' : '🤔'}
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">
                {isCorrect ? 'Amazing! You did it!' : 'Not quite! Try again!'}
              </h2>
              <p className="text-xl text-gray-700">
                {isCorrect 
                  ? `Perfect counting! You collected exactly ${targetNumber} items! ⭐`
                  : 'Keep trying! You can do it! 💪'
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emotion Check */}
        <div className="mt-8">
          <EmotionCheck compact={true} />
        </div>
      </div>

      {/* Hint Button (Floating) */}
      {!showHint && attempts > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowHint(true)}
          className="hint-btn"
        >
          <FaLightbulb className="text-3xl" />
        </motion.button>
      )}
    </div>
  );
};

export default CountingIslandPage;

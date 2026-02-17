import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressContext } from '../App';

const emotions = [
  { emoji: '😊', label: 'Happy', value: 'happy', color: 'bg-green-100' },
  { emoji: '😌', label: 'Calm', value: 'calm', color: 'bg-blue-100' },
  { emoji: '🤔', label: 'Thinking', value: 'thinking', color: 'bg-purple-100' },
  { emoji: '😕', label: 'Confused', value: 'confused', color: 'bg-yellow-100' },
  { emoji: '😓', label: 'Frustrated', value: 'frustrated', color: 'bg-orange-100' },
  { emoji: '😴', label: 'Tired', value: 'tired', color: 'bg-gray-100' },
];

const EmotionCheck = ({ onSelect, compact = false }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const { progress, updateProgress } = useContext(ProgressContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    
    // Save to emotion log
    const emotionEntry = {
      emotion: emotion.value,
      timestamp: new Date().toISOString(),
    };
    
    updateProgress({
      emotionLog: [...(progress.emotionLog || []), emotionEntry],
    });

    // Show encouraging message
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);

    // Callback
    if (onSelect) {
      onSelect(emotion);
    }
  };

  const getMessage = (emotion) => {
    const messages = {
      happy: "That's wonderful! Let's keep this great energy! 🌟",
      calm: "Perfect! A calm mind learns best! 🧘",
      thinking: "Great! Thinking is how we learn! 🎯",
      confused: "That's okay! Let's take it step by step! 💪",
      frustrated: "I understand. Let's take a short break! 🌈",
      tired: "You're doing great! Maybe time for a break? ☕",
    };
    return messages[emotion?.value] || "Thank you for sharing!";
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">How are you feeling?</span>
        <div className="flex space-x-1">
          {emotions.map((emotion) => (
            <motion.button
              key={emotion.value}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleEmotionSelect(emotion)}
              className={`text-2xl p-1 rounded-full transition-all ${
                selectedEmotion?.value === emotion.value ? 'ring-2 ring-primary-400 bg-primary-50' : ''
              }`}
              title={emotion.label}
            >
              {emotion.emoji}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card text-center"
      >
        <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-6">
          How are you feeling right now? 🌈
        </h3>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {emotions.map((emotion) => (
            <motion.button
              key={emotion.value}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEmotionSelect(emotion)}
              className={`${emotion.color} rounded-2xl p-4 md:p-6 transition-all hover:shadow-lg ${
                selectedEmotion?.value === emotion.value
                  ? 'ring-4 ring-primary-400 shadow-xl'
                  : ''
              }`}
            >
              <div className="text-4xl md:text-5xl mb-2">{emotion.emoji}</div>
              <div className="text-xs md:text-sm font-semibold text-gray-700">
                {emotion.label}
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showMessage && selectedEmotion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 rounded-xl bg-gradient-to-r from-primary-100 to-secondary-100 text-gray-800 font-medium"
            >
              {getMessage(selectedEmotion)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EmotionCheck;

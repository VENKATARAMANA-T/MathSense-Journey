import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserContext } from '../App';
import Navbar from '../components/common/Navbar';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim()) {
      const userData = {
        name: name.trim(),
        avatar: name.charAt(0).toUpperCase(),
        joinedDate: new Date().toISOString(),
      };
      
      updateUser(userData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🎈', '🌟', '🎨', '🎯', '🌈', '⭐'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass max-w-md w-full p-8 rounded-3xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-4"
          >
            🏝️
          </motion.div>
          <h1 className="text-4xl font-display font-bold text-gradient-primary mb-2">
            Welcome!
          </h1>
          <p className="text-gray-600">Let's start your math adventure!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
              What's your name? 😊
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-6 py-4 text-xl rounded-2xl border-2 border-primary-200 focus:border-primary-500 focus:outline-none transition-all"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-primary text-xl py-4"
          >
            Start Adventure! 🚀
          </motion.button>
        </form>

        <div className="mt-8 grid grid-cols-4 gap-2">
          {['😊', '🎉', '⭐', '🌈'].map((emoji, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, rotate: 10 }}
              className="text-4xl text-center cursor-pointer"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

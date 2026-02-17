import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain, FaHeart, FaGamepad, FaStar, FaMusic, FaPalette } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

const HomePage = () => {
  const features = [
    {
      icon: FaBrain,
      title: 'Adaptive Learning',
      description: 'AI adjusts difficulty based on your child\'s progress and emotional state',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: FaHeart,
      title: 'Emotion-Aware',
      description: 'Regular check-ins ensure a positive, stress-free learning experience',
      color: 'from-pink-400 to-pink-600',
    },
    {
      icon: FaGamepad,
      title: 'Gamified Fun',
      description: 'Learn through exciting island adventures and collect stars!',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: FaStar,
      title: 'Zero Failure',
      description: 'Every attempt is celebrated. No penalties, just growth!',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: FaMusic,
      title: 'Multi-Sensory',
      description: 'Visual, audio, and interactive elements for deep understanding',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: FaPalette,
      title: 'Sensory Safe',
      description: 'Customizable visuals and sounds to match your child\'s needs',
      color: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
          {/* Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-purple-100 to-pink-100"></div>
          
          {/* Floating Clouds */}
          <motion.div
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 text-6xl opacity-40"
          >
            ☁️
          </motion.div>
          <motion.div
            animate={{ x: [0, -80, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-20 text-8xl opacity-30"
          >
            ☁️
          </motion.div>
          <motion.div
            animate={{ x: [0, 120, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-40 left-1/3 text-7xl opacity-35"
          >
            ☁️
          </motion.div>

          {/* Floating Islands */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 left-20 text-9xl"
          >
            🏝️
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-32 text-7xl"
          >
            🏝️
          </motion.div>

          {/* Sparkles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="text-9xl mb-6"
          >
            🎯
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 text-gradient-rainbow"
          >
            MathSense Journey
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-body"
          >
            Multi-Sensory Math Learning Designed for Autism Kids
            <br />
            <span className="text-lg text-gray-600">Learn through play, grow with confidence! 🌟</span>
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/login" className="btn-primary text-xl px-8 py-4">
              Start Your Adventure 🚀
            </Link>
            <Link to="/product" className="btn-secondary text-xl px-8 py-4">
              Learn More 📚
            </Link>
          </motion.div>

          {/* Floating Boat */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mt-12"
          >
            ⛵
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
              Why MathSense Journey? 🌈
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for autism spectrum learners with evidence-based teaching strategies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="card"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 mx-auto`}>
                  <feature.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-800 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-100 via-secondary-100 to-lavender-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
              Ready to Begin? 🎉
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of families making math learning joyful!
            </p>
            <Link to="/login" className="btn-accent text-2xl px-12 py-5">
              Start Free Today! ✨
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2026 MathSense Journey. Built with ❤️ for neurodiverse learners.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/product" className="text-gray-400 hover:text-white transition">
              About
            </Link>
            <a href="mailto:t_senthilkumar@cb.amrita.edu" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

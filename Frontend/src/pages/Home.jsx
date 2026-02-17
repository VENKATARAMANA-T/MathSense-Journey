import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAudio } from '../hooks/useAudio'

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { speak, playSound } = useAudio()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: '🎨',
      title: 'Visual Learning',
      description: 'Beautiful, calming visuals that make abstract math concepts tangible and easy to understand.',
      color: 'from-ocean-400 to-primary-500'
    },
    {
      icon: '🔊',
      title: 'Audio Guidance',
      description: 'Gentle voice narration and encouraging sounds that support learning without overwhelming.',
      color: 'from-mint-400 to-ocean-400'
    },
    {
      icon: '🎮',
      title: 'Interactive Games',
      description: 'Engaging activities that transform math practice into joyful play and discovery.',
      color: 'from-peach-400 to-lavender-400'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Visual progress indicators and achievements that celebrate every step forward.',
      color: 'from-lavender-400 to-primary-500'
    },
    {
      icon: '🎯',
      title: 'Goal-Oriented Learning',
      description: 'Clear learning objectives and milestones that guide children toward mastery.',
      color: 'from-ocean-400 to-mint-400'
    }
  ]

  const handleStartJourney = () => {
    playSound('success')
    speak('Welcome to MathSense Journey! Let\'s start your adventure!')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-ocean-50 to-lavender-100">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-ocean-300/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Parallax Islands */}
        <motion.div
          className="absolute top-1/4 right-1/4 text-9xl opacity-20"
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5
          }}
        >
          🏝️
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/4 text-8xl opacity-20"
          style={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3
          }}
        >
          🌴
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity 
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #0ea5e9, #06b6d4, #22c55e, #a855f7, #0ea5e9)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              MathSense Journey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl text-ocean-700 font-semibold mb-4"
            >
              Where Math Becomes an Adventure! 🌟
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-ocean-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              A multi-sensory learning platform designed specifically for children with autism.
              Experience math through beautiful visuals, gentle sounds, and joyful interactions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/islands" onClick={handleStartJourney}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-xl px-12 py-6 shadow-2xl"
                >
                  🚀 Start Your Adventure
                </motion.button>
              </Link>
              
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  📚 Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* Floating Characters */}
            <div className="mt-16 flex justify-center gap-8">
              {['😊', '🌈', '⭐', '🎨', '🎵'].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="text-5xl"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-4">
              Why Choose MathSense Journey?
            </h2>
            <p className="text-xl text-ocean-600 max-w-3xl mx-auto">
              Designed with love and backed by research, every feature supports your child's unique learning style
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-ocean-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-ocean-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ocean-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Happy Learners' },
              { number: '10K+', label: 'Problems Solved' },
              { number: '95%', label: 'Parent Satisfaction' },
              { number: '24/7', label: 'Always Available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-ocean-100 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center card-glass"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ocean-800 mb-4">
            Ready to Start the Journey? 🌟
          </h2>
          <p className="text-xl text-ocean-600 mb-8">
            Join thousands of families making math learning joyful and accessible
          </p>
          <Link to="/islands" onClick={handleStartJourney}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-xl"
            >
              Explore Learning Islands 🏝️
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default Home

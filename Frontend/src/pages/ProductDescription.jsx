import { motion } from 'framer-motion'
import { useAudio } from '../hooks/useAudio'
import VenkatPhoto from '../assets/Venkat_photo.jpeg'

const ProductDescription = () => {
  const { speak } = useAudio()

  const teamMembers = [
    {
      photo: VenkatPhoto,
      name: 'T Venkataramana',
      rollNo: 'CB.SC.U4CSE23055',
      role: 'Full Stack Developer',
      isImage: true
    }
  ]

  const operationsTable = [
    {
      operation: 'Island Map Navigation',
      expectedOutput: 'Interactive map showing locked/unlocked islands with progress tracking',
      reactConcepts: 'React Router (nested routes), useState (island states), SVG manipulation, Context API',
      improvement: 'Dynamic routing based on progress, visual state management enables personalized learning paths'
    },
    {
      operation: 'Number Recognition Game',
      expectedOutput: 'Match quantity to numeral with audio confirmation and visual feedback',
      reactConcepts: 'useState (score tracking), useEffect (timer), Event Handlers (click/drag), Web Audio API',
      improvement: 'Real-time state updates and side effect management for timers creates engaging immediate feedback'
    },
    {
      operation: 'Counting Practice',
      expectedOutput: 'Drag objects into container, count aloud with synchronized audio',
      reactConcepts: 'Drag & Drop API, Array state management, Audio sync, useCallback for performance',
      improvement: 'Interactive learning with array operations for object tracking improves motor skills and counting'
    },
    {
      operation: 'Addition Builder',
      expectedOutput: 'Visual combination of object groups showing sum',
      reactConcepts: 'Component composition, Props drilling, Conditional rendering, Animation states',
      improvement: 'Reusable addition components for different scenarios makes abstract concept concrete'
    },
    {
      operation: 'Pattern Sequencer',
      expectedOutput: 'Complete missing pattern elements with visual hints',
      reactConcepts: 'Array mapping, Keys, Pattern matching algorithm, useMemo for optimization',
      improvement: 'Dynamic list rendering with efficient updates leverages autism strength in pattern recognition'
    },
    {
      operation: 'Emotion Check-in',
      expectedOutput: 'Select emoji to adjust difficulty and learning pace',
      reactConcepts: 'Context API (global emotion state), useReducer (complex state), localStorage',
      improvement: 'Global state management affects entire app experience, adapting to child\'s emotional state'
    },
    {
      operation: 'Progress Dashboard',
      expectedOutput: 'Animated charts showing improvement trends and achievements',
      reactConcepts: 'Chart library integration, useEffect (data fetch), useMemo, Custom hooks',
      improvement: 'Optimized re-rendering of complex visualizations provides clear progress tracking'
    },
    {
      operation: 'Voice Narration System',
      expectedOutput: 'Text-to-speech with speed control and replay functionality',
      reactConcepts: 'useRef (audio element), Custom Hook (useAudio), Event handlers, Web Speech API',
      improvement: 'Direct audio control with reusable logic supports auditory processing differences'
    },
    {
      operation: 'Hint System',
      expectedOutput: 'Progressive hints from visual to demonstrative',
      reactConcepts: 'useState (hint level), useCallback (memoized function), Conditional rendering',
      improvement: 'Performance optimization for frequently called functions prevents frustration through scaffolding'
    }
  ]

  const similarProducts = [
    {
      url: 'todomath.com',
      description: 'Math app for Pre-K to 2nd grade with special needs focus',
      features: 'Multi-sensory activities, progress tracking, 20+ game types, offline mode'
    },
    {
      url: 'splashlearn.com',
      description: 'Game-based math & reading for Pre-K to 5',
      features: '400+ math skills, curriculum-aligned, printable worksheets, parent connect'
    },
    {
      url: 'prodigygame.com',
      description: 'Fantasy adventure math game',
      features: 'RPG-style gameplay, 1500+ skills, teacher dashboard, free version'
    },
    {
      url: 'khankids.org',
      description: 'Free educational app for ages 2-8',
      features: 'Adaptive learning path, creative activities, no ads, offline access'
    },
    {
      url: 'autismate.com',
      description: 'Communication app with learning modules for autism',
      features: 'Visual schedules, AAC support, some math activities, autism-specific design'
    }
  ]

  const researchLabs = [
    {
      name: 'MIT Media Lab - Personal Robots Group',
      focus: 'Social robots for autism education',
      work: 'Tega robot teaches math collaboratively',
      url: 'robots.media.mit.edu'
    },
    {
      name: 'Stanford SNAP Lab',
      focus: 'Cognitive interventions for autism',
      work: 'Math anxiety reduction in ASD',
      url: 'snapl.stanford.edu'
    },
    {
      name: 'Yale Child Study Center',
      focus: 'Early intervention for autism',
      work: 'Play-based learning including numeracy',
      url: 'medicine.yale.edu/childstudy'
    },
    {
      name: 'UC Davis MIND Institute',
      focus: 'Autism spectrum research',
      work: 'Numerical cognition in ASD',
      url: 'mindinstitute.org'
    },
    {
      name: 'Amrita Center for Wireless Networks',
      focus: 'Healthcare technology and assistive tech',
      work: 'Digital health solutions for underserved',
      url: 'amrita.edu/center/wireless'
    }
  ]

  const improvements = [
    {
      category: 'Cognitive',
      items: ['Memory Enhancement', 'Contextual Learning', 'Attention & Focus', 'Executive Function', 'Processing Speed']
    },
    {
      category: 'Emotional',
      items: ['Anxiety Reduction', 'Frustration Tolerance', 'Emotional Regulation', 'Self-Efficacy', 'Confidence Building']
    },
    {
      category: 'Social',
      items: ['Communication Skills', 'Social Awareness', 'Turn-taking', 'Requesting Help', 'Perspective Taking']
    },
    {
      category: 'Motor',
      items: ['Fine Motor Skills', 'Hand-eye Coordination', 'Bilateral Coordination', 'Motor Planning', 'Sensory Integration']
    }
  ]

  const algorithms = [
    {
      name: 'Adaptive Difficulty Algorithm',
      description: 'Dynamically adjusts challenge level based on performance metrics (accuracy rate, response time)'
    },
    {
      name: 'Spaced Repetition (Modified Leitner)',
      description: 'Optimizes review timing for long-term retention with autism-specific intervals'
    },
    {
      name: 'Emotion-Performance Correlation',
      description: 'Links emotional state to learning outcomes and recommends optimal learning times'
    },
    {
      name: 'Pattern Recognition Engine',
      description: 'Identifies learning patterns and predicts mastery timeline with confidence intervals'
    },
    {
      name: 'Sensory Adaptation System',
      description: 'Customizes interface based on behavioral signals and direct preferences'
    }
  ]

  const futureEnhancements = [
    {
      feature: 'Voice Navigation & Commands',
      justification: 'Hands-free operation for children with motor challenges (dyspraxia), alternative input method improves accessibility'
    },
    {
      feature: 'Augmented Reality Mode',
      justification: 'Bridges digital-physical gap for better generalization, makes math tangible using real-world context'
    },
    {
      feature: 'Multi-Language Support',
      justification: 'Autism is global, native language processing is easier, increases cultural inclusivity'
    },
    {
      feature: 'AI-Powered Tutor Avatar',
      justification: 'On-demand support without waiting, autism kids often prefer digital to human interaction, available 24/7'
    },
    {
      feature: 'Social Stories Generator',
      justification: 'Proven intervention for autism, contextualizes math in daily life, addresses both math and social learning'
    },
    {
      feature: 'VR Math Worlds',
      justification: 'Next-level visualization for spatial math, completely controlled sensory environment, leverages autism strengths'
    },
    {
      feature: 'IEP Integration',
      justification: 'Legal requirement in special education, data-driven IEP goals are more defensible, streamlines educator workflows'
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-display font-bold gradient-text mb-6">
            Project Documentation
          </h1>
          <p className="text-xl text-ocean-600 max-w-3xl mx-auto">
            Comprehensive overview of MathSense Journey - A research-backed platform for autism math education
          </p>
        </motion.div>

        {/* Course Information */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">📚</span>
              Academic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-ocean-500 font-semibold mb-1">Course Code</p>
                <p className="text-lg text-ocean-800 mb-4">23CSE461</p>
                
                <p className="text-sm text-ocean-500 font-semibold mb-1">Course Name</p>
                <p className="text-lg text-ocean-800 mb-4">Full Stack Frameworks</p>

                <p className="text-sm text-ocean-500 font-semibold mb-1">Course Teacher</p>
                <p className="text-lg text-ocean-800 font-bold">Dr. T. Senthil Kumar</p>
                <p className="text-ocean-600">Professor</p>
              </div>
              <div className="space-y-2 text-ocean-700">
                <p className="font-semibold text-ocean-800">Amrita School of Computing</p>
                <p>Amrita Vishwa Vidyapeetham</p>
                <p>Coimbatore - 641112</p>
                <a href="mailto:t_senthilkumar@cb.amrita.edu" className="text-ocean-500 hover:text-ocean-700 block">
                  t_senthilkumar@cb.amrita.edu
                </a>
                <div className="pt-4">
                  <p className="text-sm text-ocean-500 font-semibold mb-1">GitHub Repository</p>
                  <a
                    href="https://github.com/VENKATARAMANA-T/MathSense-Journey.git"
                    className="text-ocean-500 hover:text-ocean-700 break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/VENKATARAMANA-T/MathSense-Journey
                  </a>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-ocean-500 font-semibold mb-1">Collaborators</p>
                  <p className="text-ocean-700">Academic: Amrita Vishwa Vidyapeetham</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team Members */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display font-bold text-ocean-800 mb-8 text-center flex items-center justify-center">
            <span className="text-4xl mr-3">👥</span>
            Team Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 max-w-md mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card text-center"
              >
                {member.isImage ? (
                  <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg object-cover object-center" />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-ocean-400 to-primary-500 rounded-full flex items-center justify-center text-6xl mx-auto mb-4 shadow-lg">
                    {member.photo}
                  </div>
                )}
                <h3 className="text-xl font-display font-bold text-ocean-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-ocean-600 font-semibold mb-2">{member.rollNo}</p>
                <p className="text-ocean-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why This Portal */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card bg-gradient-to-r from-ocean-50 to-primary-50">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">❓</span>
              Why This Portal is Required for Autism Kids
            </h2>
            <div className="space-y-4 text-ocean-700 leading-relaxed">
              <p className="text-lg">
                Autism spectrum disorder affects how children process information, interact socially, and manage sensory input. Traditional teaching methods often fail because they rely heavily on verbal instructions, social learning, and fast-paced environments.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="font-bold text-ocean-800 mb-3 text-lg">🎯 Core Challenges</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Abstract thinking difficulty - math concepts are intangible</li>
                    <li>• Sensory processing issues - classrooms overwhelm</li>
                    <li>• Communication barriers - verbal instructions fail</li>
                    <li>• Attention regulation challenges</li>
                    <li>• Executive function deficits</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="font-bold text-ocean-800 mb-3 text-lg">✨ Our Solution</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Visual concrete representations</li>
                    <li>• Controlled sensory environment</li>
                    <li>• Non-verbal visual instructions</li>
                    <li>• Self-paced learning</li>
                    <li>• Structured predictable interface</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Challenges Addressed */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">🎯</span>
              Challenges in Autism Kids Improved by This Portal
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-ocean-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-ocean-800 font-bold">Challenge</th>
                    <th className="px-6 py-3 text-left text-ocean-800 font-bold">How Portal Addresses It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ocean-100">
                  <tr className="hover:bg-ocean-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-ocean-700">Abstract thinking</td>
                    <td className="px-6 py-4 text-ocean-600">3D manipulatives and animations showing quantity concretely</td>
                  </tr>
                  <tr className="hover:bg-ocean-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-ocean-700">Sensory overload</td>
                    <td className="px-6 py-4 text-ocean-600">Customizable volume, brightness, animation speed controls</td>
                  </tr>
                  <tr className="hover:bg-ocean-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-ocean-700">Short attention spans</td>
                    <td className="px-6 py-4 text-ocean-600">Micro-learning in 2-3 minute activities with clear endpoints</td>
                  </tr>
                  <tr className="hover:bg-ocean-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-ocean-700">Communication barriers</td>
                    <td className="px-6 py-4 text-ocean-600">Non-verbal interface with icons, pictures, minimal text</td>
                  </tr>
                  <tr className="hover:bg-ocean-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-ocean-700">Need for routine</td>
                    <td className="px-6 py-4 text-ocean-600">Predictable navigation with same structure every lesson</td>
                  </tr>
                  <tr className="hover:bg-ocean-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-ocean-700">Frustration tolerance</td>
                    <td className="px-6 py-4 text-ocean-600">Error-friendly design with no penalties and encouraging messages</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Highlights & Novelty */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card bg-gradient-to-r from-lavender-50 to-peach-50">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">✨</span>
              Highlights & Novelty
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Adaptive Sensory Engine', desc: 'AI-powered sensory customization that learns individual profiles' },
                { title: 'Emotion-Aware Learning', desc: 'Adjusts difficulty based on emotional check-ins' },
                { title: 'Multi-Modal Synesthesia', desc: 'Every concept has color, shape, sound, and character' },
                { title: 'Zero-Failure Architecture', desc: 'Every attempt is learning, no wrong answers' },
                { title: 'Parent Co-Teacher System', desc: 'Real-time coaching prompts on parent device' },
                { title: 'Spaced Repetition Visual', desc: 'Memory Garden shows when concepts need review' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="font-bold text-ocean-800 mb-2 text-lg">{item.title}</h3>
                  <p className="text-ocean-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Visualization Importance */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">👁️</span>
              Importance of Visualization
            </h2>
            <div className="space-y-4 text-ocean-700">
              <p className="text-lg leading-relaxed">
                Research shows that 60-80% of autism individuals are visual thinkers (Temple Grandin). Visualization is not just helpful—it's essential:
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  'Making abstract concepts concrete through 3D objects',
                  'Reducing cognitive load - one glance vs. processing words',
                  'Immediate visual feedback for correct/incorrect attempts',
                  'Step-by-step animations breaking complex problems',
                  'Visual timers showing time remaining without pressure',
                  'Color coding for consistent operation recognition',
                  'Spatial reasoning through parallax and layering',
                  'Memory enhancement via visual anchors and patterns'
                ].map((item, i) => (
                  <li key={i} className="flex items-start bg-ocean-50 p-4 rounded-xl">
                    <span className="text-2xl mr-3">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Operations Table */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">⚙️</span>
              List of Portal Operations
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-ocean-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-ocean-800 font-bold">Operation Name</th>
                    <th className="px-4 py-3 text-left text-ocean-800 font-bold">Expected Output</th>
                    <th className="px-4 py-3 text-left text-ocean-800 font-bold">React Concepts Used</th>
                    <th className="px-4 py-3 text-left text-ocean-800 font-bold">How It Improves Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ocean-100">
                  {operationsTable.map((op, index) => (
                    <tr key={index} className="hover:bg-ocean-50 transition-colors">
                      <td className="px-4 py-4 font-semibold text-ocean-700">{op.operation}</td>
                      <td className="px-4 py-4 text-ocean-600">{op.expectedOutput}</td>
                      <td className="px-4 py-4 text-ocean-600">{op.reactConcepts}</td>
                      <td className="px-4 py-4 text-ocean-600">{op.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Improvements for Autism Kids */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card bg-gradient-to-r from-mint-50 to-ocean-50">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">📈</span>
              Improvements This Application Brings
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {improvements.map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl font-bold text-ocean-800 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-ocean-500 rounded-full mr-2"></span>
                    {category.category} Improvements
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center text-ocean-700">
                        <span className="text-mint-500 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Similar Products */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">🔗</span>
              Similar Products in Market
            </h2>
            <div className="space-y-4">
              {similarProducts.map((product, index) => (
                <div key={index} className="bg-ocean-50 p-6 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-ocean-800 text-lg">{product.url}</h3>
                    <a href={`https://${product.url}`} target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:text-ocean-700">
                      Visit →
                    </a>
                  </div>
                  <p className="text-ocean-700 mb-2">{product.description}</p>
                  <p className="text-sm text-ocean-600"><strong>Features:</strong> {product.features}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Research Labs */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">🔬</span>
              Research Labs in Similar Domain
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {researchLabs.map((lab, index) => (
                <div key={index} className="bg-gradient-to-br from-lavender-50 to-ocean-50 p-6 rounded-2xl shadow-md">
                  <h3 className="font-bold text-ocean-800 text-lg mb-2">{lab.name}</h3>
                  <p className="text-sm text-ocean-600 mb-1"><strong>Focus:</strong> {lab.focus}</p>
                  <p className="text-sm text-ocean-600 mb-3"><strong>Work:</strong> {lab.work}</p>
                  <a href={`https://${lab.url}`} target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:text-ocean-700 text-sm font-semibold">
                    {lab.url} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Algorithms */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card bg-gradient-to-r from-peach-50 to-lavender-50">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">🧮</span>
              Algorithms Implemented
            </h2>
            <div className="space-y-4">
              {algorithms.map((algo, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="font-bold text-ocean-800 text-lg mb-2">{algo.name}</h3>
                  <p className="text-ocean-600">{algo.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Future Enhancements */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-ocean-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">🚀</span>
              Feature Enhancements & Justifications
            </h2>
            <div className="space-y-4">
              {futureEnhancements.map((enhancement, index) => (
                <div key={index} className="bg-ocean-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-ocean-800 text-lg mb-2">
                    <span className="text-ocean-500 mr-2">▸</span>
                    {enhancement.feature}
                  </h3>
                  <p className="text-ocean-600 pl-6"><strong>Why Required:</strong> {enhancement.justification}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ProductDescription

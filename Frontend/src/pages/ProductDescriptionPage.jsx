import { motion } from 'framer-motion';
import { FaGithub, FaUniversity, FaEnvelope, FaUsers, FaLightbulb, FaChartLine } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

const ProductDescriptionPage = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Your Name',
      rollNo: 'CB.EN.U4AIE21001',
      photo: '👨‍💻',
      role: 'Full Stack Developer',
    },
    {
      name: 'Team Member 2',
      rollNo: 'CB.EN.U4AIE21002',
      photo: '👩‍💻',
      role: 'UI/UX Designer',
    },
    {
      name: 'Team Member 3',
      rollNo: 'CB.EN.U4AIE21003',
      photo: '👨‍🔬',
      role: 'Research Lead',
    },
  ];

  // Operations table data
  const operations = [
    {
      name: 'Number Recognition Game',
      output: 'Match quantity to numeral with audio confirmation',
      reactConcepts: 'useState (score tracking), useEffect (timer), Event Handlers (click/drag)',
      improvement: 'Real-time state updates, side effect management for timers',
    },
    {
      name: 'Island Map Navigation',
      output: 'Interactive map showing locked/unlocked islands',
      reactConcepts: 'React Router (nested routes), useState (island states), SVG manipulation',
      improvement: 'Dynamic routing based on progress, visual state management',
    },
    {
      name: 'Addition Builder',
      output: 'Visual combination of object groups',
      reactConcepts: 'Component composition, Props drilling, Conditional rendering',
      improvement: 'Reusable addition components for different scenarios',
    },
    {
      name: 'Emotion Check-in',
      output: 'Select emoji, adjust difficulty based on mood',
      reactConcepts: 'Context API (global emotion state), useReducer (complex state)',
      improvement: 'Global state management affects entire app experience',
    },
    {
      name: 'Progress Tracker',
      output: 'Animated charts showing improvement',
      reactConcepts: 'Chart library (Recharts), useEffect (data fetch), useMemo',
      improvement: 'Optimized re-rendering of complex visualizations',
    },
    {
      name: 'Drag and Drop Activities',
      output: 'Interactive object manipulation',
      reactConcepts: 'Drag & Drop API, Array state management, Event Handlers',
      improvement: 'Smooth user interactions, efficient state updates',
    },
    {
      name: 'Audio Narration System',
      output: 'Play/pause/replay audio instructions with volume control',
      reactConcepts: 'useRef (audio element), Custom Hook (useAudio), Web Audio API',
      improvement: 'Direct audio control, reusable audio logic across components',
    },
    {
      name: 'Hint System',
      output: 'Progressive hints with visual cues',
      reactConcepts: 'useState (hint level), useCallback (memoized functions)',
      improvement: 'Performance optimization for frequently called functions',
    },
    {
      name: 'Settings Customization',
      output: 'Adjust audio, visual, speed preferences',
      reactConcepts: 'Form handling, Local Storage, useEffect (persist settings)',
      improvement: 'Persistent user preferences improve accessibility',
    },
    {
      name: 'Parent Dashboard',
      output: 'Real-time analytics of child\'s session',
      reactConcepts: 'Context API, useEffect (polling), Chart components',
      improvement: 'Global state for multi-component data sharing',
    },
  ];

  // Similar products
  const similarProducts = [
    {
      url: 'https://todomath.com',
      description: 'Todo Math - Math app for Pre-K to 2nd grade with special needs focus',
      features: 'Multi-sensory activities, progress tracking, 20+ game types',
    },
    {
      url: 'https://khankids.org',
      description: 'Khan Academy Kids - Free educational app for ages 2-8',
      features: 'Adaptive learning path, creative activities, offline access',
    },
    {
      url: 'https://splashlearn.com',
      description: 'Splashlearn - Game-based math & reading for Pre-K to 5',
      features: '400+ math skills, curriculum-aligned, parent connect',
    },
    {
      url: 'https://prodigygame.com',
      description: 'Prodigy Math - Fantasy adventure math game',
      features: 'RPG-style gameplay, 1500+ skills, teacher dashboard',
    },
  ];

  // Research labs
  const researchLabs = [
    {
      name: 'MIT Media Lab - Personal Robots Group',
      focus: 'Social robots for autism education',
      work: 'Tega robot teaches math collaboratively',
      url: 'https://robots.media.mit.edu',
    },
    {
      name: 'Stanford SNAP Lab',
      focus: 'Cognitive interventions for autism',
      work: 'Math anxiety reduction in ASD',
      url: 'https://snapl.stanford.edu',
    },
    {
      name: 'Yale Child Study Center',
      focus: 'Early intervention for autism',
      work: 'Play-based learning including numeracy',
      url: 'https://medicine.yale.edu/childstudy',
    },
    {
      name: 'Amrita Center for Wireless Networks',
      focus: 'Healthcare technology & assistive tech',
      work: 'Digital health solutions for underserved populations',
      url: 'https://www.amrita.edu/center/wireless',
    },
  ];

  // Improvements for autism kids
  const improvements = [
    { area: 'Memory Enhancement', description: 'Visual memory, sequential memory, working memory through spaced repetition' },
    { area: 'Contextual Learning', description: 'Real-world application in daily scenarios like shopping, cooking' },
    { area: 'Attention & Focus', description: 'Sustained, selective, and divided attention through progressive difficulty' },
    { area: 'Executive Function', description: 'Planning, organization, task initiation, self-monitoring skills' },
    { area: 'Anxiety Reduction', description: 'Predictable environment, self-paced learning, no judgment' },
    { area: 'Frustration Tolerance', description: 'Error-friendly design, scaffolding, break prompts' },
    { area: 'Emotional Regulation', description: 'Emotion identification, expression, management through check-ins' },
    { area: 'Fine Motor Skills', description: 'Hand-eye coordination, finger dexterity through drag-drop activities' },
    { area: 'Sensory Integration', description: 'Visual-auditory syncing, customizable sensory input' },
    { area: 'Math Competency', description: 'Number sense, operational fluency, problem-solving skills' },
  ];

  // Algorithms implemented
  const algorithms = [
    {
      name: 'Adaptive Difficulty Algorithm',
      description: 'Dynamically adjusts challenge level based on accuracy and response time',
    },
    {
      name: 'Spaced Repetition (Modified Leitner)',
      description: 'Optimizes review timing for long-term retention with autism-specific intervals',
    },
    {
      name: 'Emotion-Performance Correlation',
      description: 'Links emotional state to learning outcomes, recommends optimal learning times',
    },
    {
      name: 'Pattern Recognition',
      description: 'Identifies learning patterns, predicts mastery timeline with confidence intervals',
    },
    {
      name: 'Hint Progression Algorithm',
      description: 'Provides scaffolding through 5 levels: visual → verbal → demonstrative → step-by-step → solution',
    },
    {
      name: 'Sensory Adaptation Algorithm',
      description: 'Customizes interface based on user preferences and behavioral signals',
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gradient-primary mb-4">
            MathSense Journey
          </h1>
          <p className="text-2xl text-gray-600 mb-2">Product Documentation</p>
          <p className="text-lg text-gray-500">Multi-Sensory Math Learning Portal for Autism Kids</p>
        </motion.div>

        {/* Course Details */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12"
        >
          <div className="flex items-center mb-6">
            <FaUniversity className="text-4xl text-primary-500 mr-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800">Course Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Course Details</h3>
              <p className="text-gray-600"><span className="font-medium">Course Code:</span> [Your Course Code]</p>
              <p className="text-gray-600"><span className="font-medium">Course Name:</span> [Your Course Name]</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Instructor</h3>
              <p className="text-gray-600"><span className="font-medium">Dr. T. Senthil Kumar</span></p>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Amrita School of Computing</p>
              <p className="text-gray-600">Amrita Vishwa Vidyapeetham</p>
              <p className="text-gray-600">Coimbatore - 641112</p>
              <div className="flex items-center mt-2">
                <FaEnvelope className="text-primary-500 mr-2" />
                <a href="mailto:t_senthilkumar@cb.amrita.edu" className="text-primary-600 hover:underline">
                  t_senthilkumar@cb.amrita.edu
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FaGithub className="mr-2" /> GitHub
                </h3>
                <a href="https://github.com/yourusername/mathsense-journey" className="text-primary-600 hover:underline">
                  View Repository →
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Academic Collaborator</h3>
                <p className="text-gray-600">[Academic Institution Name]</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Industry Collaborator</h3>
                <p className="text-gray-600">[Industry Partner Name]</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team Members */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <FaUsers className="text-4xl text-secondary-500 mr-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800">Team Members</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.rollNo}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center group"
              >
                <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">
                  {member.photo}
                </div>
                <h3 className="text-xl font-display font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-1">{member.rollNo}</p>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why This Portal is Required */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12 bg-gradient-to-br from-primary-50 to-secondary-50"
        >
          <div className="flex items-center mb-6">
            <FaLightbulb className="text-4xl text-accent-500 mr-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800">Why This Portal is Required</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg font-semibold">Autism spectrum disorder affects how children process information, interact socially, and manage sensory input. Traditional teaching methods often fail because:</p>
            
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="text-2xl mr-3">🧩</span>
                <span><strong>Abstract Thinking Difficulty:</strong> Math concepts like "addition" or "fractions" are intangible - this portal makes them concrete through visual representations</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">👂</span>
                <span><strong>Sensory Processing Issues:</strong> Classroom environments overwhelm with noise, lights, movement - our portal provides controlled sensory input</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">💬</span>
                <span><strong>Communication Barriers:</strong> Verbal instructions may not be processed effectively - we use visual, non-verbal interfaces</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">⏱️</span>
                <span><strong>Attention Regulation:</strong> Difficulty maintaining focus - we break lessons into 2-3 minute micro-chunks</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">😰</span>
                <span><strong>Anxiety & Overwhelm:</strong> New situations cause stress - predictable, routine-based navigation reduces fear</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white rounded-xl border-l-4 border-accent-500">
              <p className="font-semibold text-gray-800 mb-2">Digital Portal Benefits:</p>
              <p>A controlled digital environment eliminates sensory unpredictability, allows self-paced learning, provides unlimited patience (software never gets frustrated), maintains consistent routine (comforting for autism kids), enables private learning without social comparison, gives immediate feedback, and collects data patterns that parents/teachers cannot see manually.</p>
            </div>
          </div>
        </motion.section>

        {/* Challenges Addressed */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Challenges in Autism Kids Improved by This Portal</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { challenge: 'Abstract thinking', solution: 'Concrete visual representations with 3D manipulatives' },
              { challenge: 'Sensory overload', solution: 'Customizable volume, brightness, animation speed' },
              { challenge: 'Short attention spans', solution: '2-3 minute micro-learning activities' },
              { challenge: 'Communication barriers', solution: 'Icon and picture-based non-verbal interface' },
              { challenge: 'Need for routine', solution: 'Predictable navigation, same structure every lesson' },
              { challenge: 'Transition difficulty', solution: 'Visual previews and countdown timers before changes' },
              { challenge: 'Processing speed', solution: 'Self-paced with no time limits, pause anytime' },
              { challenge: 'Working memory', solution: 'Always-visible number lines and reference charts' },
              { challenge: 'Generalization', solution: 'Same concept shown in multiple real-life contexts' },
              { challenge: 'Motivation', solution: 'Interest-based characters and reward collection' },
              { challenge: 'Frustration tolerance', solution: 'No penalties, encouraging "try again" messages' },
              { challenge: 'Social anxiety', solution: 'Solo learning with optional parent collaboration mode' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gradient-to-br from-lavender-50 to-peach-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-1">⚡ {item.challenge}</p>
                <p className="text-sm text-gray-600">→ {item.solution}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Highlights & Novelty */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12 bg-gradient-to-br from-accent-50 to-primary-50"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Highlights & Novelty</h2>
          
          <div className="space-y-4">
            {[
              { title: 'Adaptive Sensory Engine', desc: 'AI-powered sensory customization that monitors interaction patterns and automatically adjusts animation speed, audio volume, visual contrast, and instruction complexity' },
              { title: 'Emotion-Aware Learning', desc: 'Regular emoji check-ins that adapt difficulty based on mood - if frustrated, simplifies next activity and suggests breaks' },
              { title: 'Multi-Modal Synesthesia Design', desc: 'Every concept has a color, shape, sound, and character creating multiple memory pathways (e.g., addition = green + triangle + ascending tones + "Plus the Builder")' },
              { title: 'Parent-as-Co-Teacher System', desc: 'Two-device mode where parents see coaching prompts while child works, with real-time suggestions and ability to record custom instructions' },
              { title: 'Zero-Failure Architecture', desc: 'Every attempt earns partial credit, hints appear automatically after 3 tries, "Interesting try!" instead of "Wrong"' },
              { title: 'Spaced Repetition with Visual Memory', desc: 'Memory Garden where concepts are flowers that need watering (review) at optimal intervals - visually shows when review is needed' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-white rounded-xl shadow-md border-l-4 border-secondary-500"
              >
                <h3 className="font-bold text-gray-800 mb-2">✨ {item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Importance of Visualization */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Importance of Visualization</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4"><strong>Why Visualization is Critical:</strong> 60-80% of autism individuals are visual thinkers (Temple Grandin research). Our portal leverages this strength.</p>
            
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold mb-2">🎨 Making Abstract Concrete</h3>
                <p className="text-sm">Number "5" shown as: numeral 5, five objects, five fingers, five dots in dice pattern, five blocks in tower</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-bold mb-2">⚡ Reducing Cognitive Load</h3>
                <p className="text-sm">One glance at visual = instant understanding vs. processing multi-step verbal instructions</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <h3 className="font-bold mb-2">📍 Sequential Process Clarity</h3>
                <p className="text-sm">Step-by-step animations breaking multi-step problems into micro-frames with visual breadcrumbs</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-xl">
                <h3 className="font-bold mb-2">🎯 Immediate Visual Feedback</h3>
                <p className="text-sm">Correct = green checkmark + confetti; Incorrect = gentle shake + hint arrow (not harsh red X)</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Operations Table */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <FaChartLine className="text-4xl text-lavender-500 mr-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800">Portal Operations</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Operation Name</th>
                  <th className="px-4 py-3 text-left">Expected Output</th>
                  <th className="px-4 py-3 text-left">React Concepts Used</th>
                  <th className="px-4 py-3 text-left">How It Improves Application</th>
                </tr>
              </thead>
              <tbody>
                {operations.map((op, i) => (
                  <tr key={i} className={`border-b hover:bg-gray-50 transition ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-4 py-3 font-semibold text-gray-800">{op.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{op.output}</td>
                    <td className="px-4 py-3 text-sm text-primary-600">{op.reactConcepts}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{op.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Improvements for Autism Kids */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12 bg-gradient-to-br from-green-50 to-blue-50"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Improvements This Application Brings</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {improvements.map((item, i) => (
              <div key={i} className="p-4 bg-white rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-1">🌟 {item.area}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Similar Products */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Similar Products</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {similarProducts.map((product, i) => (
              <div key={i} className="card hover:shadow-2xl transition">
                <h3 className="font-bold text-gray-800 mb-2">{product.description.split(' - ')[0]}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description.split(' - ')[1]}</p>
                <p className="text-sm text-primary-600 mb-2"><strong>Features:</strong> {product.features}</p>
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  Visit {product.url} →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-accent-100 rounded-xl">
            <p className="font-semibold text-gray-800 mb-2">How MathSense Journey Differs:</p>
            <p className="text-sm text-gray-700">Autism-specific design (not just accessible), deeper sensory customization with adaptive engine, emotion integration (no competitor does this), zero-failure philosophy, parent co-teaching features, multi-modal synesthesia design, and potential for open-source research collaboration.</p>
          </div>
        </motion.section>

        {/* Research Labs */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Research Labs Working in Similar Areas</h2>
          
          <div className="space-y-4">
            {researchLabs.map((lab, i) => (
              <div key={i} className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-1">{lab.name}</h3>
                <p className="text-sm text-gray-600 mb-1"><strong>Focus:</strong> {lab.focus}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Relevant Work:</strong> {lab.work}</p>
                <a href={lab.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  Visit {lab.url} →
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Algorithms */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12 bg-gradient-to-br from-lavender-50 to-pink-50"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Algorithms Implemented</h2>
          
          <div className="space-y-3">
            {algorithms.map((algo, i) => (
              <div key={i} className="p-4 bg-white rounded-xl border-l-4 border-lavender-400">
                <h3 className="font-bold text-gray-800 mb-1">⚙️ {algo.name}</h3>
                <p className="text-sm text-gray-600">{algo.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Feature Enhancements */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="card mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Future Feature Enhancements</h2>
          
          <div className="space-y-4">
            {[
              { title: 'Voice Navigation & Commands', why: 'Accessibility for kids with motor challenges (dyspraxia), hands-free operation reduces reliance on fine motor precision', priority: 'Critical 🔥' },
              { title: 'Augmented Reality (AR) Mode', why: 'Bridges digital-physical gap, helps with generalization by counting real objects via phone camera', priority: 'Important ⚡' },
              { title: 'Multi-Language Support', why: 'Autism is global - native language processing is easier, cultural inclusivity for multilingual families', priority: 'Critical 🔥' },
              { title: 'Offline Mode with Sync', why: 'Rural areas have poor connectivity, reduces dependency on stable internet for uninterrupted learning', priority: 'Critical 🔥' },
              { title: 'AI-Powered Tutor Avatar', why: 'On-demand support without human wait time, autism kids often prefer digital to human interaction, consistent patient responses 24/7', priority: 'Important ⚡' },
              { title: 'Social Stories Generator', why: 'Auto-create personalized stories with math concepts - proven intervention for autism that contextualizes learning in child\'s daily life', priority: 'Important ⚡' },
              { title: 'VR Math Worlds', why: 'Next-level visualization through immersive environments, completely controlled sensory space eliminates real-world distractions', priority: 'Future 💡' },
              { title: 'IEP Integration', why: 'Direct export to Individualized Education Program formats - legal requirement in special education, saves educator time with data-driven goals', priority: 'Important ⚡' },
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800">🚀 {feature.title}</h3>
                  <span className="text-sm font-semibold">{feature.priority}</span>
                </div>
                <p className="text-sm text-gray-600"><strong>Why Required:</strong> {feature.why}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">Join us in revolutionizing math education for neurodiverse learners!</p>
          <Link to="/login" className="btn-primary text-xl px-12 py-4">
            Start Learning Today 🎉
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDescriptionPage;

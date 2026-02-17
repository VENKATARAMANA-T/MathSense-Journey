import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-ocean-900 to-primary-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🏝️</span>
              MathSense Journey
            </h3>
            <p className="text-ocean-100 text-sm leading-relaxed">
              A multi-sensory math learning platform designed specifically for children with autism spectrum disorder.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-ocean-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/islands" className="text-ocean-100 hover:text-white transition-colors">
                  Learning Islands
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-ocean-100 hover:text-white transition-colors">
                  Progress Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ocean-100 hover:text-white transition-colors">
                  About Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Academic Contact</h4>
            <div className="text-sm text-ocean-100 space-y-2">
              <p className="font-semibold text-white">Dr. T. Senthil Kumar</p>
              <p>Professor</p>
              <p>Amrita School of Computing</p>
              <p>Amrita Vishwa Vidyapeetham</p>
              <p>Coimbatore - 641112</p>
              <a 
                href="mailto:t_senthilkumar@cb.amrita.edu"
                className="text-ocean-300 hover:text-white transition-colors block mt-2"
              >
                t_senthilkumar@cb.amrita.edu
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ocean-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-ocean-200">
          <p>&copy; 2026 MathSense Journey. Created for autism education research.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

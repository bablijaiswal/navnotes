import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const isHome = location.pathname === '/'
  const isDashboard = location.pathname === '/dashboard'
  const isLoginOrSignup = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <nav className="bg-gray-50/80 dark:bg-cozy-dark/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer ml-2" onClick={() => navigate('/')}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-7 h-7 text-blue-600 dark:text-blue-400"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" 
              />
            </svg>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">NavNotes</span>
          </div>

          {/* Right Side - Navigation & Auth */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/30 dark:bg-cozy-dark-card/30 hover:bg-white/50 dark:hover:bg-cozy-dark-card/50 backdrop-blur transition-all duration-300 hover:scale-105"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Navigation Links */}
            {isLoginOrSignup ? (
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                ← Back Home
              </button>
            ) : user ? (
              <>
                <button
                  onClick={() => navigate(isDashboard ? '/' : '/dashboard')}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {isDashboard ? 'Home' : 'Dashboard'}
                </button>
                <button
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

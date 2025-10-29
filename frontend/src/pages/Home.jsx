import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Key Resources - Admin only (hardcoded)
  const keyResources = [
    {
      _id: 'resource-1',
      subject: 'DSA Complete Course',
      caption: 'Comprehensive guide to Data Structures and Algorithms with examples',
      linkUrl: 'https://www.coursera.org/learn/data-structures',
      noteType: 'link',
      uploadedAt: new Date().toISOString()
    },
    {
      _id: 'resource-2',
      subject: 'Web Development Basics',
      caption: 'Learn HTML, CSS, and JavaScript fundamentals',
      linkUrl: 'https://www.freecodecamp.org/learn/responsive-web-design/',
      noteType: 'link',
      uploadedAt: new Date().toISOString()
    },
    {
      _id: 'resource-3',
      subject: 'DBMS Concepts',
      caption: 'Understanding databases, SQL, and normalization',
      linkUrl: 'https://www.geeksforgeeks.org/dbms/',
      noteType: 'link',
      uploadedAt: new Date().toISOString()
    }
  ]

  useEffect(() => {
    fetchPublicNotes()
  }, [])

  const fetchPublicNotes = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/notes/public')
      setNotes(response.data)
    } catch (err) {
      console.error('Failed to load notes:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredNotes = notes.filter(note =>
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.caption && note.caption.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cozy-dark">
      {/* Hero + Search Combined Section */}
      <section className="bg-transparent px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Your BCA Learning Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find community notes, video links, and curated resources for DSA, Web Dev, and more.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search notes by subject or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/20 bg-white/60 dark:bg-cozy-dark-card/60 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-sm"
            />
            <span className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-300 text-lg">🔍</span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key BCA Resources Section - Admin Only */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Key BCA Resources
            </h2>
            <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded">
              Admin Curated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyResources
              .filter(resource =>
                resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.caption.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((resource) => (
              <a
                key={resource._id}
                href={resource.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/40 dark:bg-cozy-dark-card/60 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-blue-500/20 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] p-6 cursor-pointer"
              >
                <div className="text-4xl mb-3">🔗</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {resource.subject}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {resource.caption}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(resource.uploadedAt).toLocaleDateString()}
                  </span>
                  <span className="bg-blue-500/80 text-white text-xs font-medium px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    View Resource
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Community Notes Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Latest Community Notes
            </h2>
            <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded">
              User Uploaded
            </span>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              <p>Loading notes...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              {notes.length === 0 ? (
                <p>No notes shared yet. Be the first to contribute!</p>
              ) : (
                <p>No notes match your search. Try a different query.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.slice(0, 6).map(note => (
                note.noteType === 'link' ? (
                  // Link Card - Clickable
                  <a
                    key={note._id}
                    href={note.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/40 dark:bg-cozy-dark-card/60 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-green-500/20 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] p-6 cursor-pointer"
                  >
                    <div className="text-4xl mb-3">🔗</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {note.subject}
                    </h3>
                    {note.caption && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {note.caption}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(note.uploadedAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-green-600 dark:text-green-300 font-semibold mt-1">
                          by {note.userId?.name || 'Anonymous'}
                        </span>
                      </div>
                      <span className="bg-green-500/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Link
                      </span>
                    </div>
                  </a>
                ) : (
                  // File Card
                  <div
                    key={note._id}
                    className="bg-white/40 dark:bg-cozy-dark-card/60 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-yellow-500/20 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] p-6"
                  >
                    <div className="text-4xl mb-3">📄</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {note.subject}
                    </h3>
                    {note.caption && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {note.caption}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(note.uploadedAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-yellow-600 dark:text-yellow-300 font-semibold mt-1">
                          by {note.userId?.name || 'Anonymous'}
                        </span>
                      </div>
                      <a
                        href={`/api/notes/download/${note._id}`}
                        className="bg-yellow-500/80 text-white text-xs font-medium px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                      >
                        File
                      </a>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {!user && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-800 hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-600/30 rounded-2xl p-8 text-white text-center transition-all duration-300 mt-8 cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              <p className="mb-4 text-lg font-semibold">Want to share/download notes? Join our community!</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Sign Up Now
              </button>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Why Choose NavNotes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📤', title: 'Easy Upload', desc: 'Share files and links effortlessly' },
              { icon: '🔍', title: 'Smart Search', desc: 'Find resources quickly by topic' },
              { icon: '🌐', title: 'Public Sharing', desc: 'Browse freely without signing up' }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/40 dark:bg-cozy-dark-card/60 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-white/15 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home

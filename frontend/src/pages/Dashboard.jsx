import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout, token } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Toggle state for File vs Link
  const [uploadMode, setUploadMode] = useState('file') // 'file' or 'link'
  
  // File form state
  const [fileForm, setFileForm] = useState({
    subject: '',
    caption: ''
  })
  
  // Link form state
  const [linkForm, setLinkForm] = useState({
    linkUrl: '',
    subject: '',
    caption: ''
  })

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(response.data)
    } catch (err) {
      setError('Failed to load notes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('file-input')
    const file = fileInput?.files?.[0]
    if (!file) {
      setError('Please select a file')
      return
    }

    if (!fileForm.subject.trim()) {
      setError('Please provide a subject/title')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('subject', fileForm.subject)
    formData.append('caption', fileForm.caption)
    formData.append('noteType', 'file')

    try {
      setUploading(true)
      setError('')
      setSuccess('')
      const response = await axios.post('/api/notes/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      setNotes(prev => [response.data, ...prev])
      fileInput.value = '' // Clear input
      setFileForm({ subject: '', caption: '' }) // Clear form
      setSuccess('✅ Your note has been uploaded successfully!')
      setTimeout(() => setSuccess(''), 5000) // Hide after 5 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleShareLink = async (e) => {
    e.preventDefault()
    
    if (!linkForm.linkUrl || !linkForm.subject) {
      setError('Link URL and subject are required')
      return
    }

    try {
      setUploading(true)
      setError('')
      setSuccess('')
      const response = await axios.post('/api/notes/upload', {
        noteType: 'link',
        linkUrl: linkForm.linkUrl,
        subject: linkForm.subject,
        caption: linkForm.caption
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(prev => [response.data, ...prev])
      setLinkForm({ linkUrl: '', subject: '', caption: '' })
      setSuccess('✅ Your link has been shared successfully!')
      setTimeout(() => setSuccess(''), 5000) // Hide after 5 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to share link')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await axios.delete(`/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(prev => prev.filter(note => note._id !== noteId))
    } catch (err) {
      setError('Failed to delete note')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome, <span className="text-blue-600 dark:text-blue-400">{user?.name || 'User'}</span>! 👋
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Share your notes and help the community learn</p>
        </div>

        {/* Upload Notes Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-xl dark:border dark:border-gray-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Share Your Notes</h2>

          {/* Toggle Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setUploadMode('file')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                uploadMode === 'file'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              📄 Upload File
            </button>
            <button
              onClick={() => setUploadMode('link')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                uploadMode === 'link'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              🔗 Share Link
            </button>
          </div>

          {error && <p className="text-red-500 dark:text-red-400 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-600 dark:text-green-400 mb-4 text-center font-semibold">{success}</p>}

          {/* File Upload Mode */}
          {uploadMode === 'file' && (
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Select File *</label>
                <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition cursor-pointer">
                  <input
                    type="file"
                    onChange={(e) => {}}
                    disabled={uploading}
                    className="hidden"
                    id="file-input"
                    accept=".pdf,.docx,.txt,.jpg,.png"
                  />
                  <label htmlFor="file-input" className="cursor-pointer block">
                    <div className="text-5xl mb-3">📄</div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold mb-1">
                      {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">PDF, DOCX, TXT, JPG, PNG (Max 50MB)</p>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Subject/Title *</label>
                <input
                  type="text"
                  value={fileForm.subject}
                  onChange={(e) => setFileForm({...fileForm, subject: e.target.value})}
                  placeholder="e.g., Data Structures Notes"
                  className="w-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description/Caption</label>
                <textarea
                  value={fileForm.caption}
                  onChange={(e) => setFileForm({...fileForm, caption: e.target.value})}
                  placeholder="Add a brief description (optional)"
                  rows="3"
                  className="w-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </button>
            </form>
          )}

          {/* Link Share Mode */}
          {uploadMode === 'link' && (
            <form onSubmit={handleShareLink} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Link URL *</label>
                <input
                  type="url"
                  value={linkForm.linkUrl}
                  onChange={(e) => setLinkForm({...linkForm, linkUrl: e.target.value})}
                  placeholder="https://example.com/resource"
                  className="w-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Subject/Title *</label>
                <input
                  type="text"
                  value={linkForm.subject}
                  onChange={(e) => setLinkForm({...linkForm, subject: e.target.value})}
                  placeholder="e.g., Web Development Basics"
                  className="w-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description/Caption</label>
                <textarea
                  value={linkForm.caption}
                  onChange={(e) => setLinkForm({...linkForm, caption: e.target.value})}
                  placeholder="Add a brief description (optional)"
                  rows="3"
                  className="w-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition disabled:opacity-50"
              >
                {uploading ? 'Sharing...' : 'Share Link'}
              </button>
            </form>
          )}
        </div>

        {/* Your Notes Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-xl dark:border dark:border-gray-800 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Notes</h2>

            {loading ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">Loading your notes...</p>
            ) : notes.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">No notes yet. Start by uploading a file!</p>
            ) : (
              <div className="space-y-4">
                {notes.map(note => (
                  <div key={note._id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition">
                    <div className="flex items-center flex-1">
                      <div className="text-2xl mr-4">
                        {note.noteType === 'link' ? '🔗' : '�'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{note.subject}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {note.noteType === 'link' ? 'Link shared' : `${note.originalName}`} • uploaded on {new Date(note.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {note.noteType === 'link' ? (
                        <a
                          href={note.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                        >
                          View Resource
                        </a>
                      ) : (
                        <a
                          href={`/api/notes/download/${note._id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                        >
                          Download
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

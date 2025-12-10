import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import { AuthProvider, useAuth } from './context/AuthContext'
import NotesList from './components/NotesList'
import NoteEditor from './components/NoteEditor'
import Auth from './components/Auth'
import Toast from './components/Toast'
import './App.css'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

function AppContent() {
  const [notes, setNotes] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchNotes()
  }, [refresh])

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes')
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`)
      setRefresh(prev => prev + 1)
      showToast('Note deleted successfully!', 'success')
    } catch (error) {
      console.error('Error deleting note:', error)
      showToast('Failed to delete note', 'error')
    }
  }

  const handleRefresh = (message, type = 'success') => {
    setRefresh(prev => prev + 1)
    if (message) showToast(message, type)
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Routes>
        <Route path="/auth" element={<Auth showToast={showToast} />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <NotesList notes={notes} onDelete={handleDelete} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/note/:id" 
          element={
            <ProtectedRoute>
              <NoteEditor onSave={handleRefresh} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App

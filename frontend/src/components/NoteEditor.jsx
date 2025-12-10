import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import './NoteEditor.css';

function NoteEditor({ onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isNewNote = id === 'new';

  useEffect(() => {
    if (!isNewNote) {
      fetchNote();
    }
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await axios.get(`/api/notes/${id}`);
      setTitle(response.data.title);
      setContent(response.data.Content);
    } catch (error) {
      console.error('Error fetching note:', error);
      onSave('Failed to load note', 'error');
      navigate('/');
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      onSave('Please fill in both title and content', 'warning');
      return;
    }

    setLoading(true);
    try {
      if (isNewNote) {
        await axios.post('/api/notes', { title, Content: content });
        onSave('Note created successfully!', 'success');
      } else {
        await axios.put(`/api/notes/${id}`, { title, Content: content });
        onSave('Note updated successfully!', 'success');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving note:', error);
      onSave('Failed to save note', 'error');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/notes/${id}`);
      onSave('Note deleted successfully!', 'success');
      navigate('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      onSave('Failed to delete note', 'error');
    }
    setDeleteModal(false);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Notes
        </button>
        {!isNewNote && (
          <button className="delete-note-btn" onClick={() => setDeleteModal(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete Note
          </button>
        )}
      </div>

      <div className="editor-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="title-input"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            className="content-input"
            placeholder="Write your note content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button 
          className="save-btn" 
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
      />
    </div>
  );
}

export default NoteEditor;

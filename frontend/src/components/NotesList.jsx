import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from './ConfirmModal';
import './NotesList.css';

function NotesList({ notes, onDelete }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, noteId: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDeleteClick = (e, noteId) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, noteId });
  };

  const confirmDelete = () => {
    onDelete(deleteModal.noteId);
    setDeleteModal({ isOpen: false, noteId: null });
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.querySelector('.search-modal-input')?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  const colors = [
    'linear-gradient(135deg, #FFD89B 0%, #FFC75F 100%)',
    'linear-gradient(135deg, #FF9A8B 0%, #FF6B95 100%)',
    'linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)',
    'linear-gradient(135deg, #A18CD1 0%, #C084FC 100%)',
    'linear-gradient(135deg, #FDEB71 0%, #F8D800 100%)',
    'linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)',
  ];

  const filteredNotes = searchQuery 
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.Content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">📝</div>
        </div>
        <button className="search-btn" onClick={handleSearchClick} title="Search Notes">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
        <button className="fab" onClick={() => navigate('/note/new')} title="New Note">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button className="logout-btn" onClick={logout} title="Logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h2 className="page-title">Notes</h2>
          {user && <p className="user-info">Welcome, {user.username}!</p>}
        </div>

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="search-modal-overlay" onClick={handleSearchClick}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
              <div className="search-modal-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input 
                  type="text" 
                  className="search-modal-input" 
                  placeholder="Search notes by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button className="close-search-btn" onClick={handleSearchClick}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {searchQuery && (
                <div className="search-results">
                  {filteredNotes.length === 0 ? (
                    <p className="no-results">No notes found matching "{searchQuery}"</p>
                  ) : (
                    <>
                      <p className="results-count">{filteredNotes.length} result{filteredNotes.length !== 1 ? 's' : ''} found</p>
                      <div className="search-notes-list">
                        {filteredNotes.map((note, index) => (
                          <div 
                            key={note._id} 
                            className="search-note-item"
                            onClick={() => {
                              navigate(`/note/${note._id}`);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="search-note-color" style={{ background: colors[index % colors.length] }}></div>
                            <div className="search-note-content">
                              <h4>{note.title}</h4>
                              <p>{note.Content.substring(0, 100)}{note.Content.length > 100 ? '...' : ''}</p>
                              <span className="search-note-date">{formatDate(note.createdAt)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>'No notes yet. Create your first note!'</p>
          </div>
        ) : (
          <div className="notes-grid-colorful">
            {notes.map((note, index) => (
              <div 
                key={note._id} 
                className="note-card-colorful"
                style={{ background: colors[index % colors.length] }}
                onClick={() => navigate(`/note/${note._id}`)}
              >
                <div className="card-content">
                  <h3 className="card-title">{note.title}</h3>
                  <p className="card-text">{note.Content}</p>
                </div>
                <div className="card-footer">
                  <span className="card-date">{formatDate(note.createdAt)}</span>
                  <div className="card-actions">
                    <button 
                      className="card-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/note/${note._id}`);
                      }}
                      title="Edit"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button 
                      className="card-action-btn card-delete-btn"
                      onClick={(e) => handleDeleteClick(e, note._id)}
                      title="Delete"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15" stroke="white" strokeWidth="2"></line>
                        <line x1="9" y1="9" x2="15" y2="15" stroke="white" strokeWidth="2"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, noteId: null })}
        onConfirm={confirmDelete}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
      />
    </div>
  );
}

export default NotesList;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Auth({ showToast }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return null;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++; // lowercase
    if (/[A-Z]/.test(password)) strength++; // uppercase
    if (/[0-9]/.test(password)) strength++; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) strength++; // special chars
    
    if (strength <= 2) return { level: 'weak', text: 'Weak', color: '#ff4757' };
    if (strength <= 4) return { level: 'medium', text: 'Medium', color: '#ffa502' };
    return { level: 'strong', text: 'Strong', color: '#26de81' };
  };

  const passwordStrength = !isLogin ? getPasswordStrength(formData.password) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        showToast('Welcome back!', 'success');
      } else {
        if (formData.password.length < 6) {
          showToast('Password must be at least 6 characters', 'warning');
          setLoading(false);
          return;
        }
        await register(formData.username, formData.email, formData.password);
        showToast('Account created successfully!', 'success');
      }
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
      showToast(error.response?.data?.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      
      {isLogin && (
        <div className="brand-title">
          <h1>NoteFreq</h1>
          <p>Your Ideas, Organized</p>
        </div>
      )}
      
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">📝</h1>
          <h2 className="auth-title">{isLogin ? 'Welcome Back!' : 'Join NoteFreq'}</h2>
          <p className="auth-subtitle">
            {isLogin ? 'We\'re excited to see you again! Sign in to continue your creative journey and access all your notes.' : 'Create your free account and start organizing your thoughts, ideas, and inspiration in one beautiful place.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                minLength={3}
              />
            </div>
          )}

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=""
              required
              autoComplete="off"
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                required
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {!isLogin && passwordStrength && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-fill strength-${passwordStrength.level}`}
                    style={{ 
                      width: passwordStrength.level === 'weak' ? '33%' : 
                             passwordStrength.level === 'medium' ? '66%' : '100%',
                      backgroundColor: passwordStrength.color
                    }}
                  ></div>
                </div>
                <p className="strength-text" style={{ color: passwordStrength.color }}>
                  {passwordStrength.text} password
                </p>
                <div className="password-tips">
                  <p>💡 Tips for a strong password:</p>
                  <ul>
                    <li style={{ opacity: formData.password.length >= 8 ? 0.5 : 1 }}>
                      {formData.password.length >= 8 ? '✓' : '○'} At least 8 characters
                    </li>
                    <li style={{ opacity: /[A-Z]/.test(formData.password) ? 0.5 : 1 }}>
                      {/[A-Z]/.test(formData.password) ? '✓' : '○'} Uppercase letter
                    </li>
                    <li style={{ opacity: /[a-z]/.test(formData.password) ? 0.5 : 1 }}>
                      {/[a-z]/.test(formData.password) ? '✓' : '○'} Lowercase letter
                    </li>
                    <li style={{ opacity: /[0-9]/.test(formData.password) ? 0.5 : 1 }}>
                      {/[0-9]/.test(formData.password) ? '✓' : '○'} Number
                    </li>
                    <li style={{ opacity: /[^a-zA-Z0-9]/.test(formData.password) ? 0.5 : 1 }}>
                      {/[^a-zA-Z0-9]/.test(formData.password) ? '✓' : '○'} Special character (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember Me
              </label>
              <button type="button" className="forgot-password">
                Forget Password
              </button>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have a account " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ username: '', email: '', password: '' });
              }}
              className="auth-switch-btn"
            >
              {isLogin ? 'Register' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;

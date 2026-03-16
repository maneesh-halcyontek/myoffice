import React, { useState } from 'react';
import './css/AddUser.css';
import './css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email address';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 8) e.password = 'Minimum 8 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const baseUrl = import.meta.env.VITE_API_URL;
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.detail || 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'Could not connect to server. Is the backend running?' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    border: `1.5px solid ${errors[name] ? '#fca5a5' : focused === name ? '#1a6fd4' : '#e2e8f0'}`,
    background: errors[name] ? '#fff5f5' : '#ffffff',
    boxShadow: focused === name ? '0 0 0 3px rgba(26,111,212,0.1)' : 'none',
  });

  return (
    <div className="au-page">
      <div className="au-container" style={{ maxWidth: '480px' }}>

        <div className="au-title-row" style={{ textAlign: 'center' }}>
          <h1 className="au-title">Welcome Back</h1>
          <p className="au-subtitle">Sign in to your account to continue.</p>
        </div>

        <div className="au-card">
          <div className="au-card-header">
            <div className="au-card-icon">🔐</div>
            <div>
              <div className="au-card-title">Sign In</div>
              <div className="au-card-desc">Enter your credentials below</div>
            </div>
          </div>

          <div className="au-form-body">

            {/* General error */}
            {errors.general && (
              <div className="login-error-banner">
                ⚠ {errors.general}
              </div>
            )}

            <div className="au-section-label">Account Credentials</div>

            {/* Email */}
            <div className="au-grid-1">
              <label className="au-label">Email Address *</label>
              <input
                name="email"
                type="email"
                placeholder="sarah@example.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                className="au-input"
                style={inputStyle('email')}
              />
              {errors.email && <div className="error-text">⚠ {errors.email}</div>}
            </div>

            {/* Password */}
            <div className="au-grid-1">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="au-label">Password *</label>
                <a href="/forgot-password" className="login-forgot">Forgot password?</a>
              </div>
              <div className="password-wrap">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  className="au-input"
                  style={inputStyle('password')}
                />
                <button className="pw-toggle" onClick={() => setShowPassword(!showPassword)} type="button">
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <div className="error-text">⚠ {errors.password}</div>}
            </div>

          </div>

          <div className="au-actions">
            <button
              className="btn-create"
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
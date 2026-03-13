import React, { useState } from 'react';
import './css/AddUser.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', gender: '', userType: '', password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email address';
    if (!formData.phone.trim()) e.phone = 'Phone number is required';
    if (!formData.gender) e.gender = 'Please select a gender';
    if (!formData.userType) e.userType = 'Please select a user type';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 8) e.password = 'Minimum 8 characters';
    return e;
  };

  // 👈 This was missing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // clear error on change
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      console.log('Validation errors:', e);
      setErrors(e);
      return;
    }

    const baseUrl = import.meta.env.VITE_API_URL;

    const data = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      gender: formData.gender,
      userType: formData.userType,
      password: formData.password
    };

    try {
      const response = await fetch(`${baseUrl}/auth/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setSubmitted(true);
        sleep(2000).then(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', gender:   '', userType: '', password: '' });    
        });
        
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Could not connect to the server. Is the backend running on port 5700?");
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', gender: '', userType: '', password: '' });
    setErrors({});
    setSubmitted(false);
  };

  const getStrength = () => {
    const p = formData.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { label: 'Weak', color: '#ef4444', width: '25%' };
    if (score === 2) return { label: 'Fair', color: '#f97316', width: '50%' };
    if (score === 3) return { label: 'Good', color: '#3b82f6', width: '75%' };
    return { label: 'Strong', color: '#22c55e', width: '100%' };
  };

  const strength = getStrength();

  const inputStyle = (name) => ({
    border: `1.5px solid ${errors[name] ? '#fca5a5' : focused === name ? '#1a6fd4' : '#e2e8f0'}`,
    background: errors[name] ? '#fff5f5' : '#ffffff',
    boxShadow: focused === name ? '0 0 0 3px rgba(26,111,212,0.1)' : 'none',
  });

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon-circle">✓</div>
          <p className="success-status-label">User Created Successfully</p>
          <h2 className="success-name">{formData.name}</h2>
          <p className="success-email">{formData.email}</p>
          <p className="success-phone">{formData.phone}</p>
          <div className="success-role-badge">{formData.userType}</div>
          <button className="btn-create" onClick={handleReset}>+ Add Another User</button>
        </div>
      </div>
    );
  }

  return (
    <div className="au-page">
      <div className="au-container">
        <div className="au-header">
          <div className="au-breadcrumb">Admin Panel › Users › <span>Add New User</span></div>
        </div>

        <div className="au-title-row">
          <h1 className="au-title">Add New User</h1>
          <p className="au-subtitle">Create a new internal account with specific access roles.</p>
        </div>

        <div className="au-card">
          <div className="au-card-header">
            <div className="au-card-icon">👤</div>
            <div>
              <div className="au-card-title">User Information</div>
              <div className="au-card-desc">Required fields are marked with *</div>
            </div>
          </div>

          <div className="au-form-body">
            <div className="au-section-label">Basic Information</div>

            <div className="au-grid-2">
              <div>
                <label className="au-label">Full Name *</label>
                <input name="name" type="text" placeholder="Sarah Johnson" value={formData.name} onChange={handleChange}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused('')} className="au-input" style={inputStyle('name')} />
                {errors.name && <div className="error-text">⚠ {errors.name}</div>}
              </div>
              <div>
                <label className="au-label">Email Address *</label>
                <input name="email" type="email" placeholder="sarah@example.com" value={formData.email} onChange={handleChange}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused('')} className="au-input" style={inputStyle('email')} />
                {errors.email && <div className="error-text">⚠ {errors.email}</div>}
              </div>
            </div>

            <div className="au-grid-1">
              <label className="au-label">Phone Number *</label>
              <input name="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange}
                onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} className="au-input" style={{...inputStyle('phone'), maxWidth: '340px'}} />
              {errors.phone && <div className="error-text">⚠ {errors.phone}</div>}
            </div>

            <div className="au-grid-1">
              <label className="au-label">Gender *</label>
              <div className="gender-group">
                {[{v:'Male', i:'♂'}, {v:'Female', i:'♀'}, {v:'Other', i:'⊕'}, {v:'Prefer not to say', i:'—'}].map(g => (
                  <div className="gender-option" key={g.v}>
                    <input type="radio" id={g.v} name="gender" value={g.v} checked={formData.gender === g.v} onChange={handleChange} />
                    <label className="gender-label" htmlFor={g.v}><span>{g.i}</span> {g.v}</label>
                  </div>
                ))}
              </div>
              {errors.gender && <div className="error-text">⚠ {errors.gender}</div>}
            </div>

            <div className="au-divider" />

            <div className="au-section-label">Role & Access</div>
            <div className="usertype-grid">
              {['Administrator', 'Manager', 'Editor', 'Viewer', 'Support'].map(role => (
                <div className="ut-option" key={role}>
                  <input type="radio" id={role} name="userType" value={role} checked={formData.userType === role} onChange={handleChange} />
                  <label className="ut-label" htmlFor={role}><span className="ut-name">{role}</span></label>
                </div>
              ))}
            </div>
            {errors.userType && <div className="error-text">⚠ {errors.userType}</div>}

            <div className="au-divider" />

            <div className="au-section-label">Security</div>
            <div style={{maxWidth: '420px'}}>
              <label className="au-label">Password *</label>
              <div className="password-wrap">
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" value={formData.password} onChange={handleChange}
                  onFocus={() => setFocused('password')} onBlur={() => setFocused('')} className="au-input" style={inputStyle('password')} />
                <button className="pw-toggle" onClick={() => setShowPassword(!showPassword)} type="button">
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {formData.password && strength && (
                <div className="strength-container">
                  <div className="strength-bar"><div className="strength-fill" style={{ width: strength.width, background: strength.color }} /></div>
                  <div className="strength-text" style={{color: strength.color}}>{strength.label} password</div>
                </div>
              )}
              {errors.password && <div className="error-text">⚠ {errors.password}</div>}
            </div>
          </div>

          <div className="au-actions">
            <button className="btn-cancel" onClick={handleReset}>Reset Form</button>
            <button className="btn-create" onClick={handleSubmit}>Create User Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
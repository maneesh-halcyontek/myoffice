import React, { useState } from 'react';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', gender: '', userType: '', password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const userTypes = ['Administrator', 'Manager', 'Editor', 'Viewer', 'Support'];

  const validate = () => {
    const e = {};
    if (!formData.name.trim())     e.name     = 'Full name is required';
    if (!formData.email.trim())    e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email address';
    if (!formData.phone.trim())    e.phone    = 'Phone number is required';
    if (!formData.gender)          e.gender   = 'Please select a gender';
    if (!formData.userType)        e.userType = 'Please select a user type';
    if (!formData.password)        e.password = 'Password is required';
    else if (formData.password.length < 8) e.password = 'Minimum 8 characters';
    return e;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    console.log('New user:', formData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', gender: '', userType: '', password: '' });
    setErrors({});
    setSubmitted(false);
  };

  const passwordStrength = () => {
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

  const strength = passwordStrength();

  const inputStyle = (name) => ({
    width: '100%',
    padding: '12px 16px',
    border: `1.5px solid ${errors[name] ? '#fca5a5' : focused === name ? '#1a6fd4' : '#e2e8f0'}`,
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontFamily: '"DM Sans", sans-serif',
    color: '#1e293b',
    background: errors[name] ? '#fff5f5' : '#ffffff',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === name ? '0 0 0 3px rgba(26,111,212,0.1)' : 'none',
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '7px',
  };

  const errorStyle = {
    fontSize: '0.74rem',
    color: '#ef4444',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  if (submitted) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
          @keyframes pop { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
        <div style={{ minHeight: '100vh', background: '#f1f5fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '56px 48px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', maxWidth: 400, animation: 'fadeUp 0.6s ease forwards' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#eef9f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'pop 0.5s ease forwards', fontSize: '2rem' }}>✓</div>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#1a6fd4', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>User Created</p>
            <h2 style={{ fontFamily: '"Sora", sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{formData.name}</h2>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: 6 }}>{formData.email}</p>
            <div style={{ display: 'inline-block', background: '#eef4ff', color: '#1a6fd4', borderRadius: '100px', padding: '4px 14px', fontSize: '0.75rem', fontWeight: 600, marginBottom: 32 }}>{formData.userType}</div>
            <br />
            <button onClick={handleReset} style={{ background: '#1a6fd4', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 28px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(26,111,212,0.25)' }}>
              + Add Another User
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        .au-page {
          min-height: 100vh;
          background: #f1f5fb;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 48px 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .au-container {
          width: 100%;
          max-width: 780px;
          animation: fadeUp 0.6s ease forwards;
        }

        .au-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          animation: fadeUp 0.6s ease 0.05s both;
        }

        .au-breadcrumb {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .au-breadcrumb span { color: #1e293b; font-weight: 600; }

        .au-title-row { animation: fadeUp 0.6s ease 0.1s both; margin-bottom: 28px; }

        .au-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
        }

        .au-subtitle {
          font-size: 0.88rem;
          color: #94a3b8;
          margin-top: 5px;
        }

        .au-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e8eef8;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          overflow: hidden;
          animation: fadeUp 0.6s ease 0.15s both;
        }

        .au-card-header {
          padding: 22px 32px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(to right, #fafcff, #ffffff);
        }

        .au-card-icon {
          width: 38px; height: 38px;
          background: #eef4ff;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .au-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #1e293b;
        }

        .au-card-desc {
          font-size: 0.78rem;
          color: #94a3b8;
          margin-top: 1px;
        }

        .au-form-body {
          padding: 32px;
        }

        .au-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #cbd5e1;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .au-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #f1f5f9;
        }

        .au-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .au-grid-1 {
          margin-bottom: 20px;
        }

        .au-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 28px 0;
        }

        .gender-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .gender-option {
          flex: 1;
          min-width: 90px;
        }

        .gender-option input[type="radio"] {
          display: none;
        }

        .gender-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
          background: #fff;
        }

        .gender-option input:checked + .gender-label {
          border-color: #1a6fd4;
          background: #eef4ff;
          color: #1a6fd4;
          font-weight: 600;
        }

        .gender-label:hover {
          border-color: #93c5fd;
          background: #f8faff;
        }

        .usertype-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .ut-option input[type="radio"] { display: none; }

        .ut-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 14px 10px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
          background: #fff;
          text-align: center;
        }

        .ut-option input:checked + .ut-label {
          border-color: #1a6fd4;
          background: #eef4ff;
        }

        .ut-label:hover { border-color: #93c5fd; background: #f8faff; }

        .ut-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          transition: background 0.2s;
        }

        .ut-option input:checked + .ut-label .ut-icon {
          background: #dbeafe;
        }

        .ut-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
        }

        .ut-option input:checked + .ut-label .ut-name {
          color: #1a6fd4;
        }

        .password-wrap {
          position: relative;
        }

        .pw-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          font-size: 1rem;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .pw-toggle:hover { color: #1a6fd4; }

        .strength-bar {
          height: 4px;
          background: #f1f5f9;
          border-radius: 4px;
          margin-top: 8px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.4s ease, background 0.4s ease;
        }

        .strength-label {
          font-size: 0.72rem;
          font-weight: 600;
          margin-top: 5px;
        }

        .au-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 24px 32px;
          border-top: 1px solid #f1f5f9;
          background: #fafcff;
        }

        .btn-cancel {
          background: transparent;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-cancel:hover { background: #f8faff; border-color: #cbd5e1; }

        .btn-create {
          background: #1a6fd4;
          border: none;
          border-radius: 10px;
          padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(26,111,212,0.25);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-create:hover {
          background: #1352a8;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(26,111,212,0.32);
        }

        @media (max-width: 600px) {
          .au-grid-2 { grid-template-columns: 1fr; }
          .usertype-grid { grid-template-columns: repeat(2, 1fr); }
          .au-form-body, .au-actions { padding: 24px 20px; }
        }
      `}</style>

      <div className="au-page">
        <div className="au-container">

          {/* Header */}
          <div className="au-header">
            <div className="au-breadcrumb">
              Admin Panel › Users › <span>Add New User</span>
            </div>
          </div>

          <div className="au-title-row">
            <h1 className="au-title">Add New User</h1>
            <p className="au-subtitle">Fill in the details below to create a new user account.</p>
          </div>

          <div className="au-card">
            <div className="au-card-header">
              <div className="au-card-icon">👤</div>
              <div>
                <div className="au-card-title">User Information</div>
                <div className="au-card-desc">All fields marked with * are required</div>
              </div>
            </div>

            <div className="au-form-body">

              {/* Section: Basic Info */}
              <div className="au-section-label">Basic Information</div>

              <div className="au-grid-2">
                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    name="name" type="text" placeholder="e.g. Sarah Johnson"
                    value={formData.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    style={inputStyle('name')}
                  />
                  {errors.name && <div style={errorStyle}>⚠ {errors.name}</div>}
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    name="email" type="email" placeholder="sarah@example.com"
                    value={formData.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    style={inputStyle('email')}
                  />
                  {errors.email && <div style={errorStyle}>⚠ {errors.email}</div>}
                </div>
              </div>

              {/* Phone */}
              <div className="au-grid-1">
                <label style={labelStyle}>Phone Number *</label>
                <input
                  name="phone" type="tel" placeholder="+1 (555) 000-0000"
                  value={formData.phone} onChange={handleChange}
                  onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                  style={{ ...inputStyle('phone'), maxWidth: 340 }}
                />
                {errors.phone && <div style={errorStyle}>⚠ {errors.phone}</div>}
              </div>

              {/* Gender */}
              <div className="au-grid-1">
                <label style={labelStyle}>Gender *</label>
                <div className="gender-group">
                  {[
                    { value: 'male',   label: 'Male',   icon: '♂' },
                    { value: 'female', label: 'Female', icon: '♀' },
                    { value: 'other',  label: 'Other',  icon: '⊕' },
                    { value: 'prefer-not', label: 'Prefer not to say', icon: '—' },
                  ].map(g => (
                    <div className="gender-option" key={g.value}>
                      <input
                        type="radio" id={`gender-${g.value}`}
                        name="gender" value={g.value}
                        checked={formData.gender === g.value}
                        onChange={handleChange}
                      />
                      <label className="gender-label" htmlFor={`gender-${g.value}`}>
                        <span>{g.icon}</span> {g.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.gender && <div style={errorStyle}>⚠ {errors.gender}</div>}
              </div>

              <div className="au-divider" />

              {/* Section: Role */}
              <div className="au-section-label">Role & Access</div>

              <div className="au-grid-1" style={{ marginBottom: 28 }}>
                <label style={labelStyle}>User Type *</label>
                <div className="usertype-grid">
                  {[
                    { value: 'Administrator', icon: '🛡️' },
                    { value: 'Manager',       icon: '📋' },
                    { value: 'Editor',        icon: '✏️' },
                    { value: 'Viewer',        icon: '👁️' },
                    { value: 'Support',       icon: '🎧' },
                  ].map(ut => (
                    <div className="ut-option" key={ut.value}>
                      <input
                        type="radio" id={`ut-${ut.value}`}
                        name="userType" value={ut.value}
                        checked={formData.userType === ut.value}
                        onChange={handleChange}
                      />
                      <label className="ut-label" htmlFor={`ut-${ut.value}`}>
                        <div className="ut-icon">{ut.icon}</div>
                        <div className="ut-name">{ut.value}</div>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.userType && <div style={errorStyle}>⚠ {errors.userType}</div>}
              </div>

              <div className="au-divider" />

              {/* Section: Security */}
              <div className="au-section-label">Security</div>

              <div style={{ maxWidth: 420 }}>
                <label style={labelStyle}>Password *</label>
                <div className="password-wrap">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    style={{ ...inputStyle('password'), paddingRight: '44px' }}
                  />
                  <button className="pw-toggle" onClick={() => setShowPassword(!showPassword)} type="button">
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
                {formData.password && strength && (
                  <>
                    <div className="strength-bar">
                      <div className="strength-fill" style={{ width: strength.width, background: strength.color }} />
                    </div>
                    <div className="strength-label" style={{ color: strength.color }}>
                      {strength.label} password
                    </div>
                  </>
                )}
                {errors.password && <div style={errorStyle}>⚠ {errors.password}</div>}
              </div>

            </div>

            {/* Actions */}
            <div className="au-actions">
              <button className="btn-cancel" onClick={handleReset}>Cancel</button>
              <button className="btn-create" onClick={handleSubmit}>
                <span>+ Create User</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AddUser;

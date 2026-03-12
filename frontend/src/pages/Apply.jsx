import React, { useState } from 'react';
import { Box, TextField, Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './Apply.css'; // Import your new CSS file

const Apply = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', position: '', coverLetter: '' });
  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');
  
  const ACCENT_COLOR = '#1a6fd4';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setResume(e.target.files[0]);

   const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Validation
  if (!formData.fullName || !formData.email || !resume) {
    alert("Please fill in all required fields and upload your resume.");
    return;
  }

  // 2. Prepare the Multipart Form Data
  const data = new FormData();
  data.append('fullName', formData.fullName);
  data.append('email', formData.email);
  data.append('position', formData.position);
  data.append('coverLetter', formData.coverLetter);
  data.append('resume', resume); // The file itself

  const baseUrl = import.meta.env.VITE_API_URL;

  try {
        // 3. The Fetch Request to your FastAPI backend
        const response = await fetch(`${baseUrl}/apply`, {
        method: 'POST',
        body: data, // No 'Content-Type' header needed; browser sets it for FormData
        });

        if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setSubmitted(true); // Show the success screen
        } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Could not connect to the server. Is the backend running on port 5700?");
    }
    };

  // MUI Custom Styles Function
  const inputSx = (name) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      background: '#fff',
      '& fieldset': { borderColor: '#d0d7e2', borderWidth: '1.5px' },
      '&:hover fieldset': { borderColor: '#7aaee8' },
      '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR, borderWidth: '2px' },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': { color: ACCENT_COLOR },
    }
  });

  if (submitted) {
    return (
      <div className="success-screen">
        <div className="success-content">
          <div className="success-icon-wrap">
            <CheckCircleOutlineIcon sx={{ fontSize: 72, color: ACCENT_COLOR, mb: 2 }} />
          </div>
          <p className="form-eyebrow">Application Received</p>
          <h2 className="left-heading" style={{ color: '#1a2236' }}>Thank you, {formData.fullName}.</h2>
          <p className="left-sub" style={{ color: '#8a94a6', fontStyle: 'italic' }}>We'll review your application and be in touch shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-wrapper">
      <div className="left-panel">
        <div>
          <div className="brand-tag">My Office · Careers</div>
          <h1 className="left-heading">Shape the<br /><em>future</em><br />with us.</h1>
          <p className="left-sub">We're looking for exceptional minds who move fast.</p>
          <div className="divider" />
          <ul className="perks">
            {['Competitive compensation', 'Remote-first culture', 'Learning & growth budget'].map(p => (
              <li key={p}><span className="perk-dot" />{p}</li>
            ))}
          </ul>
        </div>
        <div className="left-footer">My Office · Data Intelligence · 2026</div>
      </div>

      <div className="right-panel">
        <div className="form-inner">
          <div className="form-eyebrow">Open Application</div>
          <div className="form-title">Join Our Team</div>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6} className="form-row">
              <TextField required fullWidth label="Full Name" name="fullName" onChange={handleChange} sx={inputSx('fullName')} />
            </Grid>
            <Grid item xs={12} sm={6} className="form-row">
              <TextField required fullWidth label="Email Address" name="email" type="email" onChange={handleChange} sx={inputSx('email')} />
            </Grid>
            <Grid item xs={12} className="form-row">
              <TextField fullWidth label="Position Desired" name="position" onChange={handleChange} sx={inputSx('position')} />
            </Grid>

            <Grid item xs={12} className="form-row">
              <label htmlFor="resume-upload">
                <div className="upload-zone">
                  <CloudUploadIcon sx={{ color: ACCENT_COLOR, fontSize: 26 }} />
                  <div>
                    <div className="upload-label">{resume ? "Resume Attached" : "Upload Resume"}</div>
                    {resume ? <div className="file-name">{resume.name}</div> : <div className="upload-hint">PDF, DOCX accepted</div>}
                  </div>
                </div>
                <input id="resume-upload" type="file" hidden onChange={handleFileChange} />
              </label>
            </Grid>

            <Grid item xs={12} className="form-row">
              <TextField fullWidth multiline rows={4} label="Cover Letter" name="coverLetter" onChange={handleChange} sx={inputSx('coverLetter')} />
            </Grid>

            <Grid item xs={12} className="form-row">
              <button className="submit-btn" onClick={handleSubmit}>
                Submit Application <SendIcon sx={{ fontSize: 16 }} />
              </button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Apply;
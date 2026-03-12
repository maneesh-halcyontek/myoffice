import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './css/Header.css'; // Import the new CSS file

// Icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const Header = () => {
  const [hrOpen, setHrOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeAll();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeAll = () => { setHrOpen(false); setActiveSection(null); };

  const toggleSection = (section) =>
    setActiveSection(prev => (prev === section ? null : section));

  const getIconColor = (isActive) => ({ 
    fontSize: 17, 
    color: isActive ? '#1a6fd4' : '#64748b' 
  });

  return (
    <AppBar position="static" sx={{
      background: 'linear-gradient(90deg,#1352a8 0%,#1a6fd4 100%)',
      boxShadow: '0 2px 16px rgba(19,82,168,.2)',
    }}>
      <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: 0.5 }}>
        
        {/* Brand Logo */}
        <AssessmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 22 }} />
        <Typography variant="h6" noWrap component="a" href="/" sx={{
          mr: 3, display: { xs: 'none', md: 'flex' },
          fontFamily: '"DM Sans",sans-serif', fontWeight: 700, fontSize: '1rem',
          letterSpacing: '.1rem', color: 'inherit', textDecoration: 'none',
        }}>
          My Office
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Main Navigation Links */}
          {['/', '/about', '/job-application'].map((path, i) => (
            <Button key={path} className="nav-btn" component={Link} to={path}
              sx={{ color: 'rgba(255,255,255,.9)', borderRadius: '8px', px: 1.5,
                    '&:hover': { background: 'rgba(255,255,255,.12)', color: '#fff' } }}>
              {['Home', 'About', 'Apply for Job'][i]}
            </Button>
          ))}

          {/* HR Dropdown Menu */}
          <Box ref={menuRef} sx={{ position: 'relative' }}>
            <Button
              className="nav-btn"
              onClick={() => { setHrOpen(o => !o); if (hrOpen) setActiveSection(null); }}
              endIcon={
                <KeyboardArrowDownIcon sx={{
                  fontSize: '18px !important',
                  transition: 'transform .2s',
                  transform: hrOpen ? 'rotate(180deg)' : 'none',
                }} />
              }
              sx={{
                color: '#fff', borderRadius: '8px', px: 1.5,
                background: hrOpen ? 'rgba(255,255,255,.18)' : 'transparent',
                '&:hover': { background: 'rgba(255,255,255,.13)' },
              }}
            >
              <PeopleIcon sx={{ fontSize: 17, mr: 0.6 }} />
              Human Resource
            </Button>

            {hrOpen && (
              <div className="hr-dropdown">
                {/* STAFF SECTION */}
                <div className="hr-section-head">Staff</div>
                <button
                  className={`hr-row ${activeSection === 'staff' ? 'active' : ''}`}
                  onClick={() => toggleSection('staff')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <GroupIcon className="hr-icon" sx={getIconColor(activeSection === 'staff')} />
                    Staff
                  </span>
                  <KeyboardArrowRightIcon sx={{
                    fontSize: 17, color: '#94a3b8',
                    transition: 'transform .2s',
                    transform: activeSection === 'staff' ? 'rotate(90deg)' : 'none',
                  }} />
                </button>

                {activeSection === 'staff' && (
                  <div className="hr-sub-panel">
                    <Link to="/user-add" className="sub-row" onClick={closeAll}>
                      <PersonAddIcon sx={{ fontSize: 16, color: '#64748b' }} />
                      Add User
                    </Link>
                    <Link to="/admin/payroll" className="sub-row" onClick={closeAll}>
                      <AccountBalanceWalletIcon sx={{ fontSize: 16, color: '#64748b' }} />
                      Payroll
                    </Link>
                  </div>
                )}

                {/* APPLICANTS SECTION */}
                <div className="hr-section-head">Applicants</div>
                <button
                  className={`hr-row ${activeSection === 'applicants' ? 'active' : ''}`}
                  onClick={() => toggleSection('applicants')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PeopleIcon className="hr-icon" sx={getIconColor(activeSection === 'applicants')} />
                    Applicants
                  </span>
                  <KeyboardArrowRightIcon sx={{
                    fontSize: 17, color: '#94a3b8',
                    transition: 'transform .2s',
                    transform: activeSection === 'applicants' ? 'rotate(90deg)' : 'none',
                  }} />
                </button>

                {activeSection === 'applicants' && (
                  <div className="hr-sub-panel">
                    <Link to="/admin/applicants/new" className="sub-row" onClick={closeAll}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#64748b' }} />
                      New Applicants
                    </Link>
                    <Link to="/admin/applicants/rejected" className="sub-row" onClick={closeAll}>
                      <CancelOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
                      Rejected Applicants
                    </Link>
                  </div>
                )}
              </div>
            )}
          </Box>
        </Box>

        {/* Login Button */}
        <Button color="inherit" variant="outlined" className="nav-btn" sx={{
          borderColor: 'rgba(255,255,255,.4)', borderRadius: '8px', px: 2.5, fontWeight: 600,
          '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' },
        }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
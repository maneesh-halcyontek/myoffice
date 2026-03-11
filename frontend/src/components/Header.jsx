import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2', width: '100%' }}>
      {/* Container removed to allow 100% width */}
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}> 
        {/* Added px (padding-left/right) so items aren't touching the very edge of the glass */}
        
        <AssessmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          My Office
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>Dashboard</Button>
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>Archives</Button>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Button color="inherit" variant="outlined">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
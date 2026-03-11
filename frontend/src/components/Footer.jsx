import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 4, // Increased horizontal padding for a better look on wide screens
        mt: 'auto',
        width: '100%', // Ensures the box takes the full width
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      {/* Removed <Container> entirely so the text 
         isn't boxed into a specific width.
      */}
      <Typography variant="body1" align="center">
        My Office - Data Intelligence
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        {'Copyright © '}
        <Link color="inherit" href="https://yourdomain.com/">
          My Office
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;
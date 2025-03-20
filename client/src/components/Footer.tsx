import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ p: 2, textAlign: 'right', backgroundColor: '#f1f1f1', position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <Typography variant="body2" color="textSecondary">
        Made with ❤️ by <a href="https://github.com/createadi/">Aditya</a>
      </Typography>
    </Box>
  );
};

export default Footer;

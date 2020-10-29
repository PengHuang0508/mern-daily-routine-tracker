import React from 'react';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>Daily Routine Tracker</Typography>
        <Box component='span' marginLeft='auto' color='#eee'>
          How does it work? Try to sign in as Bob.
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

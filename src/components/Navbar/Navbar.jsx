import React from 'react';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>Daily Routine Tracker</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

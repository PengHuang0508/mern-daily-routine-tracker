import React from 'react';
import { Link } from 'react-router-dom';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// Icons
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6'>Home</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

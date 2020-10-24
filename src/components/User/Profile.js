import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 250,
  },
}));

const Account = () => {
  const classes = useStyles();
  const { username } = useSelector((state) => ({
    username: state.user.username,
  }));
  return (
    <React.Fragment>
      <Typography color='textSecondary' gutterBottom>
        Welcome back
      </Typography>
      <Typography variant='h5' component='h2'>
        {username}
      </Typography>
    </React.Fragment>
  );
};

export default Account;

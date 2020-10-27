import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
// Components
import Account from './Account';
import CreateRoutine from '../RoutineLog/CreateRoutine';

const useStyles = makeStyles((theme) => ({
  userCard: {
    minHeight: 300,
  },
}));

const UserCard = () => {
  const classes = useStyles();
  const { authenticated } = useSelector((state) => ({
    authenticated: state.user.authenticated,
  }));

  return (
    <Paper className={classes.userCard} elevation={2}>
      <Account />
      <CreateRoutine />
    </Paper>
  );
};

export default UserCard;

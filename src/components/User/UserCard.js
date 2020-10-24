import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLog } from '../../redux/actions/userActions';
// Hooks
import { useInputs } from '../../hooks/useInputs';
// MUI
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// Components
import Account from './Account';

const useStyles = makeStyles((theme) => ({
  userCard: {
    height: '100%',
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
    </Paper>
  );
};

export default UserCard;

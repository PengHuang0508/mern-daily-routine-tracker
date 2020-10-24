import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, signIn } from '../../redux/actions/userActions';
// Hooks
import { useInputs } from '../../hooks/useInputs';
// MUI
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
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
// Helpers
import { escapeHtml } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  accountContainer: {
    height: '100%',
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
  },
  accountTitle: {
    paddingTop: theme.spacing(2),
  },
  accountInput: {
    width: '90%',
    margin: theme.spacing(2, 0),
  },
  accountButton: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

const Account = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { authenticated, username, errors } = useSelector((state) => ({
    authenticated: state.user.authenticated,
    username: state.user.username,
    errors: state.ui.errors ? state.ui.errors : '',
  }));

  const [usernameInput, setUsernameInput] = useState('');

  const handleRegister = () => {
    // prevent xss injection
    const encodedUsername = escapeHtml(usernameInput);

    dispatch(register(encodedUsername));
  };
  const handleSignIn = () => {
    // prevent xss injection
    const encodedUsername = escapeHtml(usernameInput);

    dispatch(signIn(encodedUsername));
  };

  const UnauthenticatedContent = () => (
    <React.Fragment>
      <Typography className={classes.accountTitle} variant='h4' gutterBottom>
        Welcome
      </Typography>

      <TextField
        id='username'
        className={classes.accountInput}
        label='Username'
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        error={errors ? true : false}
        helperText={errors.account}
        variant='outlined'
        fullWidth
        autoFocus
        required
      />
      <div className={classes.accountButton}>
        <Button onClick={handleRegister} variant='contained' color='primary'>
          Register
        </Button>
        <Button onClick={handleSignIn} variant='contained' color='primary'>
          Sign In
        </Button>
      </div>
    </React.Fragment>
  );

  return (
    <div className={classes.accountContainer}>
      {authenticated ? (
        <Typography className={classes.accountTitle} variant='h4' gutterBottom>
          Welcome back {username}
        </Typography>
      ) : (
        <UnauthenticatedContent />
      )}
    </div>
  );
};

export default Account;

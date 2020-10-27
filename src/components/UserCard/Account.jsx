import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, signIn, signOut } from '../../redux/actions/userActions';
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
import { capitalizeFirstLetter, escapeHtml } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  accountContainer: {
    textAlign: 'center',
  },
  accountTitle: {
    display: 'inline-block',
    paddingTop: theme.spacing(2),

    '& span': {
      fontWeight: 'bold',
    },
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

  // prevent xss injection
  let encodedUsername = escapeHtml(usernameInput);

  const handleRegister = () => {
    dispatch(register(encodedUsername));

    setUsernameInput('');
  };
  const handleSignIn = () => {
    dispatch(signIn(encodedUsername));
    setUsernameInput('');
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
        error={errors.account ? true : false}
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

  const AuthenticatedContent = () => (
    <Box display='flex' alignItems='baseline' justifyContent='space-around'>
      <Typography className={classes.accountTitle} component='h2' variant='h5'>
        Welcome back <span>{capitalizeFirstLetter(username)}</span>
      </Typography>
      <Button
        onClick={() => dispatch(signOut())}
        variant='contained'
        color='primary'
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <div className={classes.accountContainer}>
      {authenticated ? <AuthenticatedContent /> : <UnauthenticatedContent />}
    </div>
  );
};

export default Account;

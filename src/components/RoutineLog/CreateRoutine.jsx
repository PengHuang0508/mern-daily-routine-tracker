import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRoutineLog } from '../../redux/actions/logActions';
// Hooks
import { useLog } from '../../hooks/useLog';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
// Helpers
import { capitalizeFirstLetter } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  createRoutineContainer: {
    // height: '100%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 5),
    background: '#f1f1f1',
  },
  createRoutineWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1em',
  },
  routineDate: {
    gridColumn: '1/3',
  },
  routineButton: {
    gridRow: 4,
    gridColumn: '2/4',
  },
  errorText: {
    marginTop: theme.spacing(1),
    color: 'red',
    textAlign: 'center',
  },
}));

const CreateRoutine = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { username, errors } = useSelector((state) => ({
    username: state.user.username,
    errors: state.ui.errors ? state.ui.errors : '',
  }));

  const today = new Date().toISOString().substr(0, 10);
  const initialState = {
    sleep: 0,
    work: 0,
    exercise: 0,
    relax: 0,
    miscellaneous: 0,
  };
  const { input: logInput, bind: bindLogInput, reset: resetLogInput } = useLog(
    initialState
  );
  const [logDate, setLogDate] = useState(today);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRoutineLog = {
      username,
      routine: logInput,
      date: logDate,
    };

    dispatch(createRoutineLog(newRoutineLog));
  };

  return (
    <Box className={classes.createRoutineContainer}>
      <form
        className={classes.createRoutineWrapper}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          className={classes.routineDate}
          label='Date'
          name='date'
          type='date'
          defaultValue={today}
          onChange={(e) => setLogDate(e.target.value)}
        />
        {['sleep', 'work', 'exercise', 'relax', 'miscellaneous'].map(
          (routine) => (
            <TextField
              key={`routine-${routine}`}
              label={capitalizeFirstLetter(routine)}
              name={routine}
              value={Number(logInput[routine])}
              type='number'
              inputProps={{
                min: 0,
                max: 24,
              }}
              {...bindLogInput}
            />
          )
        )}

        <Button
          className={classes.routineButton}
          type='submit'
          variant='contained'
          color='primary'
        >
          CREATE LOG
        </Button>
      </form>
      {errors.log && (
        <Typography className={classes.errorText} component='p' variant='body1'>
          {errors.log}
        </Typography>
      )}
    </Box>
  );
};

export default CreateRoutine;

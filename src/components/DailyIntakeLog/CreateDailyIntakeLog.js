import React from 'react';
// Hooks
import { useInputs } from '../../hooks/useInputs';
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

const useStyles = makeStyles((theme) => ({
  intakeCard: {
    width: '100%',
    height: '100%',
    minWidth: 275,

    background: 'rgb(240,230,220)',
  },
  intakeForm: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },
}));

const CreateDailyIntakeLog = () => {
  const classes = useStyles();

  const initialState = {
    fat: 0,
    saturates: 0,
    fibre: 0,
    sugars: 0,
    cholesterol: 0,
    sodium: 0,
  };
  const {
    inputs: userInputs,
    bind: bindUserInputs,
    reset: resetUserInputs,
  } = useInputs(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.info(userInputs);
  };

  return (
    <Card className={classes.intakeCard}>
      <CardContent>
        <form
          className={classes.intakeForm}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <TextField
            id='intake-fat'
            label='Fat'
            name='fat'
            value={userInputs.fat}
            {...bindUserInputs}
          />
          <TextField
            id='intake-saturates'
            label='Saturates'
            name='saturates'
            value={userInputs.saturates}
            {...bindUserInputs}
          />
          <TextField
            id='intake-fibre'
            label='Fibre'
            name='fibre'
            value={userInputs.fibre}
            {...bindUserInputs}
          />
          <TextField
            id='intake-sugars'
            label='Sugars'
            name='sugars'
            value={userInputs.sugars}
            {...bindUserInputs}
          />
          <TextField
            id='intake-cholesterol'
            label='Cholesterol'
            name='cholesterol'
            value={userInputs.cholesterol}
            {...bindUserInputs}
          />
          <TextField
            id='intake-sodium'
            label='Sodium'
            name='sodium'
            value={userInputs.sodium}
            {...bindUserInputs}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateDailyIntakeLog;

/* {
    ['Fat', 'Saturates', 'Fibre', 'Sugars', 'Cholesterol', 'Sodium'].map((category, index)=> (
     
    ))
  }   */

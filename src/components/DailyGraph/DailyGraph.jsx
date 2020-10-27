import React from 'react';
// MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));
const DailyGraph = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.userCard} elevation={2}>
      GRAPH HERE
    </Paper>
  );
};

export default DailyGraph;

import React from 'react';
// MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
// Components
import SVGRadarChart from './SVGRadarChart';

const useStyles = makeStyles((theme) => ({
  dailyGraphContainer: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
}));

const DailyGraph = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.dailyGraphContainer} elevation={2}>
      <SVGRadarChart />
    </Paper>
  );
};

export default DailyGraph;

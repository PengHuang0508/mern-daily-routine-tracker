import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// Components
import UserCard from '../components/UserCard/UserCard';
import DailyGraph from '../components/DailyGraph/DailyGraph';
import RoutineLog from '../components/RoutineLog/RoutineLog';

const useStyles = makeStyles((theme) => ({
  homePage: {
    marginTop: theme.spacing(5),
  },
}));
const Home = () => {
  const classes = useStyles();
  return (
    <Container className={classes.homePage}>
      <Grid container justify='center' spacing={4}>
        <Grid item xs={12} sm={6}>
          <UserCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DailyGraph />
        </Grid>
        <Grid item xs={12}>
          <RoutineLog />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

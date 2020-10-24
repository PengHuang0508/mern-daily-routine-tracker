import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// Components
import UserCard from '../components/User/UserCard';
import CreateDailyIntakeLog from '../components/DailyIntakeLog/CreateDailyIntakeLog';
import DailyIntakeLog from '../components/DailyIntakeLog/DailyIntakeLog';
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
          <CreateDailyIntakeLog />
        </Grid>
        <Grid item xs={12}>
          <DailyIntakeLog />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

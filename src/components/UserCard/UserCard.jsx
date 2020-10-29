import React from 'react';
// MUI
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// Components
import Account from './Account';
import CreateRoutine from '../RoutineLog/CreateRoutine';

const UserCard = () => {
  return (
    <Box component={Paper} elevation={2} height='100%'>
      <Account />
      <CreateRoutine />
    </Box>
  );
};

export default UserCard;

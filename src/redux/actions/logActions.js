import axios from 'axios';
import {
  LOADING_UI,
  LOADING_UI_DONE,
  SET_USER,
  CLEAR_USER,
  SET_LOG,
  CLEAR_LOG,
  SET_ERRORS,
  CLEAR_ERRORS,
} from '../types';

export const getRoutineLog = (username) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  axios
    .get(`/daily-routine/${username}`)
    .then((res) => {
      dispatch({ type: SET_LOG, payload: res.data });
    })
    .catch((err) =>
      dispatch({ type: SET_ERRORS, payload: { log: err.response.data } })
    );

  dispatch({ type: LOADING_UI_DONE });
};

export const createRoutineLog = (newRoutineLog) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  axios
    .post('/daily-routine/add', newRoutineLog)
    .then(() => {
      dispatch(getRoutineLog(newRoutineLog.username));
    })
    .catch((err) => {
      console.log('err.response', err.response.data);
      dispatch({ type: SET_ERRORS, payload: { log: err.response.data.error } });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const updateRoutineLog = (updatedRoutineLog) => (dispatch) => {
  console.info('WOW');
  console.log('updatedRoutineLog', updatedRoutineLog);
};

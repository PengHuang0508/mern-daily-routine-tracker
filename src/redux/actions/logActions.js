import axios from 'axios';
import {
  LOADING_UI,
  LOADING_UI_DONE,
  SET_LOG,
  SET_CHART_DATA,
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
      dispatch({ type: SET_ERRORS, payload: { log: err.response.data.error } });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const presentRoutineLog = (routineLog) => (dispatch) => {
  dispatch({ type: SET_CHART_DATA, data: routineLog.routine });
};

export const updateRoutineLog = (newRoutineLog) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  const routineId = newRoutineLog._id;
  const updatedRoutineLog = {
    username: newRoutineLog.username,
    routine: newRoutineLog.routine,
    date: newRoutineLog.date,
  };

  return axios
    .post(`/daily-routine/update/${routineId}`, updatedRoutineLog)
    .then(() => {
      dispatch(getRoutineLog(updatedRoutineLog.username));
      dispatch({ type: LOADING_UI_DONE });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: { logTable: err.response.data.error },
      });
    });
};

export const deleteRoutineLog = (toBeDeletedRoutineLog) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  const routineId = toBeDeletedRoutineLog._id;
  const username = toBeDeletedRoutineLog.username;

  return axios
    .delete(`/daily-routine/${routineId}`)
    .then(() => {
      dispatch(getRoutineLog(username));
      dispatch({ type: LOADING_UI_DONE });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: { logTable: err.response.data.error },
      });
    });
};

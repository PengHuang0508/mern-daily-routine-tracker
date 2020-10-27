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
import { getRoutineLog } from './logActions';

export const signIn = (username) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  axios
    .post('user/signIn', { username })
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
      dispatch(getRoutineLog(username));
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: { account: err.response.data.error },
      });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const register = (username) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  axios
    .post('user/register', { username })
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
      dispatch(getRoutineLog(username));
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: { account: err.response.data.error },
      });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_LOG });
};

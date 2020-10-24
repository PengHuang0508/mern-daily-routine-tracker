import axios from 'axios';
import {
  LOADING_UI,
  LOADING_UI_DONE,
  SET_USER,
  CLEAR_USER,
  SET_LOG,
  CLEAR_LOG,
  SET_ERRORS,
} from '../types';

export const getUserLog = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get('daily-intake-logs/')
    .then((res) => {
      dispatch({ type: SET_LOG, payload: res.data });
    })
    .catch((err) => console.log(err));

  dispatch({ type: LOADING_UI_DONE });
};

export const signIn = (username) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post('user/signIn', { username })
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: { account: err.response.data } });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const register = (username) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post('user/register', { username })
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: { account: err.response.data } });
    });

  dispatch({ type: LOADING_UI_DONE });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_LOG });
};

// export const getGuestData = () => (dispatch) => {
//   dispatch({ type: LOADING_UI });

//   axios
//     .get('/guest')
//     .then((res) => {
//       dispatch({ type: SET_USER, payload: res.data });
//       dispatch({
//         type: SET_CART_PAYMENT_INFORMATION,
//         data: {
//           contact: res.data.credentials.contact,
//           paymentMethod: 'inStore-CASH',
//         },
//       });
//       dispatch({ type: LOADING_UI_SUCCESS });
//     })
//     .catch((err) =>
//       dispatch({
//         type: SET_ERRORS,
//         payload: err.response.data,
//       })
//     );
// };

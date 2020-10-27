import { SET_USER, CLEAR_USER } from '../types';

const initialState = {
  authenticated: false,
  username: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true,
        username: action.payload.username,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}

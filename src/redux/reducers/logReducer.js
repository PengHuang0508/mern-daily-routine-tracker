import { SET_LOG, CLEAR_LOG } from '../types';

const initialState = {
  userLog: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOG:
      return {
        userLog: action.payload,
      };
    case CLEAR_LOG:
      return initialState;
    default:
      return state;
  }
}

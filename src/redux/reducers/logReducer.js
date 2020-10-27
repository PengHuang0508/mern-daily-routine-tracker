import { SET_LOG, CLEAR_LOG } from '../types';

const initialState = {
  routineLog: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOG:
      return {
        routineLog: action.payload,
      };
    case CLEAR_LOG:
      return initialState;
    default:
      return state;
  }
}

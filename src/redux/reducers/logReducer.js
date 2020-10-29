import { SET_LOG, SET_CHART_DATA, CLEAR_LOG } from '../types';

const initialState = {
  routineLog: [],
  routineChartData: {
    sleep: 0,
    work: 0,
    miscellaneous: 0,
    exercise: 0,
    relax: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOG:
      return {
        ...state,
        routineLog: action.payload,
      };
    case SET_CHART_DATA:
      const routineData = action.data;
      let routineChartData = {};

      for (const activity in routineData) {
        routineChartData[activity] = (routineData[activity] / 24).toFixed(4);
      }

      return {
        ...state,
        routineChartData,
      };
    case CLEAR_LOG:
      return initialState;
    default:
      return state;
  }
}

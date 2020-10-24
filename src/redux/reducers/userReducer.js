import { SET_USER, CLEAR_USER } from '../types';

// "_id": "5f627b936ccaa94128676cbb",
//         "username": "Kev",
//         "password": "$2a$10$rrfAhtmt4Tr5rfiQOuJDqeQSV95VdtgwtJxqDW/LA8LpAvRNzvb8i",
//         "sex": "M",
//         "age": 25,
//         "createdAt": "2020-09-16T20:54:43.366Z",
//         "updatedAt": "2020-09-16T20:54:43.366Z",
//         "__v": 0

const initialState = {
  authenticated: false,
  username: '',
  userId: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true,
        username: action.payload.username,
        userId: action.payload._id,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}

import { UPDATE_USER, UPDATE_SESSION, LOGOUT } from "../actions/user";

const initialState = {
  user: false,
  session: false,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, user: action.user };
    case UPDATE_SESSION:
      return { ...state, session: action.session };
    case LOGOUT:
      return initialState;
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

import {
  UPDATE_USER,
  UPDATE_SESSION,
  SET_LOADING,
  LOGOUT,
} from "../actions/user";

const initialState = {
  user: false,
  session: false,
  loading: false,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case UPDATE_USER:
      return { ...state, user: action.user, loading: false };
    case UPDATE_SESSION:
      return { ...state, session: action.session, loading: false };
    case LOGOUT:
      return initialState;
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

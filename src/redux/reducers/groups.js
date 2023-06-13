import { ADD_GROUP, REMOVE_GROUP, UPDATE_GROUP } from '../actions/groups';
import { LOAD_PROJECT } from '../actions/settings';

const initialState = [];
export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT:
      return [...action.project.groups];
    case ADD_GROUP:
      return [...state, action.group];
    case UPDATE_GROUP:
      return state.map((group) =>
        group.id === action.group.id ? action.group : group
      );
    case REMOVE_GROUP:
      return state.filter((group) => group.id !== action.group.id);
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

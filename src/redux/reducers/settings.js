import { UPDATE_SETTINGS, LOAD_PROJECT, NEW_KEYPRESS } from '../actions/settings';
import { ADD_PAD, REMOVE_PAD, UPDATE_PAD, REORDER_PADS } from '../actions/pads';
import { ADD_GROUP, REMOVE_GROUP, UPDATE_GROUP } from '../actions/groups';

const initialState = {
  colors: [''],
  name: '',
  volume: 75,
  search: false,
  darkmode: true,
  currentGroup: false,
  lastKeyPress: 1,
  timestamp: 0,
  id: false,
};
export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return { ...state, ...action.settings };
    case LOAD_PROJECT:
      return { ...action.project.settings };
    case NEW_KEYPRESS:
      return { ...state, lastKeyPress: action.lastKeyPress };
    case ADD_PAD:
      return { ...state, timestamp: Date.now() };
    case REMOVE_PAD:
      return { ...state, timestamp: Date.now() };
    case UPDATE_PAD:
      return { ...state, timestamp: Date.now() };
    case REORDER_PADS:
      return { ...state, timestamp: Date.now() };
    case ADD_GROUP:
      return { ...state, timestamp: Date.now() };
    case REMOVE_GROUP:
      return { ...state, timestamp: Date.now() };
    case UPDATE_GROUP:
      return { ...state, timestamp: Date.now() };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

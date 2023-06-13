import {
  ADD_PAD,
  REMOVE_PAD,
  UPDATE_PAD,
  UPDATE_PAD_NO_SYNC,
  REORDER_PADS,
  PRESS_KEY,
  STOP_ALL,
} from "../actions/pads";
import { LOAD_PROJECT } from "../actions/settings";

export const defaultPad = {
  url: "",
  id: false,
  start: 0,
  end: 0,
  duration: 0,
  volume: 75,
  keypad: "",
  fadeIn: 0,
  fadeOut: 0,
  groups: [],
  name: "",
};
const initialState = [];
export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case REORDER_PADS:
      return [...action.pads];
    case LOAD_PROJECT:
      return [...action.project.pads];
    case ADD_PAD:
      if (!action.index) {
        return [...state, action.pad];
      } else {
        state.splice(action.index, 0, action.pad);
        return [...state];
      }
    case UPDATE_PAD:
      return state.map((pad) => (pad.id === action.pad.id ? action.pad : pad));
    case UPDATE_PAD_NO_SYNC:
      return state.map((pad) => (pad.id === action.pad.id ? action.pad : pad));
    case REMOVE_PAD:
      return state.filter((pad) => pad.id !== action.pad.id);
    case PRESS_KEY:
      return state.map((pad) =>
        pad.keypad.toLowerCase() === action.key.toLowerCase()
          ? { ...pad, isPlaying: !pad.isPlaying }
          : pad
      );
    case STOP_ALL:
      return state.map((pad) => {
        return { ...pad, isPlaying: false };
      });

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

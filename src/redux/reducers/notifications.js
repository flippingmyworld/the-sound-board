import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS,
  REMOVE_NOTIFICATION_WITH_INDEX,
} from '../actions/notifications';

const initialState = [];
export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.notification];
    case REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.id !== action.notification.id);
    case REMOVE_NOTIFICATION_WITH_INDEX:
      return state.filter(
        (notification, index) =>
          notification.id + '-' + index !== action.notification.id + '-' + action.index,
      );
    case UPDATE_NOTIFICATION:
      return state.map((notification) =>
        notification.id === action.notification.id ? action.notification : notification,
      );
    case REMOVE_ALL_NOTIFICATIONS:
      return [];
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

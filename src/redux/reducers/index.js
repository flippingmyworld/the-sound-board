import { combineReducers } from 'redux';
import groups from './groups';
import pads from './pads';
import settings from './settings';
import notifications from './notifications';

export default combineReducers({
  groups,
  pads,
  settings,
  notifications,
});

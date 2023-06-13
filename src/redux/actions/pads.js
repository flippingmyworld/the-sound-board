export const ADD_PAD = 'ADD_PAD';
export const UPDATE_PAD = 'UPDATE_PAD';
export const UPDATE_PAD_NO_SYNC = 'UPDATE_PAD_NO_SYNC';
export const REMOVE_PAD = 'REMOVE_PAD';
export const REORDER_PADS = 'REORDER_PADS';
export const STOP_ALL = 'STOP_ALL';
export const PRESS_KEY = 'PRESS_KEY';
export const defaultPad = {
  url: '',
  file: '',
  id: false,
  start: 0,
  end: 0,
  duration: 0,
  volume: 75,
  keypad: '',
  speed: 1,
  fadeIn: 0,
  fadeOut: 0,
  loop: false,
  groups: [],
  name: '',
  isPlaying: false,
};
export const addPad = (pad, index) => {
  pad.id = pad.id || '' + Date.now();
  index = index || false;
  return {
    type: ADD_PAD,
    pad,
    index: index,
  };
};

export const updatePad = (pad) => {
  pad.id = pad.id || '' + Date.now();
  return {
    type: UPDATE_PAD,
    pad,
  };
};

export const updatePadNoSync = (pad) => {
  pad.id = pad.id || '' + Date.now();
  return {
    type: UPDATE_PAD_NO_SYNC,
    pad,
  };
};

export const reorderPads = (pads) => {
  return {
    type: REORDER_PADS,
    pads,
  };
};

export const removePad = (pad) => {
  return {
    type: REMOVE_PAD,
    pad,
  };
};

export const pressKey = (key) => {
  return {
    type: PRESS_KEY,
    key,
  };
};
export const stopAll = () => {
  return {
    type: STOP_ALL,
  };
};

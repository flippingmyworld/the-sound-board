export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const LOAD_PROJECT = 'LOAD_PROJECT';
export const NEW_KEYPRESS = 'NEW_KEYPRESS';
export const PROJECT_SYNC = 'PROJECT_SYNC';

export const updateSettings = (settings) => {
  return {
    type: UPDATE_SETTINGS,
    settings,
  };
};
export const loadProject = (project) => {
  return {
    type: LOAD_PROJECT,
    project,
  };
};
export const setCurrentGroup = (group) => {
  group = group === false ? { id: false } : group;
  return {
    type: UPDATE_SETTINGS,
    settings: { currentGroup: group.id },
  };
};

export const setDarkTheme = (isOn) => {
  isOn = isOn || false;
  return {
    type: UPDATE_SETTINGS,
    settings: { darkmode: isOn, timestamp: Date.now() },
  };
};

export const setProjectName = (name) => {
  name = name || '';
  return {
    type: UPDATE_SETTINGS,
    settings: { name: name, timestamp: Date.now() },
  };
};

export const setVolume = (volume) => {
  volume = volume || 0;
  return {
    type: UPDATE_SETTINGS,
    settings: { volume, timestamp: Date.now() },
  };
};

export const setMuted = (isMuted) => {
  isMuted = isMuted || false;
  return {
    type: UPDATE_SETTINGS,
    settings: isMuted ? { volume: 0 } : {},
  };
};

export const search = (search) => {
  search = search || false;
  return {
    type: UPDATE_SETTINGS,
    settings: { search: search },
  };
};

export const newKeyPress = () => {
  return {
    type: NEW_KEYPRESS,
    lastKeyPress: Date.now(),
  };
};

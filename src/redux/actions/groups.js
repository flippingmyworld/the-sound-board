export const ADD_GROUP = "ADD_GROUP"
export const UPDATE_GROUP = "UPDATE_GROUP"
export const REMOVE_GROUP = "REMOVE_GROUP"
export const addGroup = group => {
  group.id = group.id || "" + Date.now()
  return {
    type: ADD_GROUP,
    group,
  }
}

export const updateGroup = group => {
  group.id = group.id || "" + Date.now()
  return {
    type: UPDATE_GROUP,
    group,
  }
}

export const removeGroup = group => {
  return {
    type: REMOVE_GROUP,
    group,
  }
}

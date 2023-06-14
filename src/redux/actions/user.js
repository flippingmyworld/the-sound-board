export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_SESSION = "UPDATE_SESSION";
export const SET_LOADING = "SET_LOADING";
export const LOGOUT = "LOGOUT";
export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};
export const updateSession = (session) => {
  return {
    type: UPDATE_SESSION,
    session,
  };
};
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

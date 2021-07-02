export const login = (payload) => {
  return {
    type: "LOGIN",
    payload,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const setProfile = (payload) => {
  return {
    type: "SET_PROFILE",
    payload,
  };
};

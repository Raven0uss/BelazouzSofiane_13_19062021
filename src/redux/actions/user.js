export const login = (name) => {
  return {
    type: "LOGIN",
    name,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

const initialState = {
  isAuth: false,
  token: null,
  data: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      const { payload: token } = action;

      return {
        isAuth: true,
        token,
        data: {},
      };
    case "SET_PROFILE":
      const { payload } = action;
      return {
        ...state,
        data: payload,
      };
    case "LOGOUT":
      return {
        isAuth: false,
        token: null,
        data: {},
      };
    default:
      return state;
  }
};

export default user;

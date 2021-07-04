const initialState = {
  isAuth: false,
  token: null,
  data: {},
};

const user = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case "LOGIN":
      const { payload: token } = action;

      return {
        isAuth: true,
        token,
        data: {},
      };
    case "SET_PROFILE":
      return {
        ...state,
        data: payload,
      };
    case "UPDATE_PROFILE":
      console.log(payload);
      return {
        ...state,
        data: {
          ...state.data,
          ...payload,
        },
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

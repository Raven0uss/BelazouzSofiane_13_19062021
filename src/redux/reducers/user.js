const initialState = {
  isAuth: false,
  data: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuth: true,
        data: {
          name: action.name,
        },
      };
    case "LOGOUT":
      return {
        isAuth: false,
        data: {},
      };
    default:
      return state;
  }
};

export default user;

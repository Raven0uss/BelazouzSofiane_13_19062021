const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        name: action.name,
      };

    default:
      return state;
  }
};

export default user;

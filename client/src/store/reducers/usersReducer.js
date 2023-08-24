export const usersInitialState = {
  user: {},
  isUserLoggedIn: false,
  errorMessage: "",
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isUserLoggedIn: true,
      };

    case "LOGIN_FAILED":
      return {
        ...state,
        errorMessage: action.payload,
      };

    case "LOGOUT":
      return usersInitialState;

    default:
      return state;
  }
};

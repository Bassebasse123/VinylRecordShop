import axios from "axios";

export const signup = async (dispatch, data) => {
  const { firstName, lastName, email, password } = data;

  try {
    const response = await axios.post("/users/signup", {
      firstName,
      lastName,
      email,
      password,
    });

    // const csrfToken = response.data.csrfToken;
    // axios.defaults.headers.common["csrfToken"] = csrfToken;

    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message });
  }
};

export const login = async (dispatch, data) => {
  const { email, password } = data;

  try {
    const response = await axios.post("/users/login", {
      email,
      password,
    });

    // const csrfToken = response.data.csrfToken;
    // axios.defaults.headers.common["csrfToken"] = csrfToken;

    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message });
  }
};

export const logout = async (dispatchUsers, dispatchCart) => {
  try {
    await axios.get("/users/logout");
    dispatchUsers({ type: "LOGOUT" });
    dispatchCart({ type: "RESET_CART" });
  } catch (error) {
    dispatchUsers({ type: "LOGOUT" });
  }
};

export const getMyData = async (dispatchUsers) => {
  try {
    const response = await axios.get("/users/me");
    dispatchUsers({
      type: "LOGIN_SUCCESS",
      payload: response.data.data,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

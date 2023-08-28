import jwt from "jsonwebtoken";
import { promisify } from "util";
// import Tokens from "csrf";

import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import {
  authError,
  duplicateFieldsHandler,
} from "../middlewares/errorHandlers.js";

//! CSRF Token
// const tokens = new Tokens();
// const csrfSecret = tokens.secretSync();
// const csrfToken = tokens.create(csrfSecret);

//! Create token
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });

//! Remove Cookies
const removeCookie = (res, ...cookies) =>
  cookies.map((cookie) => res.clearCookie(cookie));

//! CREATE send token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    message: "success",
    success: true,
    status: statusCode,
    token,
    // csrfToken,
    user,
  });
};

const createCart = async (user) => {
  if (user.cartId) return;
  const newCart = await Cart.create({});
  user.cartId = newCart._id;
  await user.save();
};

//! Signup conrtoller
export const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    await createCart(user);
    createSendToken(user, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      return next(duplicateFieldsHandler(error.keyValue));
    }
    next(error);
  }
};

//! login conrtoller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // const { csrftoken } = req.headers;

    if (!email || !password)
      authError(400, "Please provide email and password");

    // if (!tokens.verify(csrfSecret, csrftoken))
    //   authError(403, "Invalid CSRF token.");

    const user = await User.findOne({ email });
    if (!user) authError(401, "Incorrect email or password");

    const correct = await user.correctPassword(password, user.password);
    if (!correct) authError(401, "Incorrect email or password");
    await createCart(user);
    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    removeCookie(res, "jwt", "user");
    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

//! Protect route middleware
export const protect = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;

    //! 1) Get token and check if it's exist
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }

    if (!token) {
      authError(401, "Please login to access this resource.");
    }

    //! 2) Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //! 3) Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      authError(401, "The user belonging to this token is not longer exist");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

//! Restrict some action to specific roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      authError(403, "You do not have permission to perform this action.");
    }
    next();
  };
};

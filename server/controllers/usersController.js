import User from "../models/userModel.js";
import successHandler from "../middlewares/successHandler.js";
import { isValidId } from "../middlewares/errorHandlers.js";
import ApiQueryHandler from "../utilities/apiQueryHandler.js";

export const getAllUsers = async (req, res, next) => {
  try {
    let apiQuery = new ApiQueryHandler(User, req.query)
      .filterDocs()
      .sortDocs()
      .limitFields()
      .paginateDocs();

    const users = await apiQuery.model;

    successHandler(res, 200, users, users.length);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    isValidId(req);
    const user = await User.findById(req.params.id);
    successHandler(res, 200, user);
  } catch (error) {
    next(error);
  }
};

// export const getMe = async (req, res, next) => {
//   try {
//     req.params.id = req.user.id;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteAllUsers = async (req, res, next) => {
  try {
    const deleteConfirm = await User.deleteMany();
    successHandler(res, 200, deleteConfirm);
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    isValidId(req);
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    isValidId(req);
    const user = await User.findByIdAndDelete(req.params.id);
    successHandler(res, 200, user);
  } catch (error) {
    next(error);
  }
};

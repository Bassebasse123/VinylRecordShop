import express from "express";

import {
  getAllUsers,
  deleteAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  // getMe,
} from "../controllers/usersController.js";

import {
  signup,
  login,
  protect,
  restrictTo,
  logout,
} from "../controllers/authController.js";

import validateInput from "../middlewares/validateInput.js";
import sanitizeInput from "../middlewares/sanitizeInput.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

// router.get("/me", getMe, getUserById);

router.use(protect, restrictTo("admin"));

router.route("/").get(getAllUsers).delete(deleteAllUsers);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

export default router;

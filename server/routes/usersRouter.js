import express from "express";

import {
  getAllUsers,
  deleteAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getMe,
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

router.post("/signup", sanitizeInput, validateInput, signup);
router.post("/login", login);
router.get("/logout", logout);

router.use(protect);

router.get("/me", getMe);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).delete(deleteAllUsers);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

export default router;

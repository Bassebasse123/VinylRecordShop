import express from "express";

import {
  getCart,
  addCartItem,
  deleteCarts,
  deleteCartItemById,
  deleteAllCartItems,
  updateItemFieldById,
} from "../controllers/cartController.js";

import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// router.use(protect);

router
  .route("/:id")
  .get(getCart)
  .post(addCartItem)
  .put(deleteCartItemById)
  .delete(deleteAllCartItems)
  .patch(updateItemFieldById);

router.route("/").delete(restrictTo("admin"), deleteCarts);
export default router;

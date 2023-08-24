import express from "express";

import {
  addRecord,
  deleteRecordById,
  getAllRecords,
  getRecordById,
  updateRecordById,
  deleteAllRecords,
} from "../controllers/recordsController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllRecords);
router.route("/:id").get(getRecordById);

router.use(protect, restrictTo("admin"));

router.route("/").post(addRecord).delete(deleteAllRecords);
router.route("/:id").put(updateRecordById).delete(deleteRecordById);

export default router;

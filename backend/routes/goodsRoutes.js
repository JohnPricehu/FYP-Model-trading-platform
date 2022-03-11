import express from "express";
import {
  getGoodsById,
  getGoods,
  createGoods,
//   DeleteNote,
//   UpdateNote,
} from "../controllers/goodsController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getGoods);
router
  .route("/:id")
  .get(getGoodsById)
//   .delete(protect, DeleteNote)
//   .put(protect, UpdateNote);
router.route("/create").post(protect, createGoods);

export default router;
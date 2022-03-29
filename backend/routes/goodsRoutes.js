import express from "express";
import {
  getGoodsById,
  getGoods,
  createGoods,
  getTopGoods,
  deleteGoods,
  updateGoods,
  createdProductReview
} from "../controllers/goodsController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getGoods);
router.get('/top', getTopGoods)
router
  .route("/:id")
  .get(getGoodsById)
  .delete(protect, admin, deleteGoods)
  .put(protect, admin, updateGoods)
router.route("/create").post(protect, createGoods);
router.route('/:id/reviews').post(protect, createdProductReview)

export default router;
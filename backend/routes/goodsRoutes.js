import express from "express";
import {
  getGoodsById,
  getGoods,
  createGoods,
  getTopGoods,
  deleteGoods,
  updateGoods,
  createdProductReview,
  getBestSalesGoods, 
  getSpecialGoods,
  getAllGoods
} from "../controllers/goodsController.js";
const router = express.Router();
import { protect, admin, member } from "../middleware/authMiddleware.js";

router.route("/").get(getGoods);
router.get('/top', getTopGoods);
router.get('/bestsales', getBestSalesGoods);
router.route('/special').get(protect, member, getSpecialGoods);
router.route('/all').get(protect, member, getAllGoods);
router
  .route("/:id")
  .get(getGoodsById)
  .delete(protect, admin, deleteGoods)
  .put(protect, admin, updateGoods)
router.route("/create").post(protect, createGoods);
router.route('/:id/reviews').post(protect, createdProductReview)

export default router;
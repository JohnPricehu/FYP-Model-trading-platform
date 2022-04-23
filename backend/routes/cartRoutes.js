import express from "express";
import {
    addToCart,
    getMyCart,
    deleteCartGoods,
    cleanCart,
} from "../controllers/cartController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/mycart").get(protect,getMyCart);
router
  .route("/goods/:id")
  .post(protect, addToCart);
router
  .route("/:id")
  .delete(protect, deleteCartGoods)
router.route("/clean").delete(protect, cleanCart);

export default router;
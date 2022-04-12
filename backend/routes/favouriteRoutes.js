import express from "express";
import {
    addToFavourite,
    getMyFavourite,
    deleteFavouriteGoods,
    cleanFavourite,
} from "../controllers/favouriteController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/myfavourite").get(protect,getMyFavourite);
router
  .route("/goods/:id")
  .post(protect, addToFavourite)
  .delete(protect, deleteFavouriteGoods)
router.route("/clean").delete(protect, cleanFavourite);

export default router;
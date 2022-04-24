import express from "express";
import {
    addToWanted, 
    getMyWanted,
    deleteWanted
} from "../controllers/wantedController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/mywanted").get(protect,getMyWanted);
router
  .route("/goods/:id")
  .post(protect, addToWanted)
  .delete(protect, deleteWanted)

export default router;
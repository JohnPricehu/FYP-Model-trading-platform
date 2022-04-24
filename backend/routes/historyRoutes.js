import express from "express";
import {
    addToHistory,
    getMyHistory
} from "../controllers/historyController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/myhistory").get(protect,getMyHistory);
router
  .route("/goods/:id")
  .post(protect, addToHistory)


export default router;
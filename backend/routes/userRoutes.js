import express from "express";
import {
  authUser,
  deleteUser,
  registerUser,
  updateUserProfile,
  getUserById,
  viewUsers,
  updateUser,
  payMembership
} from "../controllers/userController.js";
import { protect,admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, viewUsers);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/paymember").put(protect, payMembership);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)

export default router;
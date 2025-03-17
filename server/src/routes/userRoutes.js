import { Router } from "express";
import {
  addToWatchlist,
  createUser,
  currentUser,
  login,
  logout,
  removeFromWatchlist,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/jwt.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/me", authenticate, currentUser);
router.post("/logout", logout);
router.post("/watchlist", authenticate, addToWatchlist);
router.delete("/watchlist", authenticate, removeFromWatchlist);

export default router;

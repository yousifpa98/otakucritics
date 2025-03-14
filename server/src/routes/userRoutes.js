import { Router } from "express";
import {
  createUser,
  currentUser,
  login,
  logout,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/jwt.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/me", authenticate, currentUser);
router.post("/logout", logout);

export default router;

import express from "express";
import authController from "../controllers/auth-controller.js";
import activateController from "../controllers/activate-controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/activate", authMiddleware, activateController.activate);
router.get("/refresh", authController.refresh);
router.post("/logout", authMiddleware, authController.logout);

export default router;

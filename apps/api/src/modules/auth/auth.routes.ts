import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { registerSchema } from "./auth.schema";

const router = Router();
const controller = new AuthController();

router.post(
  "/register",
  validateRequest(registerSchema),
  controller.register.bind(controller)
);

export default router;
import { Router } from "express";
import {
  register,
  login,
  me,
} from "./auth.controller";
import { authenticate } from "../../middleware/authenticate";
import { validate } from "../../middleware/validate";
import {
  registerSchema,
  loginSchema,
} from "./auth.validation";

const router = Router();

console.log("✅ auth.routes.ts loaded");

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  authenticate,
  me
);

export default router;
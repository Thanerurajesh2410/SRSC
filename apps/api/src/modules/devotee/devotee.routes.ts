import { Router } from "express";
import { DevoteeController } from "./devotee.controller";

const router = Router();
const controller = new DevoteeController();

router.post("/login-or-register", controller.loginOrRegister.bind(controller));
router.get("/portal-data", controller.getPortalData.bind(controller));

export default router;

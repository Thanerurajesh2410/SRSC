import { Router } from "express";
import festivalController from "./festival.controller";

const router = Router();

router.get("/", festivalController.getAllFestivals);
router.get("/:id", festivalController.getFestivalById);
router.post("/", festivalController.createFestival);
router.put("/:id", festivalController.updateFestival);
router.delete("/:id", festivalController.deleteFestival);

export default router;

import { Router } from "express";
import slidesController from "./slides.controller";

const router = Router();

router.get("/", slidesController.getAllSlides);
router.get("/:id", slidesController.getSlideById);
router.post("/", slidesController.createSlide);
router.put("/:id", slidesController.updateSlide);
router.delete("/:id", slidesController.deleteSlide);

export default router;

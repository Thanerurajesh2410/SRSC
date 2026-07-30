import { Router } from "express";
import constructionController from "./construction.controller";

const router = Router();

router.get("/", constructionController.getAllProjects);
router.get("/:id", constructionController.getProjectById);
router.post("/", constructionController.createProject);
router.put("/:id", constructionController.updateProject);
router.delete("/:id", constructionController.deleteProject);
router.post("/:id/progress", constructionController.addProgressLog);

export default router;

import { Router } from "express";
import volunteerController from "./volunteer.controller";

const router = Router();

router.get("/", volunteerController.getAllVolunteers);
router.get("/:id", volunteerController.getVolunteerById);
router.post("/", volunteerController.createVolunteer);
router.put("/:id", volunteerController.updateVolunteer);
router.delete("/:id", volunteerController.deleteVolunteer);

export default router;

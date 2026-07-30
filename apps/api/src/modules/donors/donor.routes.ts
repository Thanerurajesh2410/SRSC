import { Router } from "express";
import donorController from "./donor.controller";

const router = Router();

router.get("/", donorController.getAllDonors);
router.get("/:id", donorController.getDonorById);
router.post("/", donorController.createDonor);
router.put("/:id", donorController.updateDonor);
router.delete("/:id", donorController.deleteDonor);

router.post("/:id/family", donorController.addFamilyMember);
router.delete("/family/:memberId", donorController.deleteFamilyMember);

export default router;

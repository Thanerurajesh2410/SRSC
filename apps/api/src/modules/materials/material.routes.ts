import { Router } from "express";
import materialController from "./material.controller";

const router = Router();

router.get("/", materialController.getAllMaterialDonations);
router.get("/summary", materialController.getMaterialSummary);
router.get("/:id", materialController.getMaterialDonationById);
router.post("/", materialController.createMaterialDonation);
router.put("/:id", materialController.updateMaterialDonation);
router.delete("/:id", materialController.deleteMaterialDonation);

export default router;

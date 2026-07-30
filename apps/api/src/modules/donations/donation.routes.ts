import { Router } from "express";

import {
  createDonation,
  deleteDonation,
  getDonation,
  getDonations,
  getDonationStats,
  updateDonation,
} from "./donation.controller";

const router = Router();

router.get("/", getDonations);

router.get("/stats", getDonationStats);

router.get("/:id", getDonation);

router.post("/", createDonation);

router.put("/:id", updateDonation);

router.delete("/:id", deleteDonation);

export default router;
import { Router } from "express";

import {
  createDonation,
  createBulkDonations,
  deleteDonation,
  getDonation,
  getDonations,
  getDonationStats,
  updateDonation,
} from "./donation.controller";

const router = Router();

router.get("/", getDonations);

router.get("/stats", getDonationStats);

router.post("/bulk", createBulkDonations);

router.get("/:id", getDonation);

router.post("/", createDonation);

router.put("/:id", updateDonation);

router.delete("/:id", deleteDonation);

export default router;
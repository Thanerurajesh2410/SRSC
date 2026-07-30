import { Router } from "express";
import sevaController from "./seva.controller";

const router = Router();

router.get("/", sevaController.getAllBookings);
router.get("/:id", sevaController.getBookingById);
router.post("/", sevaController.createBooking);
router.put("/:id", sevaController.updateBooking);
router.delete("/:id", sevaController.deleteBooking);

export default router;

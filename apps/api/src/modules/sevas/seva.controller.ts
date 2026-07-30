import { Request, Response } from "express";
import sevaService from "./seva.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class SevaController {
  getAllBookings = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const type = req.query.type as string | undefined;
    const bookings = await sevaService.getAllBookings(search, type);
    sendResponse(res, 200, "Seva bookings fetched", bookings);
  });

  getBookingById = asyncHandler(async (req: Request, res: Response) => {
    const booking = await sevaService.getBookingById(req.params.id);
    sendResponse(res, 200, "Seva booking details fetched", booking);
  });

  createBooking = asyncHandler(async (req: Request, res: Response) => {
    const booking = await sevaService.createBooking(req.body);
    sendResponse(res, 201, "Seva booked successfully", booking);
  });

  updateBooking = asyncHandler(async (req: Request, res: Response) => {
    const booking = await sevaService.updateBooking(req.params.id, req.body);
    sendResponse(res, 200, "Seva booking updated", booking);
  });

  deleteBooking = asyncHandler(async (req: Request, res: Response) => {
    await sevaService.deleteBooking(req.params.id);
    sendResponse(res, 200, "Seva booking deleted");
  });
}

export default new SevaController();

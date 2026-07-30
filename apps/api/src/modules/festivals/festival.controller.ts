import { Request, Response } from "express";
import festivalService from "./festival.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class FestivalController {
  getAllFestivals = asyncHandler(async (_req: Request, res: Response) => {
    const festivals = await festivalService.getAllFestivals();
    sendResponse(res, 200, "Festivals fetched successfully", festivals);
  });

  getFestivalById = asyncHandler(async (req: Request, res: Response) => {
    const festival = await festivalService.getFestivalById(req.params.id);
    sendResponse(res, 200, "Festival details fetched", festival);
  });

  createFestival = asyncHandler(async (req: Request, res: Response) => {
    const festival = await festivalService.createFestival(req.body);
    sendResponse(res, 201, "Festival event created", festival);
  });

  updateFestival = asyncHandler(async (req: Request, res: Response) => {
    const festival = await festivalService.updateFestival(req.params.id, req.body);
    sendResponse(res, 200, "Festival event updated", festival);
  });

  deleteFestival = asyncHandler(async (req: Request, res: Response) => {
    await festivalService.deleteFestival(req.params.id);
    sendResponse(res, 200, "Festival event deleted");
  });
}

export default new FestivalController();

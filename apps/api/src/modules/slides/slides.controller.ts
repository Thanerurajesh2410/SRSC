import { Request, Response } from "express";
import slidesService from "./slides.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class SlidesController {
  getAllSlides = asyncHandler(async (_req: Request, res: Response) => {
    const slides = await slidesService.getAllSlides();
    sendResponse(res, 200, "Home slides fetched", slides);
  });

  getSlideById = asyncHandler(async (req: Request, res: Response) => {
    const slide = await slidesService.getSlideById(req.params.id);
    sendResponse(res, 200, "Home slide details fetched", slide);
  });

  createSlide = asyncHandler(async (req: Request, res: Response) => {
    const slide = await slidesService.createSlide(req.body);
    sendResponse(res, 201, "Home slide added", slide);
  });

  updateSlide = asyncHandler(async (req: Request, res: Response) => {
    const slide = await slidesService.updateSlide(req.params.id, req.body);
    sendResponse(res, 200, "Home slide updated", slide);
  });

  deleteSlide = asyncHandler(async (req: Request, res: Response) => {
    await slidesService.deleteSlide(req.params.id);
    sendResponse(res, 200, "Home slide deleted");
  });
}

export default new SlidesController();

import { Request, Response } from "express";
import materialService from "./material.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class MaterialController {
  getAllMaterialDonations = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const type = req.query.type as string | undefined;
    const items = await materialService.getAllMaterialDonations(search, type);
    sendResponse(res, 200, "Material donations fetched successfully", items);
  });

  getMaterialDonationById = asyncHandler(async (req: Request, res: Response) => {
    const item = await materialService.getMaterialDonationById(req.params.id);
    sendResponse(res, 200, "Material donation details fetched", item);
  });

  createMaterialDonation = asyncHandler(async (req: Request, res: Response) => {
    const item = await materialService.createMaterialDonation(req.body);
    sendResponse(res, 201, "Material donation recorded successfully", item);
  });

  updateMaterialDonation = asyncHandler(async (req: Request, res: Response) => {
    const item = await materialService.updateMaterialDonation(req.params.id, req.body);
    sendResponse(res, 200, "Material donation updated successfully", item);
  });

  deleteMaterialDonation = asyncHandler(async (req: Request, res: Response) => {
    await materialService.deleteMaterialDonation(req.params.id);
    sendResponse(res, 200, "Material donation deleted successfully");
  });

  getMaterialSummary = asyncHandler(async (_req: Request, res: Response) => {
    const summary = await materialService.getMaterialSummary();
    sendResponse(res, 200, "Material summary fetched successfully", summary);
  });
}

export default new MaterialController();

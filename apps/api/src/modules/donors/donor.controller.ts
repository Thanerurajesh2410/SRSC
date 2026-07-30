import { Request, Response } from "express";
import donorService from "./donor.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class DonorController {
  getAllDonors = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const donors = await donorService.getAllDonors(search);
    sendResponse(res, 200, "Donors fetched successfully", donors);
  });

  getDonorById = asyncHandler(async (req: Request, res: Response) => {
    const donor = await donorService.getDonorById(req.params.id);
    sendResponse(res, 200, "Donor details fetched successfully", donor);
  });

  createDonor = asyncHandler(async (req: Request, res: Response) => {
    const donor = await donorService.createDonor(req.body);
    sendResponse(res, 201, "Donor registered successfully", donor);
  });

  updateDonor = asyncHandler(async (req: Request, res: Response) => {
    const donor = await donorService.updateDonor(req.params.id, req.body);
    sendResponse(res, 200, "Donor updated successfully", donor);
  });

  deleteDonor = asyncHandler(async (req: Request, res: Response) => {
    await donorService.deleteDonor(req.params.id);
    sendResponse(res, 200, "Donor deleted successfully");
  });

  addFamilyMember = asyncHandler(async (req: Request, res: Response) => {
    const member = await donorService.addFamilyMember(req.params.id, req.body);
    sendResponse(res, 201, "Family member added successfully", member);
  });

  deleteFamilyMember = asyncHandler(async (req: Request, res: Response) => {
    await donorService.deleteFamilyMember(req.params.memberId);
    sendResponse(res, 200, "Family member deleted successfully");
  });
}

export default new DonorController();

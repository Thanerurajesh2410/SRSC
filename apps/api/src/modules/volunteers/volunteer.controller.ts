import { Request, Response } from "express";
import volunteerService from "./volunteer.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class VolunteerController {
  getAllVolunteers = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const volunteers = await volunteerService.getAllVolunteers(search);
    sendResponse(res, 200, "Volunteers fetched successfully", volunteers);
  });

  getVolunteerById = asyncHandler(async (req: Request, res: Response) => {
    const volunteer = await volunteerService.getVolunteerById(req.params.id);
    sendResponse(res, 200, "Volunteer details fetched", volunteer);
  });

  createVolunteer = asyncHandler(async (req: Request, res: Response) => {
    const volunteer = await volunteerService.createVolunteer(req.body);
    sendResponse(res, 201, "Volunteer registered successfully", volunteer);
  });

  updateVolunteer = asyncHandler(async (req: Request, res: Response) => {
    const volunteer = await volunteerService.updateVolunteer(req.params.id, req.body);
    sendResponse(res, 200, "Volunteer updated successfully", volunteer);
  });

  deleteVolunteer = asyncHandler(async (req: Request, res: Response) => {
    await volunteerService.deleteVolunteer(req.params.id);
    sendResponse(res, 200, "Volunteer deleted successfully");
  });
}

export default new VolunteerController();

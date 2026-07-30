import { Request, Response } from "express";
import settingsService from "./settings.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class SettingsController {
  getSettings = asyncHandler(async (_req: Request, res: Response) => {
    const settings = await settingsService.getSettings();
    sendResponse(res, 200, "Site settings fetched", settings);
  });

  updateSettings = asyncHandler(async (req: Request, res: Response) => {
    const settings = await settingsService.updateSettings(req.body);
    sendResponse(res, 200, "Site settings updated", settings);
  });
}

export default new SettingsController();

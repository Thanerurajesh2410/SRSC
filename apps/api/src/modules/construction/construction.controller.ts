import { Request, Response } from "express";
import constructionService from "./construction.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class ConstructionController {
  getAllProjects = asyncHandler(async (_req: Request, res: Response) => {
    const projects = await constructionService.getAllProjects();
    sendResponse(res, 200, "Construction projects fetched", projects);
  });

  getProjectById = asyncHandler(async (req: Request, res: Response) => {
    const project = await constructionService.getProjectById(req.params.id);
    sendResponse(res, 200, "Construction project details fetched", project);
  });

  createProject = asyncHandler(async (req: Request, res: Response) => {
    const project = await constructionService.createProject(req.body);
    sendResponse(res, 201, "Construction project created", project);
  });

  updateProject = asyncHandler(async (req: Request, res: Response) => {
    const project = await constructionService.updateProject(req.params.id, req.body);
    sendResponse(res, 200, "Construction project updated", project);
  });

  deleteProject = asyncHandler(async (req: Request, res: Response) => {
    await constructionService.deleteProject(req.params.id);
    sendResponse(res, 200, "Construction project deleted");
  });

  addProgressLog = asyncHandler(async (req: Request, res: Response) => {
    const log = await constructionService.addProgressLog(req.params.id, req.body);
    sendResponse(res, 201, "Progress update logged", log);
  });
}

export default new ConstructionController();

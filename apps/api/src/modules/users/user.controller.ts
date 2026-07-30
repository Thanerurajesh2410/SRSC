import { Request, Response } from "express";
import userService from "./user.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

class UserController {
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const users = await userService.getAllUsers(search);
    sendResponse(res, 200, "User accounts fetched successfully", users);
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    sendResponse(res, 200, "User profile fetched successfully", user);
  });

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    sendResponse(res, 201, "User account created successfully", user);
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.updateUser(req.params.id, req.body);
    sendResponse(res, 200, "User account updated successfully", user);
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await userService.deleteUser(req.params.id);
    sendResponse(res, 200, "User account deleted successfully");
  });

  getAllRoles = asyncHandler(async (_req: Request, res: Response) => {
    const roles = await userService.getAllRoles();
    sendResponse(res, 200, "System roles fetched successfully", roles);
  });
}

export default new UserController();

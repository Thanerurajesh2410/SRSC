import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/apiResponse";

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);

  sendResponse(
    res,
    201,
    "User registered successfully",
    {
      id: user.id,
      email: user.email,
    }
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  sendResponse(
    res,
    200,
    "Login successful",
    result
  );
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getProfile(req.user!.userId);

  sendResponse(
    res,
    200,
    "Profile fetched successfully",
    user
  );
});
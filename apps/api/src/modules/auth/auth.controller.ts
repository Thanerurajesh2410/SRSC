import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();



export class AuthController {
  async register(req: Request, res: Response) {
    console.log(req.body);
    try {
      const user = await service.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Registration failed",
      });
    }
  }
}
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private service = new AuthService();

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.service.register(req.body);

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

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.service.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          accessToken: result.accessToken,
          user: {
            id: result.user.id,
            firstName: result.user.firstName,
            email: result.user.email,
            roleId: result.user.roleId,
          },
        },
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Invalid email or password",
      });
    }
  }
};
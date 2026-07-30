import { Request, Response, NextFunction } from "express";

import DashboardService from "./dashboard.service";

class DashboardController {
    async getDashboard(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const dashboard = await DashboardService.getDashboard();

            res.status(200).json({
                success: true,
                message: "Dashboard data fetched successfully.",
                data: dashboard,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new DashboardController();
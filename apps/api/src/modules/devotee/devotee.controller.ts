import { Request, Response, NextFunction } from "express";
import { DevoteeRepository } from "./devotee.repository";

const repo = new DevoteeRepository();

export class DevoteeController {
  async loginOrRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, name, email, address, gotram, star } = req.body;
      if (!phone) {
        return res.status(400).json({ success: false, message: "Mobile phone number is required" });
      }

      const devoteeName = name || "Devotee";
      const devotee = await repo.upsertDevotee({
        phone: phone.trim(),
        name: devoteeName,
        email,
        address,
        gotram,
        star,
      });

      return res.status(200).json({
        success: true,
        message: "Devotee authenticated successfully",
        data: devotee,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPortalData(req: Request, res: Response, next: NextFunction) {
    try {
      const phone = req.query.phone as string;
      if (!phone) {
        return res.status(400).json({ success: false, message: "Phone query parameter is required" });
      }

      const devotee = await repo.findByPhone(phone.trim());
      const donations = await repo.getDonationsByPhone(phone.trim());
      const sevas = await repo.getSevasByPhone(phone.trim());

      const totalDonated = donations.reduce((sum, d) => sum + Number(d.amount), 0);

      return res.status(200).json({
        success: true,
        data: {
          devotee,
          donations,
          sevas,
          totalDonated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { DonationService } from "./donation.service";

const service = new DonationService();

export const createDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const donation =
      await service.create(req.body);

    return res.status(201).json({
      success: true,
      data: donation,
    });

  } catch (error) {
    next(error);
  }
};

export const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const donations =
      await service.getAll();

    return res.json({
      success: true,
      data: donations,
    });

  } catch (error) {
    next(error);
  }
};

export const getDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const donation =
      await service.getById(req.params.id);

    return res.json({
      success: true,
      data: donation,
    });

  } catch (error) {
    next(error);
  }
};

export const updateDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const donation =
      await service.update(req.params.id, req.body);

    return res.json({
      success: true,
      data: donation,
    });

  } catch (error) {
    next(error);
  }
};

export const deleteDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    await service.delete(req.params.id);

    return res.status(204).send();

  } catch (error) {
    next(error);
  }
};

export const getDonationStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const stats =
      await service.getStats();

    return res.json({
      success: true,
      data: stats,
    });

  } catch (error) {
    next(error);
  }
};
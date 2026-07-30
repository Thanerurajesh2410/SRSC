import festivalRepository from "./festival.repository";
import { AppError } from "../../errors/AppError";

class FestivalService {
  async getAllFestivals() {
    return festivalRepository.findAll();
  }

  async getFestivalById(id: string) {
    const festival = await festivalRepository.findById(id);
    if (!festival) {
      throw new AppError("Festival event not found", 404);
    }
    return festival;
  }

  async createFestival(data: {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    totalExpenses?: number;
    sponsorsCount?: number;
    status?: any;
  }) {
    return festivalRepository.create({
      title: data.title,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      budget: data.budget,
      totalExpenses: data.totalExpenses || 0,
      sponsorsCount: data.sponsorsCount || 0,
      status: data.status || "UPCOMING",
    });
  }

  async updateFestival(id: string, data: Partial<{ title: string; description?: string; startDate: Date; endDate: Date; budget: number; totalExpenses?: number; sponsorsCount?: number; status?: any }>) {
    await this.getFestivalById(id);
    return festivalRepository.update(id, {
      ...data,
      ...(data.startDate && { startDate: new Date(data.startDate) }),
      ...(data.endDate && { endDate: new Date(data.endDate) }),
    });
  }

  async deleteFestival(id: string) {
    await this.getFestivalById(id);
    return festivalRepository.delete(id);
  }
}

export default new FestivalService();

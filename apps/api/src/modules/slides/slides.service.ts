import slidesRepository from "./slides.repository";
import { AppError } from "../../errors/AppError";

class SlidesService {
  async getAllSlides() {
    return slidesRepository.findAll();
  }

  async getSlideById(id: string) {
    const slide = await slidesRepository.findById(id);
    if (!slide) {
      throw new AppError("Home slide image not found", 404);
    }
    return slide;
  }

  async createSlide(data: {
    title: string;
    caption?: string;
    imageUrl: string;
    displayOrder?: number;
    isActive?: boolean;
  }) {
    return slidesRepository.create({
      title: data.title,
      caption: data.caption,
      imageUrl: data.imageUrl,
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true,
    });
  }

  async updateSlide(id: string, data: Partial<{ title: string; caption?: string; imageUrl: string; displayOrder?: number; isActive?: boolean }>) {
    await this.getSlideById(id);
    return slidesRepository.update(id, data);
  }

  async deleteSlide(id: string) {
    await this.getSlideById(id);
    return slidesRepository.delete(id);
  }
}

export default new SlidesService();

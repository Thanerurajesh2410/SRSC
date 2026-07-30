import constructionRepository from "./construction.repository";
import { AppError } from "../../errors/AppError";

class ConstructionService {
  async getAllProjects() {
    return constructionRepository.findAll();
  }

  async getProjectById(id: string) {
    const project = await constructionRepository.findById(id);
    if (!project) {
      throw new AppError("Construction project not found", 404);
    }
    return project;
  }

  async createProject(data: {
    name: string;
    description?: string;
    estimatedCost: number;
    actualCost?: number;
    overallProgress?: number;
    status?: any;
    targetCompletionDate?: Date;
  }) {
    return constructionRepository.create({
      name: data.name,
      description: data.description,
      estimatedCost: data.estimatedCost,
      actualCost: data.actualCost || 0,
      overallProgress: data.overallProgress || 0,
      status: data.status || "IN_PROGRESS",
      targetCompletionDate: data.targetCompletionDate ? new Date(data.targetCompletionDate) : undefined,
    });
  }

  async updateProject(
    id: string,
    data: Partial<{
      name: string;
      description?: string;
      estimatedCost: number;
      actualCost?: number;
      overallProgress?: number;
      status?: any;
      targetCompletionDate?: Date;
    }>
  ) {
    await this.getProjectById(id);
    return constructionRepository.update(id, {
      ...data,
      ...(data.targetCompletionDate && { targetCompletionDate: new Date(data.targetCompletionDate) }),
    });
  }

  async deleteProject(id: string) {
    await this.getProjectById(id);
    return constructionRepository.delete(id);
  }

  async addProgressLog(projectId: string, data: { title: string; completedWork?: string; upcomingWork?: string; progressPercent: number; imageUrl?: string }) {
    await this.getProjectById(projectId);
    return constructionRepository.addProgressLog(projectId, data);
  }
}

export default new ConstructionService();

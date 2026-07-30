import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

class ConstructionRepository {
  async findAll() {
    return prisma.constructionProject.findMany({
      include: {
        progressLogs: {
          orderBy: { updateDate: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.constructionProject.findUnique({
      where: { id },
      include: {
        progressLogs: {
          orderBy: { updateDate: "desc" },
        },
      },
    });
  }

  async create(data: Prisma.ConstructionProjectCreateInput) {
    return prisma.constructionProject.create({
      data,
      include: { progressLogs: true },
    });
  }

  async update(id: string, data: Prisma.ConstructionProjectUpdateInput) {
    return prisma.constructionProject.update({
      where: { id },
      data,
      include: { progressLogs: true },
    });
  }

  async delete(id: string) {
    return prisma.constructionProject.delete({
      where: { id },
    });
  }

  async addProgressLog(projectId: string, data: { title: string; completedWork?: string; upcomingWork?: string; progressPercent: number; imageUrl?: string }) {
    const log = await prisma.constructionProgressLog.create({
      data: {
        projectId,
        ...data,
      },
    });

    // Also update project overallProgress
    await prisma.constructionProject.update({
      where: { id: projectId },
      data: { overallProgress: data.progressPercent },
    });

    return log;
  }
}

export default new ConstructionRepository();

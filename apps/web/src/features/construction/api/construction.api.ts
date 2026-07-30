import api from "../../../services/api";

export type ConstructionStatus = "PLANNING" | "IN_PROGRESS" | "ON_HOLD" | "COMPLETED";

export interface ProgressLog {
  id?: string;
  projectId?: string;
  title: string;
  updateDate?: string;
  completedWork?: string;
  upcomingWork?: string;
  progressPercent: number;
  imageUrl?: string;
}

export interface ConstructionProject {
  id: string;
  name: string;
  description?: string;
  estimatedCost: number;
  actualCost: number;
  overallProgress: number;
  status: ConstructionStatus;
  targetCompletionDate?: string;
  progressLogs?: ProgressLog[];
  createdAt: string;
  updatedAt: string;
}

export async function getProjects(): Promise<ConstructionProject[]> {
  const response = await api.get("/construction");
  return response.data.data;
}

export async function getProjectById(id: string): Promise<ConstructionProject> {
  const response = await api.get(`/construction/${id}`);
  return response.data.data;
}

export async function createProject(data: Partial<ConstructionProject>): Promise<ConstructionProject> {
  const response = await api.post("/construction", data);
  return response.data.data;
}

export async function updateProject(id: string, data: Partial<ConstructionProject>): Promise<ConstructionProject> {
  const response = await api.put(`/construction/${id}`, data);
  return response.data.data;
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/construction/${id}`);
}

export async function addProgressLog(projectId: string, log: ProgressLog): Promise<ProgressLog> {
  const response = await api.post(`/construction/${projectId}/progress`, log);
  return response.data.data;
}

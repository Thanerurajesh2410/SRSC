import volunteerRepository from "./volunteer.repository";
import { AppError } from "../../errors/AppError";

class VolunteerService {
  async getAllVolunteers(search?: string) {
    return volunteerRepository.findAll(search);
  }

  async getVolunteerById(id: string) {
    const volunteer = await volunteerRepository.findById(id);
    if (!volunteer) {
      throw new AppError("Volunteer not found", 404);
    }
    return volunteer;
  }

  async createVolunteer(data: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    skills?: string;
    dutyStatus?: any;
    assignedDuty?: string;
  }) {
    const count = await volunteerRepository.getCount();
    const volunteerCode = `VOL-${String(count + 1).padStart(6, "0")}`;

    return volunteerRepository.create({
      volunteerCode,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      skills: data.skills,
      dutyStatus: data.dutyStatus || "AVAILABLE",
      assignedDuty: data.assignedDuty,
    });
  }

  async updateVolunteer(id: string, data: Partial<{ name: string; phone: string; email?: string; address?: string; skills?: string; dutyStatus?: any; assignedDuty?: string }>) {
    await this.getVolunteerById(id);
    return volunteerRepository.update(id, data);
  }

  async deleteVolunteer(id: string) {
    await this.getVolunteerById(id);
    return volunteerRepository.delete(id);
  }
}

export default new VolunteerService();

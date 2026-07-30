import userRepository from "./user.repository";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/AppError";

class UserService {
  async getAllUsers(search?: string) {
    const users = await userRepository.findAll(search);
    return users.map(({ password, ...user }) => user);
  }

  async getUserById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError("User account not found", 404);
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createUser(data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    roleId: string;
  }) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError("User account with this email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: { connect: { id: data.roleId } },
    });

    const { password, ...result } = user;
    return result;
  }

  async updateUser(
    id: string,
    data: Partial<{
      firstName: string;
      lastName?: string;
      email: string;
      phone?: string;
      roleId: string;
      isActive: boolean;
      password?: string;
    }>
  ) {
    await this.getUserById(id);

    const updateData: any = {
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.email && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.roleId && { role: { connect: { id: data.roleId } } }),
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await userRepository.update(id, updateData);
    const { password, ...result } = updated;
    return result;
  }

  async deleteUser(id: string) {
    await this.getUserById(id);
    return userRepository.delete(id);
  }

  async getAllRoles() {
    return userRepository.findAllRoles();
  }
}

export default new UserService();

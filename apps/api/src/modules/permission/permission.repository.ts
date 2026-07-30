import { prisma } from "../../config/prisma";

export class PermissionRepository {
  async getPermissionsByRole(roleId: string) {
    return prisma.rolePermission.findMany({
      where: {
        roleId,
      },
      include: {
        permission: true,
      },
    });
  }
}
import { Request, Response, NextFunction } from "express";
import { PermissionRepository } from "../modules/permission/permission.repository";
import { AppError } from "../errors/AppError";

const permissionRepository = new PermissionRepository();

/**
 * Usage:
 * authorize("committee.view")
 *
 * OR
 *
 * authorize("committee.create", "committee.update")
 */
export const authorize =
  (...requiredPermissions: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError("Unauthorized", 401);
      }

      const rolePermissions =
        await permissionRepository.getPermissionsByRole(req.user.roleId);

      const permissions = rolePermissions.map(
        (permission) => permission.permission.name
      );

      const hasPermission = requiredPermissions.some((permission) =>
        permissions.includes(permission)
      );

      if (!hasPermission) {
        throw new AppError(
          "You do not have permission to perform this action.",
          403
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
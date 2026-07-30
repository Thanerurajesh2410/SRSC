import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // ======================================================
  // PERMISSIONS
  // ======================================================

  const permissions = [
    // Committee
    "committee.create",
    "committee.update",
    "committee.delete",
    "committee.view",

    // Donation
    "donation.create",
    "donation.update",
    "donation.delete",
    "donation.view",

    // Expense
    "expense.create",
    "expense.update",
    "expense.delete",
    "expense.approve",
    "expense.view",

    // Receipt
    "receipt.create",
    "receipt.view",
    "receipt.download",

    // Festival
    "festival.create",
    "festival.update",
    "festival.delete",
    "festival.view",

    // Inventory
    "inventory.create",
    "inventory.update",
    "inventory.delete",
    "inventory.view",

    // Volunteer
    "volunteer.create",
    "volunteer.update",
    "volunteer.delete",
    "volunteer.view",

    // Dashboard
    "dashboard.view",

    // Reports
    "reports.view",

    // Settings
    "settings.update",

    // Users
    "user.create",
    "user.update",
    "user.delete",
    "user.view",
  ];

  console.log("📌 Seeding permissions...");

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        name: permission,
      },
      update: {
        description: `${permission} permission`,
      },
      create: {
        name: permission,
        description: `${permission} permission`,
      },
    });
  }

  console.log(`✅ ${permissions.length} permissions seeded.`);

  // ======================================================
  // ROLES
  // ======================================================

  const roles = [
    {
      name: "ADMIN",
      description: "System Administrator",
    },
    {
      name: "ACCOUNTANT",
      description: "Temple Accountant",
    },
    {
      name: "COMMITTEE_MEMBER",
      description: "Committee Member",
    },
    {
      name: "VOLUNTEER",
      description: "Temple Volunteer",
    },
    {
      name: "DONOR",
      description: "Temple Donor",
    },
  ];

  console.log("👥 Seeding roles...");

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {
        description: role.description,
      },
      create: {
        name: role.name,
        description: role.description,
      },
    });
  }

  console.log(`✅ ${roles.length} roles seeded.`);

  // ======================================================
  // FETCH DATA
  // ======================================================

  const dbRoles = await prisma.role.findMany();
  const dbPermissions = await prisma.permission.findMany();

  const roleMap = new Map(dbRoles.map((role) => [role.name, role]));

  const permissionMap = new Map(
    dbPermissions.map((permission) => [permission.name, permission])
  );

  // ======================================================
  // ROLE PERMISSION MATRIX
  // ======================================================

  const rolePermissions: Record<string, string[]> = {
    ADMIN: permissions,

    ACCOUNTANT: [
      // Donations
      "donation.create",
      "donation.update",
      "donation.delete",
      "donation.view",

      // Expenses
      "expense.create",
      "expense.update",
      "expense.delete",
      "expense.approve",
      "expense.view",

      // Receipts
      "receipt.create",
      "receipt.view",
      "receipt.download",

      // Dashboard & Reports
      "dashboard.view",
      "reports.view",
    ],

    COMMITTEE_MEMBER: [
      // Committee
      "committee.create",
      "committee.update",
      "committee.view",

      // Festival
      "festival.create",
      "festival.update",
      "festival.view",

      // Donation
      "donation.view",

      // Receipt
      "receipt.view",
      "receipt.download",

      // Dashboard
      "dashboard.view",
    ],

    VOLUNTEER: [
      "festival.view",
      "volunteer.view",
      "dashboard.view",
    ],

    DONOR: [
      "donation.create",
      "donation.view",
      "receipt.view",
      "receipt.download",
    ],
  };

  console.log("🔐 Assigning permissions to roles...");

  for (const [roleName, permissionNames] of Object.entries(rolePermissions)) {
    const role = roleMap.get(roleName);

    if (!role) continue;

    for (const permissionName of permissionNames) {
      const permission = permissionMap.get(permissionName);

      if (!permission) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }
  }

  console.log("✅ Role permissions seeded.");

  // ======================================================
  // DEFAULT ADMIN USER
  // ======================================================

  console.log("👤 Creating default admin user...");

  const adminRole = roleMap.get("ADMIN");

  if (!adminRole) {
    throw new Error("ADMIN role not found.");
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@temple.com",
    },
    update: {},
    create: {
      firstName: "System",
      lastName: "Administrator",
      email: "admin@temple.com",
      password: hashedPassword,
      roleId: adminRole.id,
      isActive: true,
    },
  });

  console.log("✅ Default admin user created.");

  console.log("🎉 Database seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Database seed failed.");
    console.error(error);

    await prisma.$disconnect();
    process.exit(1);
  });
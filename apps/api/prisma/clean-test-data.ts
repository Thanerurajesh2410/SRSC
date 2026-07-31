import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanTestData() {
  console.log("🧹 Deleting test data and keeping original data...");

  await prisma.donation.deleteMany({});
  await prisma.donorFamilyMember.deleteMany({});
  await prisma.donor.deleteMany({});
  await prisma.expense.deleteMany({});
  await prisma.materialDonation.deleteMany({});
  await prisma.constructionProgressLog.deleteMany({});
  await prisma.constructionProject.deleteMany({});
  await prisma.volunteer.deleteMany({});
  await prisma.festival.deleteMany({});
  await prisma.sevaBooking.deleteMany({});
  await prisma.devotee.deleteMany({});

  console.log("✅ All test data deleted successfully.");
  console.log("✨ Original data (Users, Roles, Permissions, Site Settings) preserved.");
}

cleanTestData()
  .catch((e) => {
    console.error("❌ Failed to clean test data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

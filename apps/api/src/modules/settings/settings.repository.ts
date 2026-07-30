import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

class SettingsRepository {
  async getSettings() {
    let settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: {
          id: "default",
          upiId: "sriramasevatrust@sbi",
          bankAccountName: "SRI RAMA SEVA TRUST",
          bankName: "State Bank of India (SBI)",
          accountNumber: "40982374619",
          ifscCode: "SBIN0004521",
          branch: "Temple Road Branch",
        },
      });
    }

    return settings;
  }

  async updateSettings(data: Prisma.SiteSettingUpdateInput) {
    return prisma.siteSetting.upsert({
      where: { id: "default" },
      update: data,
      create: {
        id: "default",
        ...data,
      } as any,
    });
  }
}

export default new SettingsRepository();

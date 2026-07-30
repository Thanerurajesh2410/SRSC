import settingsRepository from "./settings.repository";

class SettingsService {
  async getSettings() {
    return settingsRepository.getSettings();
  }

  async updateSettings(data: {
    logoUrl?: string;
    upiQrUrl?: string;
    upiId?: string;
    bankAccountName?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    branch?: string;
  }) {
    return settingsRepository.updateSettings(data);
  }
}

export default new SettingsService();

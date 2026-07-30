import sevaRepository from "./seva.repository";
import { AppError } from "../../errors/AppError";

class SevaService {
  async getAllBookings(search?: string, sevaType?: any) {
    return sevaRepository.findAll(search, sevaType);
  }

  async getBookingById(id: string) {
    const booking = await sevaRepository.findById(id);
    if (!booking) {
      throw new AppError("Seva booking record not found", 404);
    }
    return booking;
  }

  async createBooking(data: {
    sevaType: any;
    devoteeName: string;
    phone?: string;
    email?: string;
    gotram?: string;
    star?: string;
    sevaDate: Date;
    amount: number;
    paymentMode: any;
    status?: any;
    remarks?: string;
  }) {
    const year = new Date(data.sevaDate || Date.now()).getFullYear();
    const count = await sevaRepository.getCount();
    const bookingNo = `SEVA-${year}-${String(count + 1).padStart(6, "0")}`;

    return sevaRepository.create({
      bookingNo,
      sevaType: data.sevaType,
      devoteeName: data.devoteeName,
      phone: data.phone,
      email: data.email,
      gotram: data.gotram,
      star: data.star,
      sevaDate: new Date(data.sevaDate),
      amount: data.amount,
      paymentMode: data.paymentMode,
      status: data.status || "CONFIRMED",
      remarks: data.remarks,
    });
  }

  async updateBooking(id: string, data: Partial<{ sevaType: any; devoteeName: string; phone?: string; email?: string; gotram?: string; star?: string; sevaDate: Date; amount: number; paymentMode: any; status?: any; remarks?: string }>) {
    await this.getBookingById(id);
    return sevaRepository.update(id, {
      ...data,
      ...(data.sevaDate && { sevaDate: new Date(data.sevaDate) }),
    });
  }

  async deleteBooking(id: string) {
    await this.getBookingById(id);
    return sevaRepository.delete(id);
  }
}

export default new SevaService();

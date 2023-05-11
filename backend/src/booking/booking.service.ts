import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingDocument } from 'entities/booking.entity';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/createBooking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('bookings')
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async createBooking(dto: CreateBookingDto): Promise<any> {
    const response = await this.bookingModel.create(dto);
    console.log(response);
  }

  async getUserBooking(userId: string) {
    const response = await this.bookingModel.find({ userId });
    return;
  }
}

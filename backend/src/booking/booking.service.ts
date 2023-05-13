import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from 'entities/booking.entity';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto';
import { ERROR_EXCEPTION, ResponseStatus, SUCCESS_EXCEPTION } from 'types';
import { isEmpty } from 'lodash';
@Injectable()
export class BookingService {
  constructor(
    @InjectModel('bookings')
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async createBooking(dto: CreateBookingDto): Promise<ResponseStatus<Booking>> {
    try {
      const response = await this.bookingModel.create(dto);
      return {
        code: HttpStatus.CREATED,
        message: SUCCESS_EXCEPTION.CREATED,
        data: response,
      };
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ERROR_EXCEPTION.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getUserBooking(userId: string): Promise<ResponseStatus<Booking[]>> {
    try {
      const response: Booking[] = await this.bookingModel
        .find({ userId })
        .lean();
      if (!isEmpty(response)) {
        return {
          code: HttpStatus.OK,
          message: SUCCESS_EXCEPTION.OK,
          data: response,
        };
      }
      return {
        code: HttpStatus.NOT_FOUND,
        message: ERROR_EXCEPTION.NOT_FOUND,
      };
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ERROR_EXCEPTION.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getBookingDetailById(id: string): Promise<ResponseStatus<Booking>> {
    try {
      const response: Booking = await this.bookingModel.findById(id).lean();
      if (response) {
        return {
          code: HttpStatus.OK,
          message: SUCCESS_EXCEPTION.OK,
          data: response,
        };
      }
      return {
        code: HttpStatus.NOT_FOUND,
        message: ERROR_EXCEPTION.NOT_FOUND,
      };
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ERROR_EXCEPTION.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

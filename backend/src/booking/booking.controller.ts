import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';
import { ResponseStatus } from 'types';
import { Booking } from 'entities/booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  createBooking(
    @Body() dto: CreateBookingDto,
  ): Promise<ResponseStatus<Booking>> {
    return this.bookingService.createBooking(dto);
  }

  @Get(':id')
  getBookingDetailById(
    @Param('id') id: string,
  ): Promise<ResponseStatus<Booking>> {
    return this.bookingService.getBookingDetailById(id);
  }

  @Get('/user/:userId')
  getUserBooking(
    @Param('userId') userId: string,
  ): Promise<ResponseStatus<Booking[]>> {
    return this.bookingService.getUserBooking(userId);
  }
}

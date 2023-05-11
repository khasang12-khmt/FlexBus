import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  createBooking(@Body() dto: CreateBookingDto): Promise<any> {
    return this.bookingService.createBooking(dto);
  }

  @Get(':userId')
  getUserBooking(@Param('userId') userId: string) {
    return this.bookingService.getUserBooking(userId);
  }
}

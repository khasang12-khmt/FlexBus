import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';
import { ResponseStatus } from 'types';
import { Booking } from 'entities/booking.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('booking')
@ApiTags('Booking')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth() // adds authorization header with Bearer token to Swagger UI
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * Endpoint to create a new booking
   *
   * @param dto The booking details to create a booking
   * @returns The created booking
   */
  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created booking',
    type: Booking,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  createBooking(
    @Body() dto: CreateBookingDto,
  ): Promise<ResponseStatus<Booking>> {
    return this.bookingService.createBooking(dto);
  }

  /**
   * Endpoint to get the booking details by ID
   *
   * @param id The ID of the booking to get the details of
   * @returns The booking details for the specified ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get booking detail by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the booking with the specified ID',
    type: Booking,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getBookingDetailById(
    @Param('id') id: string,
  ): Promise<ResponseStatus<Booking>> {
    return this.bookingService.getBookingDetailById(id);
  }

  /**
   * Endpoint to get all the bookings for a user
   *
   * @param userId The ID of the user to get the bookings for
   * @returns All the bookings associated with the specified user ID
   */
  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get bookings by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all bookings associated with the specified user ID',
    type: [Booking],
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getUserBooking(
    @Param('userId') userId: string,
  ): Promise<ResponseStatus<Booking[]>> {
    return this.bookingService.getUserBooking(userId);
  }
}

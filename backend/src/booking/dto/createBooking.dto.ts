import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The ID of the user who made the booking',
    example: '645f2576818aa34ae82a4ads',
  })
  userId: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    description: 'The information about the bus being booked',
    example: {
      busNumber: '1234',
      source: 'New York',
      destination: 'Boston',
      departureTime: '2023-06-01T12:00:00.000Z',
      arrivalTime: '2023-06-01T16:00:00.000Z',
      price: 50.0,
    },
  })
  busInfo: any;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    description: 'The payment information for the booking',
    example: {
      method: 'credit card',
      cardNumber: '1234567812345678',
      cardHolder: 'John Doe',
      ccv: 123,
      expiryDate: '06/25',
    },
  })
  payment: {
    method: string;
    cardNumber: string;
    cardHolder: string;
    ccv: number;
    expiryDate: string;
  };
}

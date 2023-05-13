import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

type Payment = {
  method: string;
  status: string;
  cardNumber: string;
  cardHolder: string;
  ccv: number;
  expiryDate: string;
  transactionCode: string;
};

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the user who made the booking',
    example: '60a1b52f3d1aaf00115d7236',
  })
  userId: string;

  @Prop({ type: Object })
  @ApiProperty({
    description: 'Information about the bus being booked',
    example: {
      type: 8,
      schedule: [
        {
          day: 'Monday',
          operatingHours: '8:00am - 5:00pm',
          frequency: 'Every 30 minutes',
        },
        {
          day: 'Tuesday',
          operatingHours: '8:00am - 5:00pm',
          frequency: 'Every 30 minutes',
        },
        {
          day: 'Wednesday',
          operatingHours: '8:00am - 5:00pm',
          frequency: 'Every 30 minutes',
        },
        {
          day: 'Thursday',
          operatingHours: '8:00am - 5:00pm',
          frequency: 'Every 30 minutes',
        },
        {
          day: 'Friday',
          operatingHours: '8:00am - 5:00pm',
          frequency: 'Every 30 minutes',
        },
        {
          day: 'Saturday',
          operatingHours: '8:00am - 5:00pm',
          frequency: 'Every 60 minutes',
        },
        {
          day: 'Sunday',
          operatingHours: '8:00am - 5:00pm',
          frequency: 'Every 60 minutes',
        },
      ],
      facilities: ['Air conditioning', 'Free WiFi'],
    },
  })
  busInfo: any;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The payment method used for the booking',
    example: 'Credit Card',
  })
  method: string;

  @Prop()
  @ApiProperty({
    description: 'The status of the booking',
    example: 'Confirmed',
  })
  status: string;

  @Prop({ type: Object })
  @ApiProperty({
    description: 'Payment information for the booking',
    example: {
      method: 'Credit Card',
      status: 'Paid',
      cardNumber: '**** **** **** 1234',
      cardHolder: 'John Doe',
      ccv: 123,
      expiryDate: '05/23',
      transactionCode: 'e456f7a8-bbcd-9efg-hijk-l123m4n5o6p7',
    },
  })
  payment: Payment;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.pre('save', function (next) {
  // Perform some operation or validation
  this.payment.transactionCode = uuidv4();

  next();
});

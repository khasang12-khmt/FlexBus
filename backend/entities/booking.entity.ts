import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;
@Schema({ timestamps: true })
export class Booking {
  @Prop()
  @IsNotEmpty()
  userId: string;

  @Prop()
  busInfo: any;

  @Prop()
  @IsNotEmpty()
  method: string;

  @Prop()
  status: string;

  @Prop()
  payment: {
    status: string;
    cardNumber: string;
    cardHolder: string;
    ccv: number;
    expiryDate: string;
  };
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

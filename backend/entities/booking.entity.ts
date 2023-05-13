import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
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
  userId: string;

  @Prop({ type: Object })
  busInfo: any;

  @Prop()
  @IsNotEmpty()
  method: string;

  @Prop()
  status: string;

  @Prop({ type: Object })
  payment: {
    method: string;
    status: string;
    cardNumber: string;
    cardHolder: string;
    ccv: number;
    expiryDate: string;
    transactionCode: string;
  };
}
export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.pre('save', function (next) {
  // Perform some operation or validation
  this.payment.transactionCode = uuidv4();

  next();
});

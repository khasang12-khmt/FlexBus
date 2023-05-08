import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;
@Schema({ timestamps: true })
export class Payment {
  @Prop()
  @IsNotEmpty()
  method: string;

  @Prop()
  @IsNotEmpty()
  amount: string;

  @Prop()
  status: string;

  @Prop()
  @IsNotEmpty()
  user_id: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

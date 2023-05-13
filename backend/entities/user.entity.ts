import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  otp: string;

  @Prop({
    default: false,
  })
  active: boolean;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: null })
  phoneNumber: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

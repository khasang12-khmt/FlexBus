import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: '123456',
    description: 'The one-time password of the user (if set)',
    default: null,
  })
  @Prop({ default: null })
  otp: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user account is active or not',
    default: false,
  })
  @Prop({
    default: false,
  })
  active: boolean;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email address of the user',
  })
  @Prop()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @Prop()
  password: string;

  @ApiProperty({
    example: '2019382',
    description: 'The student number of the user (if applicable)',
    default: null,
  })
  @Prop({ default: null })
  student_no: string;

  @ApiProperty({
    example: '555-555-5555',
    description: 'The phone number of the user (if set)',
    default: null,
  })
  @Prop({ default: null })
  phoneNumber: string;

  @ApiProperty({
    example: 'Male',
    description: 'The gender of the user (if set)',
    default: null,
  })
  @Prop({ default: null })
  gender: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user (if set)',
    default: null,
  })
  @Prop({ default: null })
  birthDay: Date;

  @ApiProperty({
    example: '2022-05-13T08:00:00.000Z',
    description: 'The date and time when the user account was created',
  })
  @Prop()
  createdAt?: Date;

  @ApiProperty({
    example: '2022-05-13T08:00:00.000Z',
    description: 'The date and time when the user account was last updated',
  })
  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

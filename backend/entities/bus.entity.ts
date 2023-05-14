import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BusDocument = Bus & Document;

@Schema({ timestamps: true })
export class Bus {
  @Prop()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The type of the bus. e.g. 8, 33, 19, 150...',
  })
  type: number;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({
    type: Array<{
      day: string;
      operatingHours: string;
      frequency: string;
    }>,
    description:
      'The schedule for the bus. Each entry represents the schedule for a day of the week.',
  })
  schedule: [
    {
      day: string;
      operatingHours: string;
      frequency: string;
    },
  ];

  @Prop()
  @ApiProperty({
    type: [String],
    description: 'The facilities available on the bus.',
  })
  facilities: string[];
}

export const BusSchema = SchemaFactory.createForClass(Bus);

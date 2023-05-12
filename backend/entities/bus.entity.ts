import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type BusDocument = Bus & Document;
@Schema({ timestamps: true })
export class Bus {
  @Prop()
  @IsNotEmpty()
  type: number; //8, 33, 19, 150...

  @Prop()
  @IsNotEmpty()
  schedule: [
    {
      day: string;
      operatingHours: string;
      frequency: string;
    },
  ];

  @Prop()
  facilities: string[];
}

export const BusSchema = SchemaFactory.createForClass(Bus);

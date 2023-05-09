import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;
@Schema({ timestamps: true })
export class Booking {
  @Prop()
  @IsNotEmpty()
  user_id: string;

  @Prop()
  @IsNotEmpty()
  status_booking: string;

  @Prop()
  @IsNotEmpty()
  route: {
    from: Route;
    to: Route;
  };

  @Prop()
  @IsNotEmpty()
  payment_id: string;

  @Prop()
  bus_info: {
    name: string;
  };
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

interface Route {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: string;
  icon: string;
}

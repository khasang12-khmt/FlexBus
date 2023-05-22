import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from 'entities/booking.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'bookings',
        schema: BookingSchema,
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}

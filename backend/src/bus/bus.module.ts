import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusSchema } from 'entities/bus.entity';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'buses',
        schema: BusSchema,
      },
    ]),
  ],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}

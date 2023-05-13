import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusSchema } from 'entities/bus.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'buses',
        schema: BusSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class BusModule {}

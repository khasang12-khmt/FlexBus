import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { BusModule } from './bus/bus.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'), // Loaded from .ENV
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    BookingModule,
    BusModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

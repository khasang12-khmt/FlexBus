import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bus, BusDocument } from 'entities/bus.entity';
import { Model } from 'mongoose';
import { GetBusDto } from './dto';
import { ERROR_EXCEPTION, ResponseStatus, SUCCESS_EXCEPTION } from 'types';

@Injectable()
export class BusService {
  constructor(
    @InjectModel('buses') private readonly busModel: Model<BusDocument>,
  ) {}

  async getBusDetail(type: string): Promise<ResponseStatus<Bus>> {
    try {
      const response: Bus = await this.busModel.find({ type }).lean();
      return {
        code: HttpStatus.OK,
        message: SUCCESS_EXCEPTION.OK,
        data: response,
      };
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ERROR_EXCEPTION.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

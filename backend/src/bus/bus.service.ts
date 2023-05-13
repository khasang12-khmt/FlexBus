import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bus, BusDocument } from 'entities/bus.entity';
import { Model } from 'mongoose';
import { GetBusDto } from './dto';
import { ResponseStatus, SUCCESS_EXCEPTION } from 'types';

@Injectable()
export class BusService {
  constructor(
    @InjectModel('buses') private readonly busModel: Model<BusDocument>,
  ) {}

  async getBusDetail(dto: GetBusDto): Promise<ResponseStatus<Bus[]>> {
    const response: Bus[] = await this.busModel.find({ type: dto.type }).lean();
    return {
      code: HttpStatus.OK,
      message: SUCCESS_EXCEPTION.OK,
      data: response,
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import { BusService } from './bus.service';
import { GetBusDto } from './dto';
import { ResponseStatus } from 'types';
import { Bus } from 'entities/bus.entity';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get()
  getBusDetail(dto: GetBusDto): Promise<ResponseStatus<Bus[]>> {
    return this.busService.getBusDetail(dto);
  }
}

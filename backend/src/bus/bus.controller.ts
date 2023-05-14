import { Controller, Get, Param } from '@nestjs/common';
import { BusService } from './bus.service';
import { ResponseStatus } from 'types';
import { Bus } from 'entities/bus.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('bus')
@ApiTags('Bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get('/:type')
  @ApiOperation({
    summary: 'Get detailed information about a specific bus',
    description:
      'Retrieves information about the schedule and facilities of the specified bus type.',
  })
  @ApiResponse({
    status: 200,
    description: 'The requested bus information',
    type: Bus,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  getBusDetail(@Param('type') type: string): Promise<ResponseStatus<Bus>> {
    return this.busService.getBusDetail(type);
  }
}

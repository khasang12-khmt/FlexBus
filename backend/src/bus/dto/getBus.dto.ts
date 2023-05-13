import { IsNotEmpty } from 'class-validator';

export class GetBusDto {
  @IsNotEmpty()
  type: number;
}

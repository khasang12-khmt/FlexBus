import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The ID of the user to update',
    example: '645f2576818aa34ae82a4ads',
  })
  id: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  phoneNumber?: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'The gender of the user',
    enum: ['male', 'female', 'other'],
    example: 'male',
  })
  gender?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    type: String,
    description: 'The birthday of the user in ISO format',
    example: '1990-01-01',
  })
  birthDay?: string;
}

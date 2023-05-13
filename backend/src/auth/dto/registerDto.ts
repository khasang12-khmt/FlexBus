import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'The email address for the new user',
    example: 'jane@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password for the new user',
    example: 'mysecretpassword',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

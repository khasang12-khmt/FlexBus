import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'The email address of the user logging in',
    example: 'jane@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password for the user logging in',
    example: 'mysecretpassword',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

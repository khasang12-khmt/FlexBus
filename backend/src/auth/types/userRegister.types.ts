import { ApiProperty } from '@nestjs/swagger';

export class UserRegister {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address of the user',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '2023-05-14T00:00:00.000Z',
    description: 'Date and time when the user was registered',
    required: true,
  })
  createdAt: Date;
}

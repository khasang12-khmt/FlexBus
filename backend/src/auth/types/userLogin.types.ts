import { ApiProperty } from '@nestjs/swagger';

export class UserLogin {
  @ApiProperty({ example: '0123456789', description: 'The user ID' })
  id: string;

  @ApiProperty({ example: 'john@example.com', description: 'The user email' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'The user name' })
  name: string;

  @ApiProperty({
    example: '+1 123-456-7890',
    description: 'The user phone number',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'male', description: 'The user gender' })
  gender: string;

  @ApiProperty({
    example: '1990-01-01T00:00:00Z',
    description: 'The user date of birth',
  })
  birthDay: Date;

  @ApiProperty({
    example: '2023-05-13T12:34:56Z',
    description: 'The timestamp of when the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'The access token for the user',
  })
  accessToken: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user is active or not',
  })
  active: boolean;
}

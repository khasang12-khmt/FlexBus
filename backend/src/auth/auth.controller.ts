import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseStatus } from '../../types';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserLogin, UserRegister } from './types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp')
  @ApiOperation({ summary: 'Verify OTP for email' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async otpVerify(
    @Body() dto: { email: string; otp: string },
  ): Promise<ResponseStatus<null>> {
    return await this.authService.otpVerify(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Returns user details and JWT token upon successful login',
    type: UserLogin,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(@Body() userDto: LoginDto): Promise<ResponseStatus<UserLogin>> {
    return await this.authService.login(userDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user with email and password' })
  @ApiResponse({
    status: 201,
    description:
      'Returns user details and JWT token upon successful registration',
    type: UserRegister,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async register(
    @Body() userDto: RegisterDto,
  ): Promise<ResponseStatus<UserRegister>> {
    return await this.authService.register(userDto);
  }
}

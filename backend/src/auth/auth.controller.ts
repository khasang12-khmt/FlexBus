import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseStatus } from '../../types';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserLogin, UserRegister } from './types';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: LoginDto): Promise<ResponseStatus<UserLogin>> {
    return await this.authService.login(userDto);
  }

  @Post('register')
  async register(
    @Body() userDto: RegisterDto,
  ): Promise<ResponseStatus<UserRegister>> {
    return await this.authService.register(userDto);
  }
}

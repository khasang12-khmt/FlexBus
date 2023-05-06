import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../entities/user.entity';
import { ERROR_EXCEPTION, ResponseStatus, SUCCESS_EXCEPTION } from 'types';
import { v4 as uuidv4 } from 'uuid';
import { compare, hashPassword } from 'utils';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto';
import { UserLogin, UserRegister } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto): Promise<ResponseStatus<UserLogin>> {
    const user = await this.userModel.findOne({ email: userDto.email }).lean();
    if (user && (await compare(userDto.password, user.password))) {
      return {
        code: HttpStatus.OK,
        message: SUCCESS_EXCEPTION.OK,
        data: {
          id: user._id,
          createdAt: user.createdAt,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          accessToken: this.jwtService.sign(user),
        },
      };
    }

    throw new HttpException(
      ERROR_EXCEPTION.LOGIN_FAILED,
      HttpStatus.BAD_REQUEST,
    );
  }

  async register(userDto: RegisterDto): Promise<ResponseStatus<UserRegister>> {
    const user = await this.userModel.findOne({ email: userDto.email });
    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userModel.create({
      ...userDto,
      password: await hashPassword(userDto.password),
    });

    return {
      code: HttpStatus.OK,
      message: SUCCESS_EXCEPTION.OK,
      data: {
        createdAt: newUser.createdAt,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    };
  }
}

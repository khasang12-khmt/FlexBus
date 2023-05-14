import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'entities/user.entity';
import { Model } from 'mongoose';
import { ERROR_EXCEPTION, ResponseStatus, SUCCESS_EXCEPTION } from 'types';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserProfile(
    id: string,
  ): Promise<ResponseStatus<Omit<User, 'password'>>> {
    const { password, ...response }: User = await this.userModel
      .findById(id)
      .lean();
    if (response)
      return {
        code: HttpStatus.OK,
        message: SUCCESS_EXCEPTION.OK,
        data: response,
      };
    return {
      code: HttpStatus.NOT_FOUND,
      message: ERROR_EXCEPTION.NOT_FOUND,
    };
  }

  async updateUserProfile(
    dto: UpdateUserDto,
  ): Promise<ResponseStatus<Omit<User, 'password'>>> {
    try {
      const { id, ...updateInfo } = dto;
      const { password, ...response }: User = await this.userModel
        .findByIdAndUpdate(id, { ...updateInfo })
        .lean();
      return {
        code: HttpStatus.OK,
        message: SUCCESS_EXCEPTION.OK,
        data: response,
      };
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ERROR_EXCEPTION.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

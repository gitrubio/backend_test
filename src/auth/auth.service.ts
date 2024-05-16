import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { REGEX_PASSWORD } from './constants/constanst';
import { messages_register } from './constants/messages';
@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    if (!this.validatePassword(registerDto.password)) {
      throw new BadRequestException(messages_register.password);
    }
    const user = await this.UserService.create(registerDto);
    const access_token = this.jwtService.sign({ id: user.id });
    return {
      access_token,
      user : {
        fullName: user.fullName,
        email: user.email,
      }
    };
  }
  validatePassword(password: string): boolean {
    return REGEX_PASSWORD.test(password);
  }
  async login({ email, password }: LoginDto) {
    const user = await this.UserService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email not found');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }
    const access_token = this.jwtService.sign({ id: user.id });
    return {
      access_token,
      user : {
        fullName: user.fullName,
        email: user.email,
      }
    };
  }

  revalidateToken(user: User) {
    const token = this.jwtService.sign({ id: user.id });
    return {
      access_token: token,
      user : {
        fullName: user.fullName,
        email: user.email,
      }
    };
  }

  async updatePassword(user: User, password: string, newPassword: string) {
    if (!this.validatePassword(newPassword)) {
      throw new BadRequestException(messages_register.password);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid current password');
    }

    await this.UserService.updatePassword(user.id, newPassword);
    return {
      message: 'Password updated successfully',
    };
  }
}

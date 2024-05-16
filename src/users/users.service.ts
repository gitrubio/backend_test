import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DB_ERROR_CODES } from 'src/auth/constants/constanst';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, username, password }: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        email,
        username,
        password: bcrypt.hashSync(password, 10),
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async findOneByEmail(username: string) {
    return this.userRepository.findOneBy({ username, deletedAt: null });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: string) {
    return this.userRepository.findOneBy({ id , deletedAt: null });
  }

  async updatePassword(id: string, password: string) {
    try {
      return await this.userRepository.update(id, {password: bcrypt.hashSync(password, 10)});
    } catch (error) {
      this.handleDbError(error);
    }
  }

  private handleDbError(error: any): never {
    if (error.code === DB_ERROR_CODES.UNIQUE_CONSTRAINT) {
      throw new ConflictException('Email already exists');
    }
    this.logger.error(error);
    throw new InternalServerErrorException('please check the logs');
  }
}

import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이름입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

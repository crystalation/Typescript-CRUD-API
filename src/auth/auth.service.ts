import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { SignUpRequestBody } from './models/SignUpRequestBody';
@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Invalid credentials');
  }

  async checkUser(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    console.log(user);
    return user ? true : false;
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async register(user: SignUpRequestBody): Promise<string> {
    const userExists = await this.checkUser(user.email);
    if (userExists) {
      return 'User already exists';
    } else {
      return this.usersRepository.create(user).then((user) => {
        return this.login(user).access_token;
      });
    }
  }
}

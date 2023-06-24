import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(loginUserDto: LoginDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private usersService: UsersService) {}
}

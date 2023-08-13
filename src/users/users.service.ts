import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    return this.usersRepository.save(user);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async getUserByEmailAndPopulateUserTrips(email: string) {
    const user = await this.usersRepository.find({ where : { email}, relations : { userTrips : true }});
    return user[0];
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

}

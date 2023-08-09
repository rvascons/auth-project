import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

}

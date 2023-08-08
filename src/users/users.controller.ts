import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.usersRepository.findAll();
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersRepository.findOneByEmail(email);
  }
}

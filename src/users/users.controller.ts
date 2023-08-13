import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmailAndPopulateUserTrips(email);
  }

}

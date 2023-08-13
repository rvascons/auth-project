import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.createTrip(createTripDto, user);
  }

  @Get()
  findAll() {
    return this.tripsService.getAllTrips();
  }

}

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { RequirePermission } from 'src/auth/decorators/permissions.decorator';
import { Permissions } from 'src/auth/enums/permissions.enum';

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

  @Get(':id')
  @UseGuards(PermissionGuard)
  @RequirePermission(Permissions.Write)
  findOne(@CurrentUser() user: User,@Param('id') id: number) {
    return this.tripsService.getTripById(id);
  }

}

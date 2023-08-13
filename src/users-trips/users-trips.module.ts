import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTrip } from "./entities/users-trip.entity";
import { UsersTripsService } from "./users-trips.service";


@Module({
  imports: [TypeOrmModule.forFeature([UserTrip])],
  providers: [UsersTripsService],
  exports: [UsersTripsService],
})
export class UsersTripsModule {}
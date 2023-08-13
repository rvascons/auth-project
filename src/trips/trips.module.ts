import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { UserTrip } from 'src/users-trips/entities/users-trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), TypeOrmModule.forFeature([UserTrip])],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}

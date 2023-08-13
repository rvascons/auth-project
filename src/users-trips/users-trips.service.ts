import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTrip } from './entities/users-trip.entity';

@Injectable()
export class UsersTripsService {
  constructor(
    @InjectRepository(UserTrip)
    private readonly userTripRepository: Repository<UserTrip>
  ) {}

  async findUserTrip(userId: number, tripId: number): Promise<UserTrip | undefined> {
    try {
      const userTrip = await this.userTripRepository.findOne({
        where: {
          user: { id: userId },
          trip: { id: tripId }
        },
        relations: ['user', 'trip']  // if you need the user and trip entities as well
      });

      return userTrip;
    } catch (error) {
      throw new NotFoundException(`No relation found between user with ID ${userId} and trip with ID ${tripId}`);
    }
  }
}

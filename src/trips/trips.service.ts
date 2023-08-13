import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './entities/trip.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TripsService {

  public constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>, 
  ) {}
  
  async createTrip(createTripDto: CreateTripDto, user: User) {
    console.log("User", user.email, "created a new trip.")
    return this.tripsRepository.save(createTripDto);
  }

  async getTripById(id: number) {
    return this.tripsRepository.findOneBy({id});
  }

  async getAllTrips() {
    return this.tripsRepository.find();
  }

}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTrip } from 'src/users-trips/entities/users-trip.entity';
import { Permissions } from 'src/auth/enums/permissions.enum';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {

  public constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
    @InjectRepository(UserTrip)
    private userTripsRepository: Repository<UserTrip>,
    private dataSource: DataSource,
  ) {}
  
  async createTrip(createTripDto: CreateTripDto, user: User) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const trip = new Trip();
      trip.destination = createTripDto.destination;
      const savedTrip = await queryRunner.manager.save(trip);

      const userTrip = new UserTrip();
      userTrip.user = user;
      userTrip.trip = savedTrip;
      userTrip.permission = Permissions.Write;
      await queryRunner.manager.save(userTrip);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to create trip.');
    } finally {
      await queryRunner.release();
    }
  }

  async getTripById(id: number) {
    return this.tripsRepository.findOneBy({id});
  }

  async getAllTrips() {
    return this.tripsRepository.find();
  }

}

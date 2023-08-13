import { UserTrip } from "src/users-trips/entities/users-trip.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @OneToMany(() => UserTrip, userTrip => userTrip.trip, {
    cascade: true
  })
  userTrips: UserTrip[];
}

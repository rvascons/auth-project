import { UserTrip } from 'src/users-trips/entities/users-trip.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserTrip, userTrip => userTrip.user, {
    cascade: true
  })
  userTrips: UserTrip[];
}

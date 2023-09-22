import { Invite } from 'src/invites/entities/invite.entity';
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

  @OneToMany(() => Invite, (invite) => invite.host, {
    cascade: true
  })
  sentInvites: Invite[];

  @OneToMany(() => Invite, (invite) => invite.guest, {
    cascade: true
  })
  receivedInvites: Invite[];
}

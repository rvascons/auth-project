import { Trip } from "src/trips/entities/trip.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permissions } from "../../auth/enums/permissions.enum";

@Entity()
export class UserTrip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Trip)
  trip: Trip;

  @Column({
    type: "enum",
    enum: Permissions,
    array: true,
  })
  permissions: Permissions[];
}

import { Permissions } from "src/auth/enums/permissions.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InviteStatus } from "../invites.enum";

@Entity()
export class Invite {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: InviteStatus,
        default: InviteStatus.PENDING
    })
    status: InviteStatus;

    @Column({
        type: 'enum',
        enum: Permissions,
        array: true,
    })
    permissions: Permissions[];

    @Column()
    tripId: number;

    @ManyToOne(() => User, (user) => user.sentInvites, {
        cascade: ['insert', 'update'],
    })
    host: User;

    @ManyToOne(() => User, (user) => user.receivedInvites, {
        cascade: ['insert', 'update'],
    })
    guest: User;
}

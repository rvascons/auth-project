import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from 'src/auth/enums/permissions.enum';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Invite } from './entities/invite.entity';

@Injectable()
export class InvitesService {
  public constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: Repository<Invite>,

    private readonly userService: UsersService,
  ) { }
  async sendInvite(ownerUserId: number, targetUserEmail: string, tripId: number, permissions: Permissions[]): Promise<any> {
    //wait
  }
}

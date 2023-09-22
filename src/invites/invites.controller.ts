import { Body, Controller, Put } from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InvitesService } from './invites.service';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Put()
  upsert(@CurrentUser() user: User, @Body() params: CreateInviteDto) {
    return this.invitesService.sendInvite(user.id, params.email, params.tripId, params.permissions);
  }

  // @Get()
  // findAll() {
  //   return this.invitesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.invitesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInviteDto: UpdateInviteDto) {
  //   return this.invitesService.update(+id, updateInviteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invitesService.remove(+id);
  // }
}

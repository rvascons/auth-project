import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from 'src/auth/decorators/permissions.decorator';
import { UsersTripsService } from '../../users-trips/users-trips.service';
import { Permissions } from '../enums/permissions.enum';


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersTripsService: UsersTripsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<Permissions>(
      PERMISSION_KEY,
      context.getHandler()
    );
    if (!requiredPermission) {
      // If no permission is set, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assumes you have a user object attached to request after JWT authentication
    const tripId = request.params.id; // Assumes your trip id is named "id" in route parameters

    const userTrip = await this.usersTripsService.findUserTrip(user.id, tripId);

    if (!userTrip) {
      throw new UnauthorizedException('No relation found between user and trip.');
    }

    if (userTrip.permission !== requiredPermission) {
      throw new UnauthorizedException('User does not have the required permission.');
    }

    return true;
  }
}

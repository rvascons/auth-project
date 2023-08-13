import { SetMetadata } from '@nestjs/common';
import { Permissions } from 'src/auth/enums/permissions.enum';

export const PERMISSION_KEY = 'requiredPermission';
export const RequirePermission = (permission: Permissions) => SetMetadata(PERMISSION_KEY, permission);

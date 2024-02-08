import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../constants';

export const Roles = (...args: UserRoleEnum[]) => SetMetadata('roles', args);

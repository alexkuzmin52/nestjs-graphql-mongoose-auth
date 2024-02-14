import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { GqlJwtAuthGuard } from '../guards/gql-jwt-auth.guard';
import { Roles } from '../decorators/user-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { UpdateUserRoleInput } from './dto/update-user-role.input';
import { UpdateUserStatusInput } from './dto/update-user-status.input';
import { User } from './schemas/user.schema';
import { UserRoleEnum } from '../constants';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // TODO auth + fix @Args
  @Query(() => [User], { name: 'users' })
  async users(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Query(() => User, { name: 'userById' })
  async user(@Args('_id') _id: string): Promise<User> {
    return await this.userService.getUserById(_id);
  }

  @Mutation(() => User)
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async updateStatus(
    @Args('update_status') update_status: UpdateUserStatusInput,
  ): Promise<User> {
    return await this.userService.updateUserStatus(update_status);
  }

  @Mutation(() => User)
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async updateRole(
    @Args('update_role') update_role: UpdateUserRoleInput,
  ): Promise<User> {
    return await this.userService.updateUserRole(update_role);
  }
}

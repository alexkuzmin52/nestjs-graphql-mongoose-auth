import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { UserRoleEnum } from '../constants';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/user-roles.decorator';
import { GqlJwtAuthGuard } from '../guards/gql-jwt-auth.guard';
import { UpdateUserStatusInput } from "./dto/update-user-status.input";
import { UpdateUserRoleInput } from "./dto/update-user-role.input";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
    // @CurrentUser() user: User,
  ): Promise<User> {
    return await this.userService.updateUserStatus(update_status);
  }

  @Mutation(() => User)
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async updateRole(
    @Args('update_role') update_role: UpdateUserRoleInput,
    // @CurrentUser() user: User,
  ): Promise<User> {
    return await this.userService.updateUserRole(update_role);
  }
}

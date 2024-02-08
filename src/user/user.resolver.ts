import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

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
}

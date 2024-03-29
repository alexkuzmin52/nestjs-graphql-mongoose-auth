import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthLoginInput } from './dto/auth-login.input';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { AuthRegisterResponseDto } from './dto/auth-register-response.dto';
import { AuthService } from './auth.service';
import { ChangePasswordInput } from '../user/dto/change-password.input';
import { CreateUserInput } from '../user/dto/create-user.input';
import { CurrentUser } from '../decorators/user.decorator';
import { GqlJwtAuthGuard } from '../guards/gql-jwt-auth.guard';
import { Roles } from '../decorators/user-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { User } from '../user/schemas/user.schema';
import { UserRoleEnum } from '../constants';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthRegisterResponseDto)
  async register(
    @Args('user', { type: () => CreateUserInput }) user: CreateUserInput,
  ): Promise<AuthRegisterResponseDto> {
    return await this.authService.registerUser(user);
  }

  @Query(() => AuthLoginResponseDto, { name: 'confirm' })
  async confirm(
    @Args('confirm_token', { type: () => String }) confirm_token: string,
  ): Promise<AuthLoginResponseDto> {
    return await this.authService.confirmUser(confirm_token);
  }

  @Query(() => AuthLoginResponseDto, { name: 'refresh' })
  async refresh(
    @Args('refresh_token', { type: () => String }) refresh_token: string,
  ): Promise<AuthLoginResponseDto> {
    return await this.authService.refreshToken(refresh_token);
  }

  @Mutation(() => AuthLoginResponseDto)
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.USER, UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  async login(
    @Args('credential', { type: () => AuthLoginInput })
    credential: AuthLoginInput,
    @CurrentUser() user: User,
  ): Promise<AuthLoginResponseDto> {
    return await this.authService.loginUser(user._id.toString(), credential);
  }

  @Mutation(() => AuthLoginResponseDto)
  @UseGuards(GqlJwtAuthGuard)
  async changePassword(
    @Args('change_password', { type: () => ChangePasswordInput })
    change_password: ChangePasswordInput,
    @CurrentUser() user: User,
  ): Promise<AuthLoginResponseDto> {
    return await this.authService.changeUserPassword(change_password, user);
  }
}

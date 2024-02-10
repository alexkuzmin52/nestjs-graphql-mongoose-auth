import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthLoginInput } from './dto/auth-login.input';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { AuthRegisterResponseDto } from './dto/auth-register-response.dto';
import { ChangePasswordInput } from '../user/dto/change-password.input';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { UserStatusEnum } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(
    createUserInput: CreateUserInput,
  ): Promise<AuthRegisterResponseDto> {
    const { password } = createUserInput;

    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await this.userService.createUser({
      ...createUserInput,
      password: hashedPassword,
    });

    const confirmToken = this.jwtService.sign(
      {
        _id: registeredUser._id,
        email: registeredUser.email,
        role: registeredUser.role,
      },
      {
        secret: this.configService.get('JWT_CONFIRM_EMAIL_SECRET'),
        expiresIn: this.configService.get('JWT_CONFIRM_EMAIL_LIFETIME'),
      },
    );

    return { message: 'Confirm your register', token: confirmToken };
  }

  async confirmUser(confirm_token: string): Promise<AuthLoginResponseDto> {
    const payload = this.jwtService.verify(confirm_token, {
      secret: this.configService.get('JWT_CONFIRM_EMAIL_SECRET'),
    });
    const confirmedUser = await this.userService.updateUser(payload['_id'], {
      status: UserStatusEnum.CONFIRMED,
    });
    const tokensPair = await this.createTokensPair(confirmedUser);
    return tokensPair;
  }

  async loginUser(_id: string, credential: AuthLoginInput): Promise<AuthLoginResponseDto> {
    const { email, password } = credential;

    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException('Wrong credential');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Wrong credential');

    await this.userService.updateUser(_id, {
      status: UserStatusEnum.LOGGED_IN,
    });

    return this.createTokensPair(user);
  }

  async validateUser(payload: any): Promise<User> {
    const { email } = payload;

    const user = await this.userService.findUserByEmail(email);
    return user;
  }

  private async createTokensPair(user: User): Promise<AuthLoginResponseDto> {
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_SECRET_LIFETIME'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_SECRET_LIFETIME'),
    });

    return { access_token, refresh_token };
  }

  async refreshToken(refresh_token: string): Promise<AuthLoginResponseDto> {
    const payload = this.jwtService.verify(refresh_token, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });
    const user = await this.userService.getUserById(payload['_id']);

    if (!user) throw new UnauthorizedException();

    const tokensPair = this.createTokensPair(user);
    return tokensPair;
  }

  async changeUserPassword(
    change_password: ChangePasswordInput,
    user: User,
  ): Promise<AuthLoginResponseDto> {
    const { _id, email } = user;

    const userByEmail = await this.userService.findUserByEmail(email);
    const isValidOldPassword = await bcrypt.compare(
      change_password.old_password,
      userByEmail.password,
    );

    if (!isValidOldPassword)
      throw new BadRequestException('wrong old password');

    const hashedPassword = await bcrypt.hash(change_password.new_password, 10);

    const updatedUser = await this.userService.updateUser(_id.toString(), {
      password: hashedPassword,
    });

    return this.createTokensPair(updatedUser);
  }
}

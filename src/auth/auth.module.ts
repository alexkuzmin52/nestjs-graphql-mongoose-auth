import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';

import { Auth, AuthSchema } from './schemas/auth.schema';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    UserModule,
    JwtModule.register({}),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}

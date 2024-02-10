import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppResolver } from './app.resolver';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { configuration } from '../../config/configurarion';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/.${process.env.NODE_ENV}.dev`,
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/my-vocabulary'),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}

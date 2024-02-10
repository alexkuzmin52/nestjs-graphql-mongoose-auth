import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../user/schemas/user.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Auth {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => User)
  @Prop()
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  access_token: string;

  @Field(() => String)
  @Prop()
  refresh_token: string;
}

export type AuthType = Auth & Document;
export const AuthSchema = SchemaFactory.createForClass(Auth);

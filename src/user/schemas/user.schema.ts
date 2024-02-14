import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserRoleEnum, UserStatusEnum } from '../../constants';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  createdAt: Date;

  @Field(() => String, { nullable: true, defaultValue: UserRoleEnum.USER })
  @Prop({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  role?: string;

  @Field(() => String, { nullable: true, defaultValue: UserStatusEnum.PENDING })
  @Prop({ enum: UserStatusEnum, default: UserStatusEnum.PENDING })
  status?: string;
}

export type UserType = Document & User;
export const UserSchema = SchemaFactory.createForClass(User);

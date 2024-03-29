import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../user/schemas/user.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Card {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: User.name })
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  front_side: string;

  @Field(() => String)
  @Prop({ required: true })
  back_side: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  @Prop()
  topic?: string;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @Prop({ type: Number, default: 1 })
  level?: number;

  @Field(() => GraphQLISODateTime)
  @Prop()
  deadline: Date;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @Prop({ type: Number, default: 0})
  counter?: number;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  @Prop({ type: Number, default: 0})
  failed?: number;
}

export type CardType = Card & Document;
export const CardSchema = SchemaFactory.createForClass(Card);

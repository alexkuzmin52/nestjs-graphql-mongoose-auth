import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserStatusEnum } from '../../constants';

@InputType()
export class UpdateUserStatusInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;
}

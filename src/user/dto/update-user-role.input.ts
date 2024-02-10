import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserRoleEnum } from '../../constants';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}

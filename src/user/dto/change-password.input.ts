import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(6, { message: 'Too few characters (must be at least 6)' })
  new_password: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(6, { message: 'Too few characters (must be at least 6)' })
  old_password: string;
}

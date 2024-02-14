import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateCardInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(2, 256)
  front_side: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(2, 256)
  back_side: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  @IsNotEmpty()
  @IsString()
  @Length(2, 256)
  topic?: string;
}

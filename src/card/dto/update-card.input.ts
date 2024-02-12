import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class UpdateCardInput {
  @Field(() => String)
  @IsOptional()
  @IsString()
  @Length(2, 256)
  front_side?: string;

  @Field(() => String)
  @IsOptional()
  @IsString()
  @Length(2, 256)
  back_side?: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  @IsOptional()
  @IsString()
  @Length(2, 256)
  topic?: string;
}

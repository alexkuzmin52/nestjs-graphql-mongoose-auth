import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class AnswerFrontSideArgs {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  answer: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  cardId: string;
}

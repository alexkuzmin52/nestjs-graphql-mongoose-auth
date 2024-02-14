import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

@ArgsType()
export class PaginationCardArgs {

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  limit: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  minCounter?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxCounter?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  minFailed?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxFailed?: number;
}

import { ArgsType, Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { PaginationCardArgs } from './pagination-card.args';
import { SortingDirectionEnum } from 'src/constants/sorting-direction.enum';
import { SortingFieldEnum } from 'src/constants/sorting-field.enum';

@ArgsType()
export class FilterCardArgs extends PaginationCardArgs {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 256)
  topic?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  level?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDate()
  deadline?: Date;


  @Field(() => String, {
    nullable: true,
  })
  @IsEnum(SortingFieldEnum)
  sortingField?: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsEnum(SortingDirectionEnum)
  sortingDirection?: SortingDirectionEnum;

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

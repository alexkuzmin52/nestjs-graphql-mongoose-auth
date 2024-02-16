import { Field, GraphQLISODateTime, InputType } from "@nestjs/graphql";
import { IsDate, IsString } from "class-validator";

@InputType()
export class DateTimeTestInput {
  @Field(() => String)
  @IsString()
  date_test: string;
}

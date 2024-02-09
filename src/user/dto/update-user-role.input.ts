import { Field, InputType } from "@nestjs/graphql";
import { UserRoleEnum } from "../../constants";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

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

import { Field, InputType } from "@nestjs/graphql";
import { UserStatusEnum } from "../../constants";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

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

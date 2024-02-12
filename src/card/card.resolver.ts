import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardService } from './card.service';
import { Card } from './schemas/card.schema';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../guards/gql-jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/user-roles.decorator';
import { UserRoleEnum } from '../constants';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../user/schemas/user.schema';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';

@Resolver()
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Query(() => [Card], { name: 'cards' })
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.USER)
  async userCards(@CurrentUser() user: User): Promise<Card[]> {
    return await this.cardService.getAllUserCards(user);
  }

  @Mutation(() => Card)
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.USER)
  async create(
    @CurrentUser() user: User,
    @Args('create_card') create_card: CreateCardInput,
  ): Promise<Card> {
    return await this.cardService.createUserCard(user, create_card);
  }

  @Mutation(() => Card)
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.USER)
  async update(
    @Args('update_card') update_card: UpdateCardInput,
    @Args('card_id') card_id: string,
  ): Promise<Card> {
    return await this.cardService.updateUserCard(card_id, update_card);
  }

  @Mutation(() => Card)
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.USER)
  async delete(
    @Args('card_id') card_id: string,
  ): Promise<Card> {
    return await this.cardService.deleteUserCard(card_id);
  }
}

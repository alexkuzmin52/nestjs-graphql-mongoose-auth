import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Card } from './schemas/card.schema';
import { CardService } from './card.service';
import { CreateCardInput } from './dto/create-card.input';
import { CurrentUser } from '../decorators/user.decorator';
import { FilterCardArgs } from './types/filter-card.args';
import { GqlJwtAuthGuard } from '../guards/gql-jwt-auth.guard';
import { Roles } from '../decorators/user-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { UpdateCardArgs } from './types/update-card.args';
import { UseGuards } from '@nestjs/common';
import { User } from '../user/schemas/user.schema';
import { UserRoleEnum } from '../constants';

@Resolver()
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Query(() => [Card], { name: 'cards' })
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.USER)
  async userCards(@CurrentUser() user: User): Promise<Card[]> {
    return await this.cardService.getAllUserCards(user);
  }

  @Query(() => [Card], { name: 'filter_card' })
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.USER)
  async userFilterCards(@CurrentUser() user: User, @Args() args: FilterCardArgs): Promise<Card[]> {
    console.log('args :', args);
    return await this.cardService.getFilterUserCards(user, args);
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
  async update(@Args() updateCard: UpdateCardArgs): Promise<Card> {
    return await this.cardService.updateUserCard(updateCard);
  }

  @Mutation(() => Card)
  @UseGuards(GqlJwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.USER)
  async delete(@Args('card_id') card_id: string): Promise<Card> {
    return await this.cardService.deleteUserCard(card_id);
  }
}

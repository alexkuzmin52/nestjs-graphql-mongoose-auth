import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Card, CardType } from './schemas/card.schema';
import { CreateCardInput } from './dto/create-card.input';
import { FilterCardArgs } from './types/filter-card.args';
import { Model } from 'mongoose';
import { UpdateCardArgs } from './types/update-card.args';
import { User } from '../user/schemas/user.schema';
import { addDays } from '../helpers/add-days.helper';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardType>,
  ) {}

  async getAllUserCards(user: User): Promise<Card[]> {
    const userCards = await this.cardModel.find({ userId: user._id }).exec();
    return userCards;
  }

  async createUserCard(
    user: User,
    create_card: CreateCardInput,
  ): Promise<Card> {
    const today = new Date();
    const initDeadLine = addDays(today, 1);
    const newCard = new this.cardModel({
      ...create_card,
      userId: user._id,
      deadline: initDeadLine,
    });
    return newCard.save();
  }

  async updateUserCard(updateCard: UpdateCardArgs): Promise<Card> {
    const { cardId, ...update } = updateCard;
    const updatedCard = await this.cardModel
      .findByIdAndUpdate(cardId, update, { new: true })
      .exec();
    if (!updatedCard) throw new NotFoundException();
    return updatedCard;
  }

  async deleteUserCard(card_id: string): Promise<Card> {
    const deletedCard = await this.cardModel.findByIdAndDelete(card_id).exec();
    return deletedCard;
  }

  async getFilterUserCards(user: User, args: FilterCardArgs): Promise<Card[]> {
    const {
      limit,
      page,
      minCounter,
      maxCounter,
      minFailed,
      maxFailed,
      sortingField,
      sortingDirection,
      ...rest
    } = args;

    const skip = limit * (page - 1);
    const counter = { $gte: minCounter, $lte: maxCounter };
    const failed = { $gte: minFailed, $lte: maxFailed };
    const filter = { ...rest, userId: user._id, counter, failed };

    const filteredCards = await this.cardModel
      .find(filter)
      .sort([[sortingField, sortingDirection]])
      .skip(skip)
      .limit(limit)
      .exec();
    return filteredCards;
  }

}

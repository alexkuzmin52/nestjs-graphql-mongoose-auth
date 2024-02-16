import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Card, CardType } from './schemas/card.schema';
import { CreateCardInput } from './dto/create-card.input';
import { FilterCardArgs } from './types/filter-card.args';
import { Model } from 'mongoose';
import { UpdateCardArgs } from './types/update-card.args';
import { User } from '../user/schemas/user.schema';
import { addDays } from '../helpers/add-days.helper';
import { AnswerFrontSideArgs } from './types/answer-front-side.args';
import { checkUserAnswer } from 'src/helpers/check-user-answer';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardType>,
  ) {
  }

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

  // *******************************************************************
  async testingDate(test_date: string): Promise<Date> {
    console.log(test_date);
    const inputDate = new Date();
    console.log('inputDate ----- :', inputDate);
    const inputDate1 = new Date(inputDate);
    inputDate1.setDate(inputDate1.getDate() + 1);
    console.log('inputDate1 ----- :', inputDate1);
    const inputDate_2 = new Date(inputDate);
    inputDate_2.setDate(inputDate_2.getDate() - 1);
    console.log('inputDate_2 ----- :', inputDate_2);
    const different = inputDate.getDate() - inputDate_2.getDate();
    const test = inputDate.getDate() > (inputDate_2.getDate() + 1);
    console.log('different ----- :', different);
    console.log('test ----- :', test);
    const date = inputDate.getDate();
    const date_2 = inputDate_2.getDate();
    console.log('date ----- :', date);
    console.log('date_2 ----- :', date_2);

    return inputDate_2;
  }


  async checkUserAnswerFrontSide(args: AnswerFrontSideArgs, user: User): Promise<boolean> {
    const { cardId, answer } = args;
    const card = await this.cardModel.findById(cardId).exec();
    if (!card) throw new NotFoundException(`Card with ID ${cardId} not found`);
    console.log('card ***** :', card);
    const checkAnswer = card.front_side == answer;
    const updatedCard = checkUserAnswer(card, checkAnswer);
    console.log('updatedCard ***** :', updatedCard);
    return true;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardType } from './schemas/card.schema';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { CreateCardInput } from './dto/create-card.input';
import { addDays } from '../helpers/add-days.helper';
import { UpdateCardInput } from './dto/update-card.input';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardType>,
  ) {}

  async getAllUserCards(user: User): Promise<Card[]> {
    // console.log(user);
    const userCards = await this.cardModel.find({ userId: user._id }).exec();
    // console.log(userCards);
    return userCards;
  }

  async createUserCard(
    user: User,
    create_card: CreateCardInput,
  ): Promise<Card> {
    const today = new Date();
    const initDeadLine = addDays(today, 1);
    // console.log('initDeadLine', initDeadLine);
    const newCard = new this.cardModel({
      ...create_card,
      userId: user._id,
      deadline: initDeadLine,
    });
    return newCard.save();
  }

  async updateUserCard(
    cardId: string,
    update_card: UpdateCardInput,
  ): Promise<Card> {
    console.log(update_card);
    console.log(cardId);
    const updatedCard = await this.cardModel
      .findByIdAndUpdate(cardId, update_card, { new: true })
      .exec();
    console.log(updatedCard);
    if (!updatedCard) throw new NotFoundException();
    return updatedCard;
  }

  async deleteUserCard(card_id: string): Promise<Card> {
    const deletedCard = await this.cardModel.findByIdAndDelete(card_id).exec();
    console.log(deletedCard);
    return deletedCard;
  }
}

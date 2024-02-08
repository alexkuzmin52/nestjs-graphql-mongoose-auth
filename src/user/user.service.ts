import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserType } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserType>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find({}).exec();
  }

  async getUserById(_id: string): Promise<User> {
    const user = await this.userModel.findById(_id).exec();
    // console.log(user);
    return user;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    // console.log(createdUser);
    return createdUser.save();
  }

  async updateUser(userId: string, upload: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, upload, { new: true })
      .exec();
    // console.log(updatedUser);
    return updatedUser;
  }

  async findUserByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email }).exec();
  }
}

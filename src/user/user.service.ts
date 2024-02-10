import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserRoleInput } from './dto/update-user-role.input';
import { UpdateUserStatusInput } from './dto/update-user-status.input';
import { User, UserType } from './schemas/user.schema';

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
    return user;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async updateUser(userId: string, upload: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, upload, { new: true })
      .exec();
    return updatedUser;
  }

  async findUserByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email }).exec();
  }

  async updateUserStatus(update_status: UpdateUserStatusInput): Promise<User> {
    const { userId, status } = update_status;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { status },
      { new: true },
    );
    return updatedUser;
  }

  async updateUserRole(update_role: UpdateUserRoleInput): Promise<User> {
    const { userId, role } = update_role;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true },
    );
    return updatedUser;
  }
}

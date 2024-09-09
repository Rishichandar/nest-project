import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginRegisterService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async register(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

    // Fetch all users from the database
    async getAllUsers() {
      return this.userModel.find().exec();
    }

    async resetPassword(email: string, newPassword: string) {
      const user = await this.userModel.findOne({ email });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Validate new password if needed (e.g., length, complexity)
      if (newPassword.length < 6) {
        throw new BadRequestException('Password is too short');
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userModel.updateOne({ email }, { $set: { password: hashedPassword } });
      
      return { message: 'Password changed successfully' };
    }
  }



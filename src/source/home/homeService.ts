import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home, HomeSchema } from './homeSchema';

@Injectable()
export class HomeService {
  constructor(@InjectModel('Home') private readonly homeModel: Model<Home>) {}

  async createOrUpdateHome(data: Partial<Home>): Promise<Home> {
    try {
      const updateData: Partial<Home> = {};

      if (data.features) updateData['features'] = data.features;
      if (data.data) updateData['data'] = data.data;
      if (data.brands) updateData['brands'] = data.brands;
      if (data.customerReviews) updateData['customerReviews'] = data.customerReviews;
      if (data.questions) updateData['questions'] = data.questions;
      if (data.logos) updateData['logos'] = data.logos;
      if (data.contentArray) updateData['contentArray'] = data.contentArray;
      if (data.tagline) updateData['tagline'] = data.tagline;

      if (Object.keys(updateData).length === 0) {
        throw new Error('No data to update');
      }

      const result = await this.homeModel.findOneAndUpdate(
        {},
        updateData,
        { upsert: true, new: true }
      );

      return result;
    } catch (error) {
      throw new Error('Error creating or updating Home document: ' + error.message);
    }
  }

  async getHome(): Promise<Home[]> {
    return this.homeModel.find({ deletedAt: { $exists: false } }).exec();
  }

  async updateHome(id: string, type: string, subDocId: string, data: any): Promise<Home> {
    const query = { _id: id, [`${type}._id`]: subDocId };
    const update = { $set: { [`${type}.$`]: { ...data, _id: subDocId } } };
    const home = await this.homeModel.findOneAndUpdate(query, update, { new: true }).exec();
    if (!home) throw new NotFoundException(`${type} not found`);
    return home;
  }

  async softDeleteHome(id: string): Promise<Home> {
    const update = { $set: { deletedAt: new Date() } };
    const home = await this.homeModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
    if (!home) throw new NotFoundException('Document not found');
    return home;
  }

  async deleteSubDocPermanently(id: string, type: string, subDocId: string): Promise<Home> {
    const update = { $pull: { [type]: { _id: subDocId } } };
    const home = await this.homeModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
    if (!home) throw new NotFoundException(`${type} not found`);
    return home;
  }
}

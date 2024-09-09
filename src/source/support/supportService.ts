import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Support } from './supportSchema';

@Injectable()
export class SupportService {
  constructor(@InjectModel('Support') private readonly supportModel: Model<Support>) {}

  async createOrUpdateSupport(data: Partial<Support>): Promise<Support> {
    try {
      const updateData: Partial<Support> = {};

      if (data.Helpdata) updateData['Helpdata'] = data.Helpdata;
      if (data.Kindofhelp) updateData['Kindofhelp'] = data.Kindofhelp;

      if (Object.keys(updateData).length === 0) {
        throw new Error('No data to update');
      }

      const result = await this.supportModel.findOneAndUpdate(
        {},
        updateData,
        { upsert: true, new: true }
      ).exec();

      return result;
    } catch (error) {
      throw new Error('Error creating or updating Support document: ' + error.message);
    }
  }

  async getSupport(): Promise<Support[]> {
    return this.supportModel.find({ deletedAt: { $exists: false } }).exec();
  }

  async updateSupport(id: string, type: string, subDocId: string, data: any): Promise<Support> {
    const query = { _id: id, [`${type}._id`]: subDocId };
    const update = { $set: { [`${type}.$`]: { ...data, _id: subDocId } } };
    const support = await this.supportModel.findOneAndUpdate(query, update, { new: true }).exec();
    if (!support) throw new NotFoundException(`${type} not found`);
    return support;
  }

  async softDeleteSupport(id: string): Promise<Support> {
    const update = { $set: { deletedAt: new Date() } };
    const support = await this.supportModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
    if (!support) throw new NotFoundException('Document not found');
    return support;
  }

  async deleteSubDocPermanently(id: string, type: string, subDocId: string): Promise<Support> {
    const update = { $pull: { [type]: { _id: subDocId } } };
    const support = await this.supportModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
    if (!support) throw new NotFoundException(`${type} not found`);
    return support;
  }
}

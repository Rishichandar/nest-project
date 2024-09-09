
// src/about/about.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About, AboutDocument } from './aboutSchema'; // Ensure the path is correct

@Injectable()
export class AboutService {
  constructor(@InjectModel(About.name) private aboutModel: Model<AboutDocument>) {}

  async createOrUpdateAbout(data: any): Promise<About> {
    const updateData = {};

    if (data.contacts) {
      updateData['contacts'] = data.contacts;
    }
    if (data.aboutContents) {
      updateData['aboutContents'] = data.aboutContents;
    }

    if (Object.keys(updateData).length === 0) {
      throw new NotFoundException('No data to update');
    }

    return this.aboutModel.findOneAndUpdate({}, updateData, {
      upsert: true,
      new: true,
    }).exec(); // Use findOneAndUpdate to get the updated document
  }

  async getAbout(): Promise<About[]> {
    return this.aboutModel.find({ deletedAt: { $exists: false } }).exec();
  }

  async updateAbout(id: string, type: string, subDocId: string, data: any): Promise<About> {
    const query = { _id: id, [`${type}._id`]: subDocId };
    const update = { $set: { [`${type}.$`]: { ...data, _id: subDocId } } };
    const about = await this.aboutModel.findOneAndUpdate(query, update, { new: true }).exec();

    if (!about) {
      throw new NotFoundException(`${type} not found`);
    }

    return about;
  }

  async softDeleteAbout(id: string): Promise<About> {
    const update = { $set: { deletedAt: new Date() } };
    const about = await this.aboutModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();

    if (!about) {
      throw new NotFoundException('Document not found');
    }

    return about;
  }

  async deleteSubDocPermanently(id: string, type: string, subDocId: string): Promise<About> {
    const update = { $pull: { [type]: { _id: subDocId } } };
    const about = await this.aboutModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();

    if (!about) {
      throw new NotFoundException(`${type} not found`);
    }

    return about;
  }
}

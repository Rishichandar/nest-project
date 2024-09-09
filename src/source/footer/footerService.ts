// footer.service.ts

import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Footer } from './footerSchema';

@Injectable()
export class FooterService {
    constructor(@InjectModel(Footer.name) private footerModel: Model<Footer>) { }

    async createOrUpdateFooter(data: any): Promise<Footer> {
        try {
          if (!data || !Array.isArray(data.footerData)) {
            throw new BadRequestException('Invalid data format');
          }
      
          const updateData = { footerData: data.footerData };
      
          const result = await this.footerModel.findOneAndUpdate({}, updateData, {
            upsert: true,
            new: true,
          });
      
          if (!result) {
            throw new NotFoundException('Footer not found');
          }
      
          return result;
        } catch (error) {
          console.error('Error in createOrUpdateFooter:', error.message);
          throw new Error('Failed to create or update footer');
        }
      }
      

    // Get all footers excluding deleted
    async getFooters(): Promise<Footer[]> {
        return this.footerModel.find({ deletedAt: { $exists: false } }).exec();
    }

    // Get active footers
    async getActiveFooters(): Promise<Footer[]> {
        return this.footerModel.find({ deletedAt: { $exists: false } }).exec();
    }

    // Update specific sub-document in footer
    async updateFooter(id: string, type: string, subDocId: string, data: any): Promise<Footer> {
        const query = { _id: id, [`${type}._id`]: subDocId };
        const update = { $set: { [`${type}.$`]: { ...data, _id: subDocId } } };

        const footer = await this.footerModel.findOneAndUpdate(query, update, { new: true });
        if (!footer) {
            throw new NotFoundException(`${type} not found`);
        }

        return footer;
    }

    // Soft delete the footer document
    async softDeleteFooter(id: string): Promise<Footer> {
        const footer = await this.footerModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
        if (!footer) {
            throw new NotFoundException('Document not found');
        }
        return footer;
    }

    // Permanently delete a sub-document from the footer
    async deleteSubDocPermanently(id: string, type: string, subDocId: string): Promise<Footer> {
        const update = { $pull: { [type]: { _id: subDocId } } };
        const footer = await this.footerModel.findByIdAndUpdate(id, update, { new: true });

        if (!footer) {
            throw new NotFoundException(`${type} not found`);
        }

        return footer;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Navbar } from './navbarSchema';

@Injectable()
export class NavbarService {
  constructor(@InjectModel('Navbar') private readonly navbarModel: Model<Navbar>) {}

  async createOrUpdateNavbar(data: Partial<Navbar>): Promise<Navbar> {
    try {
      const updateData: Partial<Navbar> = {};

      if (data.navbarItems) updateData['navbarItems'] = data.navbarItems;
      if (data.companyDropdownItems) updateData['companyDropdownItems'] = data.companyDropdownItems;

      if (Object.keys(updateData).length === 0) {
        throw new Error('No data to update');
      }

      const result = await this.navbarModel.findOneAndUpdate(
        {},
        updateData,
        { upsert: true, new: true }
      ).exec();

      return result;
    } catch (error) {
      throw new Error('Error creating or updating Navbar document: ' + error.message);
    }
  }

  async getNavbar(): Promise<Navbar[]> {
    return this.navbarModel.find({ deletedAt: { $exists: false } }).exec();
  }

  async updateNavbar(id: string, type: string, subDocId: string, data: any): Promise<Navbar> {
    const query = { _id: id, [`${type}._id`]: subDocId };
    const update = { $set: { [`${type}.$`]: { ...data, _id: subDocId } } };
    const navbar = await this.navbarModel.findOneAndUpdate(query, update, { new: true }).exec();
    if (!navbar) throw new NotFoundException(`${type} not found`);
    return navbar;
  }

  async softDeleteNavbar(id: string): Promise<Navbar> {
    const update = { $set: { deletedAt: new Date() } };
    const navbar = await this.navbarModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
    if (!navbar) throw new NotFoundException('Document not found');
    return navbar;
  }

  async deleteSubDocPermanently(id: string, type: string, subDocId: string): Promise<Navbar> {
    const update = { $pull: { [type]: { _id: subDocId } } };
    const navbar = await this.navbarModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
    if (!navbar) throw new NotFoundException(`${type} not found`);
    return navbar;
  }
}

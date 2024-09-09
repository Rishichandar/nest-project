import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Career } from './careerSchema';

@Injectable()
export class CareerService {
    constructor(@InjectModel('Career') private careerModel: Model<Career>) {}

    async createOrUpdateCareer(data: any): Promise<Career> {
        const updateData = {};

        if (data.Wherewework) {
            updateData['Wherewework'] = data.Wherewework;
        }
        if (data.corevalueicon) {
            updateData['corevalueicon'] = data.corevalueicon;
        }
        if (data.Activities) {
            updateData['Activities'] = data.Activities;
        }
        if (data.Openposition) {
            updateData['Openposition'] = data.Openposition;
        }

        // If no valid data is provided, throw an error
        if (Object.keys(updateData).length === 0) {
            throw new Error('No data to update');
        }

        return this.careerModel.findOneAndUpdate({}, updateData, { upsert: true, new: true });
    }

    async getCareer(): Promise<Career[]> {
        return this.careerModel.find({ deletedAt: { $exists: false } }).exec();
    }

    async updateCareer(id: string, type: string, subDocId: string, data: any): Promise<Career> {
        const query = { _id: id, [`${type}._id`]: subDocId };
        const update = { $set: { [`${type}.$`]: { ...data, _id: subDocId } } };
        const career = await this.careerModel.findOneAndUpdate(query, update, { new: true }).exec();

        if (!career) {
            throw new NotFoundException(`${type} not found`);
        }
        return career;
    }

    async softDeleteCareer(id: string): Promise<Career> {
        const career = await this.careerModel.findOneAndUpdate({ _id: id }, { $set: { deletedAt: new Date() } }, { new: true });
        if (!career) {
            throw new NotFoundException('Career document not found');
        }
        return career;
    }

    async deleteSubDocPermanently(id: string, type: string, subDocId: string): Promise<Career> {
        const update = { $pull: { [type]: { _id: subDocId } } };
        const career = await this.careerModel.findOneAndUpdate({ _id: id }, update, { new: true });
        if (!career) {
            throw new NotFoundException(`${type} not found`);
        }
        return career;
    }
}

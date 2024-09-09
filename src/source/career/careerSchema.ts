import { Schema, Document } from 'mongoose';

const weworkSchema = new Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    about: { type: String, required: true }
});

const valueiconSchema = new Schema({
    icon: { type: String, required: true },
    Text: { type: String, required: true }
});

const activitiesSchema = new Schema({
    Activity: { type: String, required: true }
});

const positionSchema = new Schema({
    img: { type: String, required: true },
    title: { type: String, required: true }
});

export const CareerSchema = new Schema(
    {
        Wherewework: [weworkSchema],
        corevalueicon: [valueiconSchema],
        Activities: [activitiesSchema],
        Openposition: [positionSchema],
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

export interface Career extends Document {
    Wherewework: Array<any>;
    corevalueicon: Array<any>;
    Activities: Array<any>;
    Openposition: Array<any>;
    deletedAt: Date | null;
}

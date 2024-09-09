import { Schema, Document } from 'mongoose';

export interface Help {
  img: string;
  title: string;
  about: string;
  buttonText: string;
}

export interface Kind {
  img: string;
  title: string;
  about: string;
  buttonText: string;
}

export interface Support extends Document {
  Helpdata: Help[];
  Kindofhelp: Kind[];
  deletedAt?: Date;
}

export const SupportSchema = new Schema({
  Helpdata: [{
    img: { type: String, required: true },
    title: { type: String, required: true },
    about: { type: String, required: true },
    buttonText: { type: String, required: true },
  }],
  Kindofhelp: [{
    img: { type: String, required: true },
    title: { type: String, required: true },
    about: { type: String, required: true },
    buttonText: { type: String, required: true },
  }],
  deletedAt: { type: Date },
}, { timestamps: true });

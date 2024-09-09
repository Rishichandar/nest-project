
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema({ timestamps: true })
export class ContactDetails {
  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;
}

@Schema({ timestamps: true })
export class AboutContentDetails {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  content: string;
}

@Schema({ timestamps: true })
export class About {
  @Prop({ type: [ContactDetails], required: true })
  contacts: ContactDetails[];

  @Prop({ type: [AboutContentDetails], required: true })
  aboutContents: AboutContentDetails[];

  @Prop({ type: Date })
  deletedAt: Date;
}

export const AboutSchema = SchemaFactory.createForClass(About);

// footer.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Footer extends Document {
  @Prop({
    type: [{ heading: { type: String, required: true }, items: [{ type: String, required: true }] }],
    required: true,
  })
  footerData: Array<{ heading: string; items: string[] }>;

  @Prop({ type: Date })
  deletedAt: Date;
}

export const FooterSchema = SchemaFactory.createForClass(Footer);

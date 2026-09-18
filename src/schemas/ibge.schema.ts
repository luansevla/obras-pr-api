import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IbgeDocument = Ibge & Document;

@Schema({ _id: false })
export class Ibge {
  @Prop({ type: String, trim: true })
  city?: string;

  @Prop({ type: String, trim: true })
  state?: string;
}

export const IbgeSchema = SchemaFactory.createForClass(Ibge);
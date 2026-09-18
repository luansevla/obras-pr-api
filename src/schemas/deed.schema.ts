import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeedDocument = Deed & Document;

@Schema({ _id: false })
export class Deed {
  @Prop({ type: String, trim: true })
  office?: string;

  @Prop({ type: [String] })
  registries?: string[];

  @Prop({ type: String, trim: true })
  book?: string;
}

export const DeedSchema = SchemaFactory.createForClass(Deed);
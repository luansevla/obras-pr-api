import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoordinateDocument = Coordinate & Document;

@Schema({ _id: false })
export class Coordinate {
  @Prop({ type: Number })
  longitude?: number;

  @Prop({ type: Number })
  latitude?: number;
}

export const CoordinateSchema = SchemaFactory.createForClass(Coordinate);
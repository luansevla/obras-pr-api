import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
    @Prop({ type: Number })
    latitude?: number;

    @Prop({ type: Number })
    longitude?: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);


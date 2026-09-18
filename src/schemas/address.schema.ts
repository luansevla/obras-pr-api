import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Location, LocationSchema } from './location.schema';
import { Ibge, IbgeSchema } from './ibge.schema';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true })
export class Address extends Document {
    @Prop({ type: String, trim: true })
    cep?: string;

    @Prop({ type: String, uppercase: true, trim: true })
    state?: string;

    @Prop({ type: String, trim: true })
    detail?: string;

    @Prop({ type: String, trim: true })
    city?: string;

    @Prop({ type: String, trim: true })
    neighborhood?: string;

    @Prop({ type: String, trim: true })
    street?: string;

    @Prop({ type: String, trim: true })
    timezoneName?: string;

    @Prop({ type: LocationSchema })
    location?: Location;

    @Prop({ type: IbgeSchema })
    ibge?: Ibge;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
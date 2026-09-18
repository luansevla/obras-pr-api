import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AgencySchema, Agency } from './agency.schema';
import { DeedSchema, Deed } from './deed.schema';
import { Address, AddressSchema } from './address.schema';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({ type: String, trim: true, unique: true, sparse: true })
  cpe?: string;

  @Prop({ type: String, trim: true })
  type?: string;

  @Prop({ type: AddressSchema })
  address?: Address;

  @Prop({ type: String, trim: true })
  administration?: string;

  @Prop({ type: String, trim: true })
  classification?: string;

  @Prop({ type: String, trim: true })
  owner?: string;

  @Prop({ type: String, trim: true })
  land?: string;

  @Prop({ type: String, trim: true })
  own?: string;

  @Prop({ type: AgencySchema })
  agencyOwner?: Agency;

  @Prop({ type: AgencySchema })
  agencyOccupant?: Agency;

  @Prop({ type: String, trim: true })
  observations?: string;

  @Prop({ type: String, trim: true })
  registryStatus?: string;

  @Prop({ type: DeedSchema })
  deed?: Deed;

  @Prop({ type: Date })
  incorporationDate?: Date;

  @Prop({ type: String, trim: true })
  incorporationType?: string;

  @Prop({ type: Number })
  totalArea?: number;

  @Prop({ type: Number })
  buildings?: number;

  @Prop({ type: Number })
  buildingsTotalArea?: number;

  @Prop({ type: Number })
  value?: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
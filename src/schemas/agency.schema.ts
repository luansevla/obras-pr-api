import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AddressSchema, Address } from './address.schema';

export type AgencyDocument = Agency & Document;

@Schema({ timestamps: true })
export class Agency {
  @Prop({ type: String, trim: true, unique: true, sparse: true })
  cnpj?: string;

  @Prop({ type: String, trim: true })
  registeredName?: string;

  @Prop({ type: String, trim: true })
  tradeName?: string;

  @Prop({ type: AddressSchema })
  address?: Address;

  @Prop({ type: String, trim: true, default: 'ACTIVE' })
  status?: string;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
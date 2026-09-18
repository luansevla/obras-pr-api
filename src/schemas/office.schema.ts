// src/modules/offices/schemas/office.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { City } from './city.schema';

export type OfficeDocument = HydratedDocument<Office>;

@Schema({ _id: false })
export class Address {
  @Prop({ required: false })
  street?: string;

  @Prop({ required: false })
  number?: string;

  @Prop({ required: false })
  neighborhood?: string;

  @Prop({ required: false })
  zipCode?: string;
}

@Schema({ timestamps: true, collection: 'offices' })
export class Office {
  @ApiPropertyOptional({ example: '65f1a2b3c4d5e6f7a8b9c0d1' })
  _id?: string;

  @ApiPropertyOptional({ example: 'Escritório Regional Sul' })
  @Prop({ required: false, trim: true })
  name?: string;

  @ApiPropertyOptional({ type: Address })
  @Prop({ type: Address, required: false })
  address?: Address;

  @ApiPropertyOptional({ example: 'OFF-SUL' })
  @Prop({ required: false, uppercase: true, trim: true })
  sigla?: string;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @Prop({ required: false, default: 'ACTIVE' })
  status?: string;

  @ApiPropertyOptional({ example: 'Carlos Eduardo' })
  @Prop({ required: false, trim: true })
  managerName?: string;

  @ApiPropertyOptional({ example: '41988887777' })
  @Prop({ required: false, trim: true })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'Curitiba' })
  @Prop({ required: false, trim: true })
  city?: string;

  @ApiPropertyOptional({ example: '4106902' })
  @Prop({ required: false })
  cityId?: string;

  @ApiPropertyOptional({ type: () => [City] })
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'City' }],
    default: [],
  })
  cities?: City[];
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
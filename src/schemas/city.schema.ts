import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CityDocument = HydratedDocument<City>;

@Schema({ timestamps: true, collection: 'cities' })
export class City {
  @ApiProperty({ example: 4100103 })
  @Prop({ type: Number, required: true, unique: true })
  id?: number;

  @ApiProperty({ example: 'Abatiá' })
  @Prop({ required: true, index: true })
  nome?: string;

  @ApiProperty({ type: Object })
  @Prop({ type: Object, required: true })
  microrregiao?: Record<string, any>;

  @ApiProperty({ type: Object })
  @Prop({ type: Object, required: true })
  'regiao-imediata'?: Record<string, any>;
}

export const CitySchema = SchemaFactory.createForClass(City);
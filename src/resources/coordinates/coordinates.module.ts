import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coordinate, CoordinateSchema } from 'src/schemas/coordinates.schema';
import { CoordinatesController } from './coordinates.controller';
import { CoordinatesService } from './coordinates.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coordinate.name, schema: CoordinateSchema }]),
  ],
  controllers: [CoordinatesController],
  providers: [CoordinatesService],
  exports: [CoordinatesService, MongooseModule],
})
export class CoordinatesModule { }
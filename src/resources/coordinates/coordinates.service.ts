import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coordinate, CoordinateDocument } from 'src/schemas/coordinates.schema';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectModel(Coordinate.name) private readonly coordinateModel: Model<CoordinateDocument>,
  ) {}

  async create(createCoordinateDto: Partial<Coordinate>): Promise<Coordinate> {
    const createdCoordinate = new this.coordinateModel(createCoordinateDto);
    return createdCoordinate.save();
  }

  async findAll(): Promise<Coordinate[]> {
    return this.coordinateModel.find().exec();
  }

  async findOne(id: string): Promise<Coordinate> {
    const coordinate = await this.coordinateModel.findById(id).exec();
    if (!coordinate) {
      throw new NotFoundException(`Coordinate with ID ${id} not found`);
    }
    return coordinate;
  }

  async update(id: string, updateCoordinateDto: Partial<Coordinate>): Promise<Coordinate> {
    const updatedCoordinate = await this.coordinateModel
      .findByIdAndUpdate(id, updateCoordinateDto, { new: true })
      .exec();
    
    if (!updatedCoordinate) {
      throw new NotFoundException(`Coordinate with ID ${id} not found for update`);
    }
    return updatedCoordinate;
  }

  async remove(id: string): Promise<void> {
    const result = await this.coordinateModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Coordinate with ID ${id} not found for deletion`);
    }
  }
}
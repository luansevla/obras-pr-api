import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationDocument } from 'src/schemas/location.schema';
import { Location } from 'src/schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<CreateLocationDto> {
    const createdLocation = new this.locationModel(createLocationDto);
    return createdLocation.save() as unknown as CreateLocationDto;
  }

  async findAll(): Promise<CreateLocationDto[]> {
    return this.locationModel.find().exec() as unknown as CreateLocationDto[];
  }

  async findOne(id: string): Promise<CreateLocationDto> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location as CreateLocationDto;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const updatedLocation = await this.locationModel
      .findByIdAndUpdate(id, updateLocationDto, { new: true })
      .exec();
    
    if (!updatedLocation) {
      throw new NotFoundException(`Location with ID ${id} not found for update`);
    }
    return updatedLocation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.locationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Location with ID ${id} not found for deletion`);
    }
  }
}
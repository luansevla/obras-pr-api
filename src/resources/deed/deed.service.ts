import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deed, DeedDocument } from 'src/schemas/deed.schema';

@Injectable()
export class DeedService {
  constructor(
    @InjectModel(Deed.name) private readonly deedModel: Model<DeedDocument>,
  ) {}

  async create(createDeedDto: Partial<Deed>): Promise<Deed> {
    const createdDeed = new this.deedModel(createDeedDto);
    return createdDeed.save();
  }

  async findAll(): Promise<Deed[]> {
    return this.deedModel.find().exec();
  }

  async findOne(id: string): Promise<Deed> {
    const deed = await this.deedModel.findById(id).exec();
    if (!deed) {
      throw new NotFoundException(`Deed with ID ${id} not found`);
    }
    return deed;
  }

  async update(id: string, updateDeedDto: Partial<Deed>): Promise<Deed> {
    const updatedDeed = await this.deedModel
      .findByIdAndUpdate(id, updateDeedDto, { new: true })
      .exec();
    
    if (!updatedDeed) {
      throw new NotFoundException(`Deed with ID ${id} not found for update`);
    }
    return updatedDeed;
  }

  async remove(id: string): Promise<void> {
    const result = await this.deedModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Deed with ID ${id} not found for deletion`);
    }
  }
}
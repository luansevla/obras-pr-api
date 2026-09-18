import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ibge, IbgeDocument } from 'src/schemas/ibge.schema';

@Injectable()
export class IbgeService {
  constructor(
    @InjectModel(Ibge.name) private readonly ibgeModel: Model<IbgeDocument>,
  ) { }

  async create(createIbgeDto: Partial<Ibge>): Promise<Ibge> {
    const createdIbge = new this.ibgeModel(createIbgeDto);
    return createdIbge.save();
  }

  async findAll(): Promise<Ibge[]> {
    return this.ibgeModel.find().exec();
  }

  async findOne(id: string): Promise<Ibge> {
    const ibge = await this.ibgeModel.findById(id).exec();
    if (!ibge) {
      throw new NotFoundException(`Ibge with ID ${id} not found`);
    }
    return ibge;
  }

  async update(id: string, updateIbgeDto: Partial<Ibge>): Promise<Ibge> {
    const updatedIbge = await this.ibgeModel
      .findByIdAndUpdate(id, updateIbgeDto, { new: true })
      .exec();

    if (!updatedIbge) {
      throw new NotFoundException(`Ibge with ID ${id} not found for update`);
    }
    return updatedIbge;
  }

  async remove(id: string): Promise<void> {
    const result = await this.ibgeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Ibge with ID ${id} not found for deletion`);
    }
  }
}
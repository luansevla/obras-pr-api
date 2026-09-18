import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency, AgencyDocument } from 'src/schemas/agency.schema';

@Injectable()
export class AgencyService {
  constructor(
    @InjectModel(Agency.name) private readonly agencyModel: Model<AgencyDocument>,
  ) {}

  async create(createAgencyDto: Partial<Agency>): Promise<Agency> {
    const createdAgency = new this.agencyModel(createAgencyDto);
    return createdAgency.save();
  }

  async findAll(): Promise<Agency[]> {
    return this.agencyModel.find().exec();
  }

  async findOne(id: string): Promise<Agency> {
    const agency = await this.agencyModel.findById(id).exec();
    if (!agency) {
      throw new NotFoundException(`Agency with ID ${id} not found`);
    }
    return agency;
  }

  async update(id: string, updateAgencyDto: Partial<Agency>): Promise<Agency> {
    const updatedAgency = await this.agencyModel
      .findByIdAndUpdate(id, updateAgencyDto, { new: true })
      .exec();
    
    if (!updatedAgency) {
      throw new NotFoundException(`Agency with ID ${id} not found for update`);
    }
    return updatedAgency;
  }

  async remove(id: string): Promise<void> {
    const result = await this.agencyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Agency with ID ${id} not found for deletion`);
    }
  }
}
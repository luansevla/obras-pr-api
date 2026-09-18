import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOfficeDto } from './dto/create-office.dto';
import { Office, OfficeDocument } from 'src/schemas/office.schema';

@Injectable()
export class OfficeService {
  constructor(
    @InjectModel(Office.name) private readonly officeModel: Model<OfficeDocument>,
  ) {}

  async create(createOfficeDto: CreateOfficeDto): Promise<Office> {
    const createdOffice = new this.officeModel(createOfficeDto);
    return createdOffice.save();
  }

  async findAll(): Promise<Office[]> {
    return this.officeModel.find().populate('cities').exec();
  }

  async findById(id: string): Promise<Office> {
    const office = await this.officeModel.findById(id).populate('cities').exec();
    if (!office) {
      throw new NotFoundException(`Escritório com ID ${id} não encontrado.`);
    }
    return office;
  }

  async update(id: string, updateOfficeDto: Partial<CreateOfficeDto>): Promise<Office> {
    const updatedOffice = await this.officeModel
      .findByIdAndUpdate(id, updateOfficeDto, { new: true })
      .populate('cities')
      .exec();

    if (!updatedOffice) {
      throw new NotFoundException(`Escritório com ID ${id} não encontrado.`);
    }
    return updatedOffice;
  }

  async delete(id: string): Promise<void> {
    const result = await this.officeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Escritório com ID ${id} não encontrado.`);
    }
  }
}
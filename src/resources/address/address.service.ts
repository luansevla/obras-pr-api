import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from 'src/schemas/address.schema';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<AddressDocument>,
  ) { }

  async create(createAddressDto: Partial<CreateAddressDto>): Promise<Address> {
    const createdAddress = new this.addressModel(createAddressDto);
    return createdAddress.save();
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressModel.findById(id).exec();
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async update(id: string, updateAddressDto: Partial<Address>): Promise<Address> {
    const updatedAddress = await this.addressModel
      .findByIdAndUpdate(id, updateAddressDto, { new: true })
      .exec();

    if (!updatedAddress) {
      throw new NotFoundException(`Address with ID ${id} not found for update`);
    }
    return updatedAddress;
  }

  async remove(id: string): Promise<void> {
    const result = await this.addressModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Address with ID ${id} not found for deletion`);
    }
  }
}

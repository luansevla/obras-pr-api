import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { City, CityDocument } from 'src/schemas/city.schema';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<CityDocument>,
  ) { }

  async create(createCityDto: CreateCityDto): Promise<City> {
    const existing = await this.cityModel.findOne({ id: createCityDto.id }).exec();
    if (existing) {
      throw new ConflictException(`Cidade com id IBGE ${createCityDto.id} já está cadastrada.`);
    }
    const createdCity = new this.cityModel(createCityDto);
    return createdCity.save();
  }

  async findAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async findById(id: number): Promise<City> {
    const city = await this.cityModel.findOne({ id }).exec();
    if (!city) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada.`);
    }
    return city;
  }

  async findByUf(uf: string): Promise<City[]> {
    // Consulta interna em objeto aninhado Mongoose
    return this.cityModel
      .find({ 'microrregiao.mesorregiao.UF.sigla': uf.toUpperCase() })
      .exec();
  }
}

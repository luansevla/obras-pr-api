import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from 'src/schemas/property.schema';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyDto } from './dto/create-property.dto';

export interface CityPropertyCount {
  city: string;
  count: number;
}

export interface AgencyOwnerPropertyCount {
  agencyOwner: string;
  count: number;
}

export interface PropertyLocationDto {
  _id: string;
  own: string;
  owns: string[];
  address: {
    city: string;
    location: {
      type: string;
      coordinates: {
        longitude: string;
        latitude: string;
      };
    };
  };
}

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<PropertyDocument>,
  ) { }

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const createdProperty = new this.propertyModel(createPropertyDto);
    return createdProperty.save();
  }

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  async findCities(): Promise<string[]> {
    const rawCities = (await this.propertyModel
      .distinct('address.city')
      .exec()) as unknown[];

    return rawCities
      .filter((city): city is string => typeof city === 'string' && city.trim() !== '' && city.trim() !== '-')
      .map((city) => city.trim())
      .sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }

  async findPropertiesCountByCity(): Promise<CityPropertyCount[]> {
    return this.propertyModel
      .aggregate<CityPropertyCount>([
        {
          $match: {
            'address.city': { $exists: true, $ne: null, $nin: ['', '-'] },
          },
        },
        {
          $group: {
            _id: '$address.city',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            city: '$_id',
            count: 1,
          },
        },
        {
          $sort: { city: 1 }, // Ordena alfabeticamente pelo nome da cidade (A-Z)
        },
      ])
      .exec();
  }

  async findPropertiesCountByAgencyOwner(): Promise<AgencyOwnerPropertyCount[]> {
    return this.propertyModel
      .aggregate<AgencyOwnerPropertyCount>([
        {
          $match: {
            'agencyOwner.registeredName': {
              $exists: true,
              $ne: null,
              $nin: ['', '-'],
            },
          },
        },
        {
          $group: {
            _id: '$agencyOwner.registeredName',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            agencyOwner: '$_id',
            count: 1,
          },
        },
        {
          $sort: { agencyOwner: 1 },
        },
      ])
      .exec();
  }

  async findLocations(): Promise<PropertyLocationDto[]> {
    return this.propertyModel
      .aggregate<PropertyLocationDto>([
        {
          $match: {
            'address.location.coordinates.latitude': { $ne: null },
            'address.location.coordinates.longitude': { $ne: null },
          },
        },
        {
          $project: {
            _id: 1,
            own: 1,
            owns: {
              $cond: {
                if: { $gt: ['$own', null] },
                then: {
                  $map: {
                    input: { $split: ['$own', ','] },
                    as: 'item',
                    in: { $trim: { input: '$$item' } },
                  },
                },
                else: [],
              },
            },
            'address.city': 1,
            'address.location': 1,
          },
        },
      ])
      .exec();
  }

  async findByCity(city: string): Promise<Property[]> {
    const formattedCity = city.trim();

    // Busca insensível a maiúsculas/minúsculas (ex: "curitiba" encontra "CURITIBA")
    return this.propertyModel
      .find({
        'address.city': { $regex: new RegExp(`^${formattedCity}$`, 'i') },
      })
      .lean()
      .exec() as unknown as Property[];
  }

  async findByCpe(cpe: string): Promise<Property> {
    const cleanCpe = cpe.trim().toUpperCase();

    // Garante o formato 'CPE-XXXX' caso o usuário envie apenas os números
    const formattedCpe = cleanCpe.startsWith('CPE-')
      ? cleanCpe
      : `CPE-${cleanCpe}`;

    const property = await this.propertyModel
      .findOne({
        cpe: { $regex: new RegExp(`^${formattedCpe}$`, 'i') },
      })
      .lean()
      .exec();

    if (!property) {
      throw new NotFoundException(`Imóvel com o CPE ${cpe} não encontrado`);
    }

    return property as unknown as Property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    const updatedProperty = await this.propertyModel
      .findByIdAndUpdate(id, updatePropertyDto, { new: true })
      .exec();

    if (!updatedProperty) {
      throw new NotFoundException(`Property with ID ${id} not found for update`);
    }
    return updatedProperty;
  }

  async remove(id: string): Promise<void> {
    const result = await this.propertyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Property with ID ${id} not found for deletion`);
    }
  }
}
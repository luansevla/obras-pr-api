import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PropertyLocationDto, PropertyService } from './property.service';
import { Property } from 'src/schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo imóvel' })
  @ApiResponse({ status: 201, description: 'Imóvel criado com sucesso.', type: Property })
  @ApiBody({ type: CreatePropertyDto })
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os imóveis' })
  @ApiResponse({ status: 200, description: 'Lista de imóveis retornada com sucesso.', type: [Property] })
  async findAll(): Promise<Property[]> {
    return this.propertyService.findAll();
  }

  @Get('cities')
  async getCities(): Promise<string[]> {
    return this.propertyService.findCities();
  }

  @Get('cities/count')
  async getPropertiesCountByCity() {
    return this.propertyService.findPropertiesCountByCity();
  }

  @Get('agency-owners/count')
  async getPropertiesCountByAgencyOwner() {
    return this.propertyService.findPropertiesCountByAgencyOwner();
  }

  @Get('locations')
  async getLocations(): Promise<PropertyLocationDto[]> {
    return this.propertyService.findLocations();
  }

  @Get('city/:city')
  async findByCity(@Param('city') city: string): Promise<Property[]> {
    return this.propertyService.findByCity(city);
  }

  @Get('cpe/:cpe')
  async findByCpe(@Param('cpe') cpe: string): Promise<Property> {
    return this.propertyService.findByCpe(cpe);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um imóvel por ID' })
  @ApiResponse({ status: 200, description: 'Imóvel encontrado.', type: Property })
  async findOne(@Param('id') id: string): Promise<Property> {
    return this.propertyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um imóvel' })
  @ApiResponse({ status: 200, description: 'Imóvel atualizado com sucesso.', type: Property })
  @ApiBody({ type: CreatePropertyDto })
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: Partial<CreatePropertyDto>,
  ): Promise<Property> {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um imóvel' })
  @ApiResponse({ status: 204, description: 'Imóvel removido com sucesso.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.propertyService.remove(id);
  }
}

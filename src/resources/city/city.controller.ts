import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateCityDto } from './dto/create-city.dto';
import { CityService } from './city.service';
import { City } from 'src/schemas/city.schema';

@ApiTags('Cities')
@Controller('cities')
export class CityController {
  constructor(private readonly citiesService: CityService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova cidade no padrão IBGE' })
  @ApiResponse({ status: 201, type: City })
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as cidades ou filtra por UF' })
  @ApiQuery({ name: 'uf', required: false, example: 'PR' })
  async findAll(@Query('uf') uf?: string): Promise<City[]> {
    if (uf) {
      return this.citiesService.findByUf(uf);
    }
    return this.citiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém detalhes de uma cidade pelo código IBGE' })
  @ApiResponse({ status: 200, type: City })
  async findOne(@Param('id') id: string): Promise<City> {
    return this.citiesService.findById(+id);
  }
}

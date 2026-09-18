import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoordinatesService } from './coordinates.service';
import { Coordinate } from 'src/schemas/coordinates.schema';

@Controller('coordinates')
export class CoordinatesController {
  constructor(private readonly coordinatesService: CoordinatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCoordinateDto: Partial<Coordinate>): Promise<Coordinate> {
    return this.coordinatesService.create(createCoordinateDto);
  }

  @Get()
  async findAll(): Promise<Coordinate[]> {
    return this.coordinatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Coordinate> {
    return this.coordinatesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoordinateDto: Partial<Coordinate>,
  ): Promise<Coordinate> {
    return this.coordinatesService.update(id, updateCoordinateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.coordinatesService.remove(id);
  }
}
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLocationDto: CreateLocationDto): Promise<CreateLocationDto> {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  async findAll(): Promise<CreateLocationDto[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreateLocationDto> {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<UpdateLocationDto> {
    return this.locationService.update(id, updateLocationDto) as unknown as UpdateLocationDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.locationService.remove(id);
  }
}
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { IbgeService } from './ibge.service';
import { Ibge } from 'src/schemas/ibge.schema';

@Controller('ibge')
export class IbgeController {
  constructor(private readonly ibgeService: IbgeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createIbgeDto: Partial<Ibge>): Promise<Ibge> {
    return this.ibgeService.create(createIbgeDto);
  }

  @Get()
  async findAll(): Promise<Ibge[]> {
    return this.ibgeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ibge> {
    return this.ibgeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIbgeDto: Partial<Ibge>,
  ): Promise<Ibge> {
    return this.ibgeService.update(id, updateIbgeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.ibgeService.remove(id);
  }
}
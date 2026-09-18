import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DeedService } from './deed.service';
import { Deed } from 'src/schemas/deed.schema';

@Controller('deeds')
export class DeedController {
  constructor(private readonly deedService: DeedService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDeedDto: Partial<Deed>): Promise<Deed> {
    return this.deedService.create(createDeedDto);
  }

  @Get()
  async findAll(): Promise<Deed[]> {
    return this.deedService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Deed> {
    return this.deedService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeedDto: Partial<Deed>,
  ): Promise<Deed> {
    return this.deedService.update(id, updateDeedDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.deedService.remove(id);
  }
}
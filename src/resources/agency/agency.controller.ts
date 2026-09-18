import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { Agency } from 'src/schemas/agency.schema';

@Controller('agencies')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAgencyDto: Partial<Agency>): Promise<Agency> {
    return this.agencyService.create(createAgencyDto);
  }

  @Get()
  async findAll(): Promise<Agency[]> {
    return this.agencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Agency> {
    return this.agencyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAgencyDto: Partial<Agency>,
  ): Promise<Agency> {
    return this.agencyService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.agencyService.remove(id);
  }
}

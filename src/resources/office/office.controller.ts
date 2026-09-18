import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOfficeDto } from './dto/create-office.dto';
import { OfficeService } from './office.service';
import { Office } from 'src/schemas/office.schema';

@ApiTags('Offices')
@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo escritório' })
  @ApiResponse({ status: 201, type: Office })
  async create(@Body() createOfficeDto: CreateOfficeDto): Promise<Office> {
    return this.officeService.create(createOfficeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os escritórios com suas cidades associadas' })
  @ApiResponse({ status: 200, type: [Office] })
  async findAll(): Promise<Office[]> {
    return this.officeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém detalhes de um escritório por ID' })
  @ApiResponse({ status: 200, type: Office })
  async findOne(@Param('id') id: string): Promise<Office> {
    return this.officeService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza dados de um escritório' })
  @ApiResponse({ status: 200, type: Office })
  async update(
    @Param('id') id: string,
    @Body() updateOfficeDto: Partial<CreateOfficeDto>,
  ): Promise<Office> {
    return this.officeService.update(id, updateOfficeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um escritório' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.officeService.delete(id);
    return { message: 'Escritório removido com sucesso.' };
  }
}
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { Address } from 'src/schemas/address.schema';
import { CreateAddressDto } from './dto/create-address.dto'; // Ajuste o caminho do seu DTO se necessário

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso.', type: Address })
  @ApiBody({ type: CreateAddressDto })
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os endereços' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.', type: [Address] })
  async findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um endereço por ID' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado.', type: Address })
  async findOne(@Param('id') id: string): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um endereço' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.', type: Address })
  @ApiBody({ type: CreateAddressDto })
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: Partial<Address>,
  ): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um endereço' })
  @ApiResponse({ status: 204, description: 'Endereço removido com sucesso.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.addressService.remove(id);
  }
}
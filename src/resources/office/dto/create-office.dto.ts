import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/resources/address/dto/create-address.dto';

export class CreateOfficeDto {
  @ApiPropertyOptional({ example: 'Escritório Regional Sul' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: () => CreateAddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  @ApiPropertyOptional({ example: 'OFF-SUL' })
  @IsOptional()
  @IsString()
  sigla?: string;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'Carlos Eduardo' })
  @IsOptional()
  @IsString()
  managerName?: string;

  @ApiPropertyOptional({ example: '41988887777' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'Curitiba' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: '4106902', description: 'Código IBGE ou ID da cidade principal' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({
    example: ['4106902', '4100103'],
    description: 'IDs/Códigos das cidades atendidas por este escritório',
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'O campo cities deve ser um array' })
  @IsMongoId({ each: true, message: 'Cada item do array cities deve ser um ObjectId do Mongoose válido' })
  cities?: string[];
}

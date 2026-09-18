import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAgencyDto } from "src/resources/agency/dto/create-agency.dto";
import { PropertyTypeEnum } from "src/enums/property-type.enum";
import { CreateDeedDto } from "src/resources/deed/dto/create-deed.dto";
import { CreateAddressDto } from "src/resources/address/dto/create-address.dto";

export class CreatePropertyDto {
    @ApiPropertyOptional({ example: 'CPE-123456', description: 'Código do Patrimônio Estadual ou Código do Imóvel' })
    @IsOptional()
    @IsString()
    cpe?: string;

    @ApiPropertyOptional({ enum: PropertyTypeEnum, example: PropertyTypeEnum.EDIFICACAO, description: 'Tipo do imóvel' })
    @IsOptional()
    @IsEnum(PropertyTypeEnum)
    type?: PropertyTypeEnum;

    @ApiPropertyOptional({ type: () => CreateAddressDto, description: 'Endereço do imóvel' })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address?: CreateAddressDto;

    @ApiPropertyOptional({ example: 'Secretaria de Estado das Cidades', description: 'Órgão responsável pela administração' })
    @IsOptional()
    @IsString()
    administration?: string;

    @ApiPropertyOptional({ example: 'Institucional', description: 'Classificação do imóvel' })
    @IsOptional()
    @IsString()
    classification?: string;

    @ApiPropertyOptional({ example: 'Estado do Paraná', description: 'Proprietário do imóvel' })
    @IsOptional()
    @IsString()
    owner?: string;

    @ApiPropertyOptional({ example: 'Gleba A', description: 'Informações de terreno' })
    @IsOptional()
    @IsString()
    land?: string;

    @ApiPropertyOptional({ example: 'Próprio do Estado', description: 'Condição de propriedade (Próprio)' })
    @IsOptional()
    @IsString()
    own?: string;

    @ApiPropertyOptional({ type: () => CreateAgencyDto, description: 'Órgão proprietário' })
    @IsOptional()
    agencyOwner?: CreateAgencyDto;

    @ApiPropertyOptional({ type: () => CreateAgencyDto, description: 'Órgão ocupante' })
    @IsOptional()
    agencyOccupant?: CreateAgencyDto;

    @ApiPropertyOptional({ example: 'Imóvel em bom estado de conservação.', description: 'Observações gerais' })
    @IsOptional()
    @IsString()
    observations?: string;

    @ApiPropertyOptional({ example: 'Regularizado', description: 'Status de registro do imóvel' })
    @IsOptional()
    @IsString()
    registryStatus?: string;

    @ApiPropertyOptional({ type: () => CreateDeedDto, description: 'Dados da escritura (Deed)' })
    @IsOptional()
    @Type(() => CreateDeedDto)
    deed?: CreateDeedDto;

    @ApiPropertyOptional({ example: '2025-01-15T00:00:00.000Z', description: 'Data de incorporação' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    incorporationDate?: Date;

    @ApiPropertyOptional({ example: 'Doação', description: 'Tipo de incorporação' })
    @IsOptional()
    @IsString()
    incorporationType?: string;

    @ApiPropertyOptional({ example: 450.50, description: 'Área total em metros quadrados' })
    @IsOptional()
    @IsNumber()
    totalArea?: number;

    @ApiPropertyOptional({ example: 2, description: 'Número de edificações no imóvel' })
    @IsOptional()
    @IsNumber()
    buildings?: number;

    @ApiPropertyOptional({ example: 300.00, description: 'Área total construída das edificações' })
    @IsOptional()
    @IsNumber()
    buildingsTotalArea?: number;

    @ApiPropertyOptional({ example: 1500000.00, description: 'Valor estimado do imóvel' })
    @IsOptional()
    @IsNumber()
    value?: number;
}

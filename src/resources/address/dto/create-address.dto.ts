import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateIbgeDto } from "src/resources/ibge/dto/create-ibge.dto";
import { CreateLocationDto } from "src/resources/location/dto/create-location.dto";

export class CreateAddressDto {
    @ApiProperty({ example: '80010-020', description: 'Código de Endereçamento Postal (CEP)' })
    @IsOptional()
    @IsString()
    cep!: string;

    @ApiPropertyOptional({ example: 'PR', description: 'Sigla do estado (UF)' })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiPropertyOptional({ example: 'Curitiba', description: 'Nome do município' })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({ example: 'Centro', description: 'Bairro' })
    @IsOptional()
    @IsString()
    neighborhood?: string;

    @ApiPropertyOptional({ example: 'Rua XV de Novembro', description: 'Nome da rua ou logradouro' })
    @IsOptional()
    @IsString()
    street?: string;

    @ApiPropertyOptional({ example: '200', description: 'Detalhes do endereço' })
    @IsOptional()
    @IsString()
    detail?: string;

    @ApiPropertyOptional({ example: 'America/Sao_Paulo', description: 'Nome do fuso horário' })
    @IsOptional()
    @IsString()
    timezoneName?: string;

    @ApiPropertyOptional({ type: () => CreateLocationDto, description: 'Coordenadas geográficas' })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateLocationDto)
    location?: CreateLocationDto;

    @ApiPropertyOptional({ type: () => CreateIbgeDto, description: 'Informações do IBGE' })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateIbgeDto)
    ibge?: CreateIbgeDto;
}
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { ApiPropertyOptional } from "node_modules/@nestjs/swagger/dist/decorators/api-property.decorator";
import { CreateAddressDto } from "src/resources/address/dto/create-address.dto";
import { Address } from "src/resources/address/entities/address.entity";

export class CreateAgencyDto {
    @ApiPropertyOptional({ example: '00.000.000/0001-00', description: 'CNPJ of the agency' })
    @IsOptional()
    @IsString()
    cnpj?: string;

    @ApiPropertyOptional({ example: 'Empresa Exemplo LTDA', description: 'Registered corporate name' })
    @IsOptional()
    @IsString()
    registeredName?: string;

    @ApiPropertyOptional({ example: 'Nome Fantasia', description: 'Trade or commercial name' })
    @IsOptional()
    @IsString()
    tradeName?: string;

    @ApiPropertyOptional({ type: Address, description: 'Physical address details' })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address?: CreateAddressDto;

    @ApiPropertyOptional({ example: 'ACTIVE', description: 'Current status of the agency' })
    @IsOptional()
    @IsString()
    status?: string;
}

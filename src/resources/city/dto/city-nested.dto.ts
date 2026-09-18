import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RegionDto {
  @ApiProperty({ example: 4 })
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'S' })
  @IsString()
  sigla?: string;

  @ApiProperty({ example: 'Sul' })
  @IsString()
  nome?: string;
}

export class UfDto {
  @ApiProperty({ example: 41 })
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'PR' })
  @IsString()
  sigla?: string;

  @ApiProperty({ example: 'Paraná' })
  @IsString()
  nome?: string;

  @ApiProperty({ type: () => RegionDto })
  regiao?: RegionDto;
}

export class MesoregionDto {
  @ApiProperty({ example: 4104 })
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Norte Pioneiro Paranaense' })
  @IsString()
  nome?: string;

  @ApiProperty({ type: () => UfDto })
  UF?: UfDto;
}

export class MicroregionDto {
  @ApiProperty({ example: 41015 })
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Cornélio Procópio' })
  @IsString()
  nome?: string;

  @ApiProperty({ type: () => MesoregionDto })
  mesorregiao?: MesoregionDto;
}

export class IntermediaryRegionDto {
  @ApiProperty({ example: 4105 })
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Londrina' })
  @IsString()
  nome?: string;

  @ApiProperty({ type: () => UfDto })
  UF?: UfDto;
}

export class ImmediateRegionDto {
  @ApiProperty({ example: 410022 })
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Santo Antônio da Platina' })
  @IsString()
  nome?: string;

  @ApiProperty({ type: () => IntermediaryRegionDto })
  'regiao-intermediaria'?: IntermediaryRegionDto;
}
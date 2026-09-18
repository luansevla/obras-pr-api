import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MicroregionDto, ImmediateRegionDto } from './city-nested.dto';

export class CreateCityDto {
  @ApiProperty({ example: 4100103, description: 'Código IBGE do município' })
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Abatiá' })
  @IsString()
  nome?: string;

  @ApiProperty({ type: () => MicroregionDto })
  @ValidateNested()
  @Type(() => MicroregionDto)
  microrregiao?: MicroregionDto;

  @ApiProperty({ type: () => ImmediateRegionDto })
  @ValidateNested()
  @Type(() => ImmediateRegionDto)
  'regiao-imediata'?: ImmediateRegionDto;
}
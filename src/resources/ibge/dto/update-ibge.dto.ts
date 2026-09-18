import { PartialType } from '@nestjs/swagger';
import { CreateIbgeDto } from './create-ibge.dto';

export class UpdateIbgeDto extends PartialType(CreateIbgeDto) {}

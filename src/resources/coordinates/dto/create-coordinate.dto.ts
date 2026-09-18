import { ApiProperty } from '@nestjs/swagger';

export class CreateCoordinateDto {
    @ApiProperty({ example: '-49.2733', description: 'Longitude da coordenada' })
    longitude?: string;

    @ApiProperty({ example: '-25.4284', description: 'Latitude da coordenada' })
    latitude?: string;
}
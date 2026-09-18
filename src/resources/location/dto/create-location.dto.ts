import { ApiProperty } from "@nestjs/swagger";
import { CreateCoordinateDto } from "src/resources/coordinates/dto/create-coordinate.dto";

export class CreateLocationDto {
    @ApiProperty({ type: String })
    type?: string;
    @ApiProperty({
        type: () => CreateCoordinateDto, description: 'Latitude e longitude'
    })
    coordinates?: CreateCoordinateDto
}

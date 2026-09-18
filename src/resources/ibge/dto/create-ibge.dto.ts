import { ApiProperty } from "@nestjs/swagger";

export class CreateIbgeDto {
    @ApiProperty({ example: '4102404', description: 'Código do município no IBGE' })
    city?: string;

    @ApiProperty({ example: '41', description: 'Código UF no IBGE' })
    state?: string;
}

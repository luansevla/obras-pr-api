import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDeedDto {
    @ApiPropertyOptional({ example: '1º Cartório de Registro de Imóveis', description: 'Cartório ou serventia notarial' })
    office?: string;

    @ApiPropertyOptional({ type: [String], example: ['Matrícula 12345', 'Transcrição 6789'], description: 'Registros associados' })
    registries?: string[];

    @ApiPropertyOptional({ example: 'Livro 3-B', description: 'Livro do cartório' })
    book?: string;
}

import { Ibge } from 'src/resources/ibge/entities/ibge.entity';
import { Location } from './../../location/entities/location.entity'

export class Address {
    cep?: string;
    state!: string;
    city!: string;
    neighborhood?: string;
    street?: string;
    detail?: string;
    timezoneName?: string;
    location?: Location;
    ibge?: Ibge;
}

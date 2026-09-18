import { Address } from "src/resources/address/entities/address.entity";
import { City } from "src/resources/city/entities/city.entity";

export class Office {
    name?: string;
    address?: Address;
    sigla?: string;
    status?: string;
    managerName?: string;
    phoneNumber?: string;
    city?: string;
    cityId?: string;
    cities?: City[];
}

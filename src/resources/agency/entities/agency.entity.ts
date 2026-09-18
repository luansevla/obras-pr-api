import { Address } from "src/resources/address/entities/address.entity";

export class Agency {
    cnpj?: string;
    registeredName?: string;
    tradeName?: string;
    address?: Address;
    status?: string;
}

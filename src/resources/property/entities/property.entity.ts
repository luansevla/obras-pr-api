import { Agency } from "src/resources/agency/entities/agency.entity";
import { Deed } from "src/resources/deed/entities/deed.entity";
import { PropertyTypeEnum } from "src/enums/property-type.enum";
import { Address } from "src/resources/address/entities/address.entity";

export class Property {
    cpe?: string;
    type?: PropertyTypeEnum;
    address?: Address;
    administration?: string;
    classification?: string;
    owner?: string;
    land?: string;
    own?: string;
    agencyOwner?: Agency;
    agencyOccupant?: Agency;
    observations?: string;
    registryStatus?: string;
    deed?: Deed;
    incorporationDate?: Date;
    incorporationType?: string;
    totalArea?: number;
    buildings?: number;
    buildingsTotalArea?: number;
    value?: number;
}

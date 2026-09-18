import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IbgeModule } from './resources/ibge/ibge.module';
import { CoordinatesModule } from './resources/coordinates/coordinates.module';
import { LocationModule } from './resources/location/location.module';
import { PropertyModule } from './resources/property/property.module';
import { AddressModule } from './resources/address/address.module';
import { AgencyModule } from './resources/agency/agency.module';
import { DeedModule } from './resources/deed/deed.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './resources/city/city.module';
import { OfficeModule } from './resources/office/office.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/obras-pr'),
    AddressModule,
    IbgeModule,
    CoordinatesModule,
    LocationModule,
    PropertyModule,
    AgencyModule,
    DeedModule,
    CityModule,
    OfficeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

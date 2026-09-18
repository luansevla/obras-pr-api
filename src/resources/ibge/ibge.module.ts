import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IbgeController } from './ibge.controller';
import { IbgeService } from './ibge.service';
import { Ibge, IbgeSchema } from 'src/schemas/ibge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ibge.name, schema: IbgeSchema }]),
  ],
  controllers: [IbgeController],
  providers: [IbgeService],
  exports: [IbgeService, MongooseModule],
})
export class IbgeModule {}
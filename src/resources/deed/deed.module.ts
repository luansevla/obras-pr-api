import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeedController } from './deed.controller';
import { DeedService } from './deed.service';
import { Deed, DeedSchema } from 'src/schemas/deed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deed.name, schema: DeedSchema }]),
  ],
  controllers: [DeedController],
  providers: [DeedService],
  exports: [DeedService, MongooseModule],
})
export class DeedModule {}
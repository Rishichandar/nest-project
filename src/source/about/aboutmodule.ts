// src/about/about.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutService } from './aboutService';
import { AboutController } from './aboutController';
import { About, AboutSchema } from './aboutSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: About.name, schema: AboutSchema }])],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}

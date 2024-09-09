// footer.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FooterController } from './footerController';
import { FooterService } from './footerService';
import { Footer, FooterSchema } from './footerSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Footer.name, schema: FooterSchema }])],
  controllers: [FooterController],
  providers: [FooterService],
})
export class FooterModule {}

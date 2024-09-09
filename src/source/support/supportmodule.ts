import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportController } from './supportController';
import { SupportService } from './supportService';
import { SupportSchema } from './supportSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Support', schema: SupportSchema }])],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}

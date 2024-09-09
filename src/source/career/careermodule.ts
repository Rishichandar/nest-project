import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CareerSchema } from './careerSchema';
import { CareerService } from './careerService';
import { CareerController } from './careerController';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Career', schema: CareerSchema }])],
    controllers: [CareerController],
    providers: [CareerService],
})
export class CareerModule {}

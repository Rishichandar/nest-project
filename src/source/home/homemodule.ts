import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './homeController'; // Ensure the file name matches
import { HomeService } from './homeService'; // Ensure the file name matches
import { Home, HomeSchema } from './homeSchema'; // Ensure the file name matches

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Home', schema: HomeSchema }])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}

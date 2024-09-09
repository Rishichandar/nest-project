import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavbarController } from './navbarController';
import { NavbarService } from './navbarService';
import { NavbarSchema } from './navbarSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Navbar', schema: NavbarSchema }])],
  controllers: [NavbarController],
  providers: [NavbarService],
})
export class NavbarModule {}

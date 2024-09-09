import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NavbarService } from './navbarService';
import { Navbar } from './navbarSchema';

@Controller('navbar')
export class NavbarController {
  constructor(private readonly navbarService: NavbarService) {}

  @Post('createOrUpdate')
  async createOrUpdate(@Body() data: Partial<Navbar>): Promise<Navbar> {
    return this.navbarService.createOrUpdateNavbar(data);
  }

  @Get('get')
  async get(): Promise<Navbar[]> {
    return this.navbarService.getNavbar();
  }

  @Put(':id/:type/:subDocId')
  async update(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string,
    @Body() data: any
  ): Promise<Navbar> {
    return this.navbarService.updateNavbar(id, type, subDocId, data);
  }

  @Delete(':id/soft')
  async softDelete(@Param('id') id: string): Promise<Navbar> {
    return this.navbarService.softDeleteNavbar(id);
  }

  @Delete(':id/permanent/:type/:subDocId')
  async deleteSubDocPermanently(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string
  ): Promise<Navbar> {
    return this.navbarService.deleteSubDocPermanently(id, type, subDocId);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HomeService } from './homeService';
import { Home } from './homeSchema';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post('createOrUpdate')
  async createOrUpdate(@Body() body: Partial<Home>): Promise<Home> {
    return this.homeService.createOrUpdateHome(body);
  }

  @Get('get')
  async get(): Promise<Home[]> {
    return this.homeService.getHome();
  }

  @Put('/:id/:type/:subDocId')
  async update(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string,
    @Body() body: any
  ): Promise<Home> {
    return this.homeService.updateHome(id, type, subDocId, body);
  }

  @Delete('/:id/soft')
  async softDelete(@Param('id') id: string): Promise<Home> {
    return this.homeService.softDeleteHome(id);
  }

  @Delete('/:id/permanent/:type/:subDocId')
  async deleteSubDocPermanently(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string
  ): Promise<Home> {
    return this.homeService.deleteSubDocPermanently(id, type, subDocId);
  }
}

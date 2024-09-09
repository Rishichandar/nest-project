// src/about/about.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AboutService } from './aboutService';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post('createOrUpdate')
  async createOrUpdateAbout(@Body() data: any) {
    return this.aboutService.createOrUpdateAbout(data);
  }

  @Get('get')
  async getAbout() {
    return this.aboutService.getAbout();
  }

  @Put('/:id/:type/:subDocId')
  async updateAbout(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string,
    @Body() data: any,
  ) {
    return this.aboutService.updateAbout(id, type, subDocId, data);
  }

  @Delete('/:id/soft')
  async softDeleteAbout(@Param('id') id: string) {
    return this.aboutService.softDeleteAbout(id);
  }

  @Delete('/:id/permanent/:type/:subDocId')
  async deleteSubDocPermanently(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string,
  ) {
    return this.aboutService.deleteSubDocPermanently(id, type, subDocId);
  }
}

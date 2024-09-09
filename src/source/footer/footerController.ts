// footer.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FooterService } from './footerService';
import { Footer } from './footerSchema';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  // Create or update footer
  @Post('createOrUpdate')
  async createOrUpdate(@Body() data: any): Promise<Footer> {
    return this.footerService.createOrUpdateFooter(data);
  }

  // Get all footer data
  @Get('get')
  async getFooters(): Promise<Footer[]> {
    return this.footerService.getFooters();
  }

  // Get active footer data
  @Get('getActive')
  async getActiveFooters(): Promise<Footer[]> {
    return this.footerService.getActiveFooters();
  }

  // Update specific sub-document
  @Put('/:id/:type/:subDocId')
  async updateFooter(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string,
    @Body() data: any,
  ): Promise<Footer> {
    return this.footerService.updateFooter(id, type, subDocId, data);
  }

  // Soft delete the footer
  @Delete('/:id/soft')
  async softDeleteFooter(@Param('id') id: string): Promise<Footer> {
    return this.footerService.softDeleteFooter(id);
  }

  // Permanently delete sub-document
  @Delete('/:id/permanent/:type/:subDocId')
  async deleteSubDocPermanently(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string,
  ): Promise<Footer> {
    return this.footerService.deleteSubDocPermanently(id, type, subDocId);
  }
}

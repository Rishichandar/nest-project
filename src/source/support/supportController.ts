import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SupportService } from './supportService';
import { Support } from './supportSchema';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('createOrUpdate')
  async createOrUpdate(@Body() data: Partial<Support>): Promise<Support> {
    return this.supportService.createOrUpdateSupport(data);
  }

  @Get('get')
  async get(): Promise<Support[]> {
    return this.supportService.getSupport();
  }

  @Put(':id/:type/:subDocId')
  async update(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string,
    @Body() data: any
  ): Promise<Support> {
    return this.supportService.updateSupport(id, type, subDocId, data);
  }

  @Delete(':id/soft')
  async softDelete(@Param('id') id: string): Promise<Support> {
    return this.supportService.softDeleteSupport(id);
  }

  @Delete(':id/permanent/:type/:subDocId')
  async deleteSubDocPermanently(
    @Param('id') id: string,
    @Param('type') type: string,
    @Param('subDocId') subDocId: string
  ): Promise<Support> {
    return this.supportService.deleteSubDocPermanently(id, type, subDocId);
  }
}

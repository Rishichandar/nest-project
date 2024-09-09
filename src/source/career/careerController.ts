import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CareerService } from './careerService';
import { Career } from './careerSchema';

@Controller('career')
export class CareerController {
    constructor(private readonly careerService: CareerService) {}

    @Post('createOrUpdate')
    async createOrUpdateCareer(@Body() data: any): Promise<Career> {
        return this.careerService.createOrUpdateCareer(data);
    }

    @Get('get')
    async getCareer(): Promise<Career[]> {
        return this.careerService.getCareer();
    }

    @Put(':id/:type/:subDocId')
    async updateCareer(
        @Param('id') id: string,
        @Param('type') type: string,
        @Param('subDocId') subDocId: string,
        @Body() data: any
    ): Promise<Career> {
        return this.careerService.updateCareer(id, type, subDocId, data);
    }

    @Delete(':id/soft')
    async softDeleteCareer(@Param('id') id: string): Promise<Career> {
        return this.careerService.softDeleteCareer(id);
    }

    @Delete(':id/permanent/:type/:subDocId')
    async deleteSubDocPermanently(
        @Param('id') id: string,
        @Param('type') type: string,
        @Param('subDocId') subDocId: string
    ): Promise<Career> {
        return this.careerService.deleteSubDocPermanently(id, type, subDocId);
    }
}

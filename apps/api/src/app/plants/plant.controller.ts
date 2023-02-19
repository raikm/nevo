import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MiFloraDevice } from '@nevo/domain-types';
import {
  Plant,
  PlantCreationParameters,
  PlantUpdateParameters,
} from './dto/index.js';

import { PlantService } from './plant.service.js';

@Controller({
  path: '/plants',
  version: '1',
})
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post()
  @HttpCode(204)
  async create(
    @Body() parameters: PlantCreationParameters,
  ): Promise<Plant | null> {
    return await this.plantService.create(parameters);
  }

  @Get()
  async findAll(): Promise<Plant[]> {
    return await this.plantService.findAll();
  }

  @Get('discover')
  async findNewNearbySensors(): Promise<MiFloraDevice[]> {
    return await this.plantService.findNewNearbySensors();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() parameters: PlantUpdateParameters,
  ): Promise<Plant | null> {
    return await this.plantService.update(id, parameters);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.plantService.remove(id);
  }
}

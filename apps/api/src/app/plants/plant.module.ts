import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller.js';
import { PlantService } from './plant.service.js';

@Module({
  imports: [
    // TypeOrmModule.forFeature([]),
  ],
  controllers: [PlantController],
  providers: [PlantService],
  exports: [PlantService],
})
export class PlantModule {}

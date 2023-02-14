import { Module } from '@nestjs/common';
import { MeasurementController } from './plant.measurement.controller.js';
import { MeasurementService } from './plant.measurement.service.js';

@Module({
  imports: [
    // TypeOrmModule.forFeature([]),
  ],
  controllers: [MeasurementController],
  providers: [MeasurementService],
  exports: [MeasurementService],
})
export class MeasurementModule {}

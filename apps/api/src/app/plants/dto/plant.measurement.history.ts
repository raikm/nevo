import type { PlantMeasurementHistoryParameters as IPlantMeasurementHistoryParameters } from '@nevo/domain-types';
import { IsNotEmpty } from 'class-validator';

export class PlantMeasurementHistoryParameters
  implements IPlantMeasurementHistoryParameters
{
  @IsNotEmpty()
  start!: Date;
  @IsNotEmpty()
  end!: Date;
}

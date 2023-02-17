import type {
  Location,
  PlantUpdateParameters as IPlantUpdateParameters,
} from '@nevo/domain-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PlantUpdateParameters implements IPlantUpdateParameters {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  version!: string;

  @IsOptional()
  location?: Location;
}

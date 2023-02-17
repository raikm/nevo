import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationEntity } from '../../locations/entities/location.entity.js';
import { MeasurementEntity } from './measurement.entity.js';
import { MeasurementRangeEntity } from './measurementRange.entity.js';

@Entity({
  name: 'plant',
})
export class PlantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'nvarchar' })
  name!: string;

  @Column({ type: 'nvarchar' })
  address!: string;

  @Column({ type: 'nvarchar' })
  version!: string;

  @ManyToOne(() => LocationEntity, {
    createForeignKeyConstraints: false,
  })
  location?: LocationEntity;

  @OneToMany(() => MeasurementEntity, (measurement) => measurement.plant)
  measurement?: MeasurementEntity;

  @OneToMany(
    () => MeasurementRangeEntity,
    (measurementRange) => measurementRange.plant,
  )
  measurementRange?: MeasurementEntity;
}

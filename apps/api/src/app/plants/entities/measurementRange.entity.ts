import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlantEntity } from './plant.entity.js';

@Entity({
  name: 'measurement_range',
})
export class MeasurementRangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'nvarchar' })
  type!: string;

  @Column({ type: 'int' })
  min!: number;

  @Column({ type: 'int' })
  max!: number;

  @Column({ type: 'nvarchar' })
  unit!: string;

  @ManyToOne(() => PlantEntity, { createForeignKeyConstraints: false })
  plant?: PlantEntity;
}

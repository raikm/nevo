import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlantEntity } from './plant.entity.js';

@Entity({
  name: 'measurement',
})
export class MeasurementEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'nvarchar' })
  type!: string;

  @Column({ type: 'int' })
  value!: number;

  @Column({ type: 'nvarchar' })
  unit!: string;

  @ManyToOne(() => PlantEntity, { createForeignKeyConstraints: false })
  plant?: PlantEntity;
}

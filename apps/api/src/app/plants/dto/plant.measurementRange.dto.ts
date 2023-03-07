import type { MeasurementRange as IMeasurementRange } from '@nevo/domain-types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class MeasurementRange implements IMeasurementRange {
  @IsNotEmpty()
  @IsUUID()
  plantId!: string

  @IsNotEmpty()
  type!: string

  @IsNotEmpty()
  unit!: string

  @IsNotEmpty()
  min!: number

  @IsNotEmpty()
  max!: number

  constructor(init?: MeasurementRange) {
    Object.assign(this, init)
  }
}

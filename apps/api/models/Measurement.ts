import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.2.0/mod.ts'
import Plant from './Plant.ts'

const plantValueTypes = ['temperature', 'soilfertility', 'soilmoisture', 'battery', 'sunlight']

class Measurement extends Model {
  static table = 'measurements'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, type: DataTypes.STRING },
    type: DataTypes.enum(plantValueTypes),
    value: DataTypes.INTEGER
  }

  static plant() {
    return this.hasOne(Plant)
  }

  id!: string
  type!: string
  value!: number
}

export default Measurement

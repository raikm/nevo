import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.2.0/mod.ts'
import Plant from './Plant.ts'

const plantValueTypes = ['sunlight', 'soilfertility', 'soilmoisture', 'temperature', 'battery']

class MeasurementRange extends Model {
  static table = 'measurement_ranges'

  static fields = {
    id: { primaryKey: true, type: DataTypes.STRING },
    type: DataTypes.enum(plantValueTypes),
    unit: { type: DataTypes.STRING },
    min: { type: DataTypes.INTEGER },
    max: { type: DataTypes.INTEGER }
  }

  static plant() {
    return this.hasOne(Plant)
  }
}

export default MeasurementRange

import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.2.0/mod.ts'
import Location from './Location.ts'
import Measurement from './Measurement.ts'
import MeasurementRange from './MeasurementRange.ts'

class Plant extends Model {
  static table = 'plants'

  static fields = {
    id: { primaryKey: true, type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    version: { type: DataTypes.STRING }
  }

  static measurements() {
    return this.hasMany(Measurement)
  }

  static location() {
    return this.hasOne(Location)
  }

  static measurementRange() {
    return this.hasMany(MeasurementRange)
  }
}

export default Plant

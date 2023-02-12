import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.2.0/mod.ts'
import Plant from './Plant.ts'

class Location extends Model {
  static table = 'locations'

  static fields = {
    id: { primaryKey: true, type: DataTypes.STRING },
    name: { type: DataTypes.STRING, unique: true },
    floor: { type: DataTypes.INTEGER }
  }

  static plant() {
    return this.hasMany(Plant)
  }
}

export default Location

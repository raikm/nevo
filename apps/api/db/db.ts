import { Database, Relationships, SQLite3Connector } from 'https://deno.land/x/denodb@v1.2.0/mod.ts'
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import Location from '../models/Location.ts'
import Measurement from '../models/Measurement.ts'
import MeasurementRange from '../models/MeasurementRange.ts'
import Plant from '../models/Plant.ts'

config({ export: true })

const connector = new SQLite3Connector({
  filepath: './db/database.sqlite'
})

const db = new Database(connector)

Relationships.belongsTo(Measurement, Plant)
Relationships.belongsTo(MeasurementRange, Plant)
Relationships.belongsTo(Plant, Location)

db.link([Plant, Measurement, MeasurementRange, Location])

export default db

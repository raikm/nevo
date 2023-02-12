import Location from '../models/Location.ts'
import Measurement from '../models/Measurement.ts'
import Plant from '../models/Plant.ts'
import { PlantMeasurement } from '../types/plant.interface.ts'

export const getAllPlantMetadata = async () => {
  return await Plant.join(Location, Location.field('id'), Plant.field('locationId')).all()
}

export const getLastPlantValues = async (plantId: string) => {
  const battery = <Measurement>(
    await Plant.join(Plant, Plant.field('id'), Measurement.field('plantId'))
      .where(Measurement.field('type'), 'battery')
      .where(Measurement.field('plant_id'), plantId)
      .orderBy('created_at', 'desc')
      .select('value')
      .first()
  )

  const soilfertility = <Measurement>(
    await Plant.join(Plant, Plant.field('id'), Measurement.field('plantId'))
      .where(Measurement.field('type'), 'soilfertility')
      .where(Measurement.field('plant_id'), plantId)
      .orderBy('created_at', 'desc')
      .select('value')
      .first()
  )

  const soilMoisture = <Measurement>(
    await Plant.join(Plant, Plant.field('id'), Measurement.field('plantId'))
      .where(Measurement.field('type'), 'soilmoisture')
      .where(Measurement.field('plant_id'), plantId)
      .orderBy('created_at', 'desc')
      .select('value')
      .first()
  )

  const sunlight = <Measurement>(
    await Plant.join(Plant, Plant.field('id'), Measurement.field('plantId'))
      .where(Measurement.field('type'), 'sunlight')
      .where(Measurement.field('plant_id'), plantId)
      .orderBy('created_at', 'desc')
      .select('value')
      .first()
  )

  const temperature = <Measurement>(
    await Plant.join(Plant, Plant.field('id'), Measurement.field('plantId'))
      .where(Measurement.field('type'), 'temperature')
      .where(Measurement.field('plant_id'), plantId)
      .orderBy('created_at', 'desc')
      .select('value')
      .first()
  )

  return {
    battery: battery.value,
    soilFertility: soilfertility.value,
    soilMoisture: soilMoisture.value,
    sunlight: sunlight.value,
    temperature: temperature.value,
    id: plantId
  }
}

// * TODO GET historical data from plant x including requested timespam

export const putPlantMeasurements = async (measurements: PlantMeasurement): Promise<void> => {
  // TODO add current sun data on top of old data from *today* & reset if day is over
  const plant: Plant = await Plant.where('id', measurements.id).first()

  await Measurement.create([
    {
      id: crypto.randomUUID(),
      type: 'battery',
      value: measurements.battery,
      plantId: plant.id!.toString()
    },
    {
      id: crypto.randomUUID(),
      type: 'temperature',
      value: measurements.temperature,
      plantId: plant.id!.toString()
    },
    {
      id: crypto.randomUUID(),
      type: 'soilfertility',
      value: measurements.soilFertility,
      plantId: plant.id!.toString()
    },
    {
      id: crypto.randomUUID(),
      type: 'soilmoisture',
      value: measurements.soilMoisture,
      plantId: plant.id!.toString()
    },
    {
      id: crypto.randomUUID(),
      type: 'sunlight',
      value: measurements.sunlight,
      plantId: plant.id!.toString()
    }
  ])
}

// * GET miflora sensors who are not setuped
// sensor must be near server to get find my the miflora search function
// compare existing mac adreses in db with found miflora sensors

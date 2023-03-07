import { Location } from './location.js'

export interface Plant {
  id: string
  name: string
  address: string
  version: string
  location?: Location
}

export interface PlantCreationParameters {
  name: string
  address: string
  version: string
  location?: Location
}

export interface PlantUpdateParameters {
  name: string
  location?: Location
}

export interface Measurement {
  plantId: string
  battery: number
  soilFertility: number
  soilMoisture: number
  sunlight: number
  temperature: number
  time: Date
}

export interface MeasurementBorders {
  currency: string
  min: number
  max: number
}

export interface PlantMeasurementHistoryParameters {
  start: Date
  end: Date
}

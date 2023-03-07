import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import { Between, Repository } from 'typeorm'
import { Measurement } from './dto/index.js'
import { PlantMeasurementHistoryParameters } from './dto/plant.measurement.history.js'
import { MeasurementEntity, PlantEntity } from './entities/plant.entity.js'

enum MeasurementType {
  BATTERY = 'BATTERY',
  SOILFERTILITY = 'SOILFERTILITY',
  SOILMOISTURE = 'SOILMOISTURE',
  TEMPERATURE = 'TEMPERATURE',
  SUNLIGHT = 'SUNLIGHT'
}

enum MeasurementUnit {
  PERCENTAGE = '%',
  CONDUCTIVITY = 'µS/cm',
  CELSIUS = '°C',
  LUX = 'Lux'
}

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(PlantEntity)
    private readonly plantRepository: Repository<PlantEntity>,
    @InjectRepository(MeasurementEntity)
    private readonly measurementRepository: Repository<MeasurementEntity>
  ) {}

  async getLastMeasurements(plantId: string): Promise<Measurement> {
    const plant = await this.plantRepository.findOneBy({
      id: plantId
    })

    if (!plant) {
      throw new BadRequestException()
    }

    const battery = await this.measurementRepository.findOne({
      where: { type: MeasurementType.BATTERY, plant: plant },
      order: { datetime: 'DESC' }
    })

    const soilFertility = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SOILFERTILITY, plant: plant },
      order: { datetime: 'DESC' }
    })

    const soilMoisture = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SOILMOISTURE, plant: plant },
      order: { datetime: 'DESC' }
    })

    const sunlight = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SUNLIGHT, plant: plant },
      order: { datetime: 'DESC' }
    })

    const temperature = await this.measurementRepository.findOne({
      where: { type: MeasurementType.TEMPERATURE, plant: plant },
      order: { datetime: 'DESC' }
    })

    if (
      battery == null ||
      soilFertility == null ||
      soilMoisture == null ||
      sunlight == null ||
      temperature == null
    ) {
      throw new BadRequestException()
    }

    return new Measurement({
      plantId: plantId,
      battery: battery.value,
      soilFertility: soilFertility.value,
      soilMoisture: soilMoisture.value,
      sunlight: sunlight.value,
      temperature: temperature.value,
      time: temperature.datetime
    })
  }

  async getPlantMeasurmentsHistory(plantId: string, parameters: PlantMeasurementHistoryParameters) {
    const start = parameters.start
    const end = parameters.end

    const plant = await this.plantRepository.findOneBy({
      id: plantId
    })

    if (!plant) {
      throw new BadRequestException()
    }

    const battery = await this.measurementRepository.find({
      where: {
        type: MeasurementType.BATTERY,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const soilFertility = await this.measurementRepository.find({
      where: {
        type: MeasurementType.SOILFERTILITY,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const soilMoisture = await this.measurementRepository.find({
      where: {
        type: MeasurementType.SOILMOISTURE,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const sunlight = await this.measurementRepository.find({
      where: {
        type: MeasurementType.SUNLIGHT,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const temperature = await this.measurementRepository.find({
      where: {
        type: MeasurementType.TEMPERATURE,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const measurements: Measurement[] = []
    for (let index = 0; index <= battery.length - 1; index++) {
      measurements.push(
        new Measurement({
          plantId: plantId,
          battery: battery[index].value,
          soilFertility: soilFertility[index].value,
          soilMoisture: soilMoisture[index].value,
          sunlight: sunlight[index].value,
          temperature: temperature[index].value,
          time: temperature[index].datetime
        })
      )
    }

    return measurements
  }

  async putNewMeasurements(plantId: string, measurements: Measurement): Promise<void> {
    const plant = await this.plantRepository.findOneBy({
      id: plantId
    })

    if (!plant) {
      throw new BadRequestException()
    }

    let measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.BATTERY,
      value: measurements.battery,
      unit: MeasurementUnit.PERCENTAGE,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)

    measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.SOILFERTILITY,
      value: measurements.soilFertility,
      unit: MeasurementUnit.CONDUCTIVITY,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)

    measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.SOILMOISTURE,
      value: measurements.soilMoisture,
      unit: MeasurementUnit.PERCENTAGE,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)

    measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.SUNLIGHT,
      value: measurements.sunlight,
      unit: MeasurementUnit.LUX,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)

    measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.TEMPERATURE,
      value: measurements.temperature,
      unit: MeasurementUnit.CELSIUS,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)
  }
}

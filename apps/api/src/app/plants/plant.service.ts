import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { LocationEntity } from '../locations/entities/location.entity.js';
import {
  Plant,
  PlantCreationParameters,
  PlantUpdateParameters,
} from './dto/index.js';

import { MiFloraDevice } from '@nevo/domain-types';
// @ts-ignore

import miflora from 'miflora';
import { PlantEntity } from './entities/plant.entity.js';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(PlantEntity)
    private readonly plantRepository: Repository<PlantEntity>,
  ) {}
  async create(parameters: PlantCreationParameters): Promise<Plant | null> {
    const location = await this.locationRepository.findOneBy({
      id: parameters.location?.id,
    });

    let plant = this.plantRepository.create({
      id: randomUUID(),
      name: parameters.name,
      address: parameters.address,
      version: parameters.version,
    });
    if (location != null) {
      plant.location = location;
    }

    plant = await this.plantRepository.save(plant);

    return plant;
  }

  async update(
    id: string,
    parameters: PlantUpdateParameters,
  ): Promise<Plant | null> {
    const existingPlant = await this.plantRepository.findOneBy({
      id: id,
    });

    if (!existingPlant) {
      return null;
    }

    const updatedPlant = Object.assign({}, existingPlant, parameters);
    return updatedPlant;
  }

  async remove(id: string): Promise<void> {
    await this.plantRepository.delete(id);
  }

  async findAll(): Promise<Plant[]> {
    return await this.plantRepository.find();
  }

  async findNewNearbySensors(): Promise<MiFloraDevice[]> {
    const plants = await this.plantRepository.find();
    const plantAddresses = plants.map((p) => p.address);
    const opts = {
      duration: 15000,
      ignoreUnknown: true,
      addresses: plantAddresses,
    };

    return (await miflora.discover(opts)) as MiFloraDevice[];
  }
}

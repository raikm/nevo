import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class PlantService {
  // TODO constructor() {}

  async create(PlantCreationParameters: any) {
    // name, address, location, borders for each measurement
    throw new NotImplementedException();
  }

  async update(PlantUpdateParameters: any) {
    // name, address, location, borders for each measurement
    throw new NotImplementedException();
  }

  async getAll() {
    throw new NotImplementedException();
  }

  async getNewNearbySensors() {
    // sensor must be near server to get find my the miflora search function
    // compare existing mac adreses in db with found miflora sensors
    throw new NotImplementedException();
  }
}

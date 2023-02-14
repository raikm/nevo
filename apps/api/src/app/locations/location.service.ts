import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class LocationService {
  // TODO constructor() {}

  async create(LocationCreationParameters: any) {
    // name, floor
    throw new NotImplementedException();
  }

  async update(LocationUpdateParameters: any) {
    // name, floor
    throw new NotImplementedException();
  }

  async delete(id: string) {
    // name, address, location, borders for each measurement
    throw new NotImplementedException();
  }

  async getAll() {
    throw new NotImplementedException();
  }
}

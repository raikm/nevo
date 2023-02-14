import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class MeasurementService {
  // TODO constructor() {}

  async getLastMeasurements(id: string) {
    throw new NotImplementedException();
  }

  async putNewMeasurements(id: string, measurements: any) {
    throw new NotImplementedException();
  }

  async getPlantMeasurmentsHistory(id: string, timespan: any) {
    throw new NotImplementedException();
  }
}

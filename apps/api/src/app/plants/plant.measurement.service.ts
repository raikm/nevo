import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class MeasurementService {
  // TODO constructor() {}

  async getLastMeasurements(plantId: string) {
    throw new NotImplementedException();
  }

  async putNewMeasurements(plantId: string, measurements: any) {
    throw new NotImplementedException();
  }

  async getPlantMeasurmentsHistory(plantId: string, timespan: any) {
    throw new NotImplementedException();
  }
}

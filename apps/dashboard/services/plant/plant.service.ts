import {
  Location,
  MiFloraDevice,
  Plant,
  PlantCreationParameters,
  PlantUpdateParameters
} from '@nevo/domain-types'
import axios from 'axios'
import config from '../../../../config.json'

export class PlantService {
  async create(parameters: PlantCreationParameters): Promise<Plant | null> {
    const reponse = await axios
      .post(`${config.api.baseUrl}/api/plants`, parameters)
      .catch((error: any) => {
        return Promise.reject(error)
      })

    return reponse.data
  }
  async update(id: string, parameters: PlantUpdateParameters): Promise<Plant | null> {
    const reponse = await axios
      .patch(`${config.api.baseUrl}/api/plants/${id}`, parameters)
      .catch((error: any) => {
        return Promise.reject(error)
      })

    return reponse.data
  }

  async discover(): Promise<MiFloraDevice[]> {
    const reponse = await axios
      .get<MiFloraDevice[]>(`${config.api.baseUrl}/api/plants/discover`)
      .catch((error: any) => {
        return Promise.reject(error)
      })
    console.log(reponse)
    return reponse.data
  }

  async getAll(): Promise<Plant[]> {
    const reponse = await axios.get(`${config.api.baseUrl}/api/plants`).catch((error: any) => {
      return Promise.reject(error)
    })
    return reponse.data
  }

  async getOne(id: string): Promise<Plant | null> {
    const reponse = await axios
      .get(`${config.api.baseUrl}/api/plants/${id}`)
      .catch((error: any) => {
        return Promise.reject(error)
      })
    return reponse.data
  }

  async delete(id: string): Promise<void> {
    const reponse = await axios
      .delete(`${config.api.baseUrl}/api/plants/${id}`)
      .catch((error: any) => {
        return Promise.reject(error)
      })
  }

  async getAllLocations(): Promise<Location[]> {
    const reponse = await axios
      .get<Location[]>(`${config.api.baseUrl}/api/location/`)
      .catch((error: any) => {
        return Promise.reject(error)
      })
    return reponse.data
  }
}

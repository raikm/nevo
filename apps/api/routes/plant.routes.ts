import { Context } from 'https://deno.land/x/oak@v11.1.0/context.ts'
import * as plantService from './../services/plant.service.ts'

export const getAllPlants = [
  (ctx: Context) => {
    const plants = plantService.getAllPlantMetadata()
    ctx.response.body = plants
  }
]

// * GET historical data from plant x

// * PUT new plant updates
export const putPlantMeasurements = [
  async (ctx: Context) => {
    try {
      if (!ctx.request.hasBody) {
        ctx.throw(415)
      }
      await plantService.putPlantMeasurements(await ctx.request.body().value)
      ctx.response.status = 200
    } catch {
      ctx.response.status = 500
      ctx.response.body = {
        success: false,
        message: 'Error while adding new plant measurements'
      }
    }
  }
]

// * GET miflora sensors who are not setuped

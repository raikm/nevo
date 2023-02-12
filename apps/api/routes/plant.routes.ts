import { Context } from 'https://deno.land/x/oak@v11.1.0/context.ts'
import * as plantService from './../services/plant.service.ts'

const getAllPlants = [
  (ctx: Context) => {
    const plants = plantService.getAllPlants()
    ctx.response.body = plants
  }
]

// * GET historical data from plant x

// * PUT new plant updates

// * GET miflora sensors who are not setuped

export { getAllPlants }

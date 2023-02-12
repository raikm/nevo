import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'

import * as plantRoutes from './plant.routes.ts'

const router: Router = new Router()

router.get('/plants', ...plantRoutes.getAllPlants)
router.put('/plantMeasurement', ...plantRoutes.putPlantMeasurements)

export { router }

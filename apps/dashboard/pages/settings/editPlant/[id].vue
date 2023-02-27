<script lang="ts" setup>
import { Location, PlantUpdateParameters } from '@nevo/domain-types'
import { usePlantService } from '~~/services/plant'

const router = useRouter()
const route = useRoute()
const plantService = usePlantService()

const plantUpdateParameters = ref<PlantUpdateParameters>({ name: '' })
const locations = ref<Location[]>()

const save = async () => {
  await plantService.update(route.params.id.toString(), plantUpdateParameters.value)
  router.back()
}

onMounted(async () => {
  locations.value = await plantService.getAllLocations()

  const plant = await plantService.getOne(route.params.id.toString())
  if (plant != null) {
    plantUpdateParameters.value.name = plant.name
    plantUpdateParameters.value.location = plant.location
  }
})
</script>

<template>
  <div v-if="plantUpdateParameters" class="add-new-plant-sensor-form">
    <input v-model="plantUpdateParameters.name" type="text" />
    <!-- location selector -->
    <select v-model="plantUpdateParameters.location">
      <option v-for="location in locations" :value="location">{{ location.name }}</option>
    </select>

    <button @click="save">Save</button>
  </div>
</template>

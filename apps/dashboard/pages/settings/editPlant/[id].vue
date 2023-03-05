<script lang="ts" setup>
import { Location, PlantUpdateParameters } from '@nevo/domain-types'
import { nvButton } from '@nevo/ui'
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

const blinking = async () => {
  await plantService.blinking(route.params.id.toString())
}

const remove = async () => {
  await plantService.delete(route.params.id.toString())
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
  <div class="plant-img-header-wrapper">
    <img
      class="plant-img-header"
      src="https://m.media-amazon.com/images/I/711pclXMNyL._AC_SL1500_.jpg"
      alt="W3Schools.com"
    />
  </div>
  <div v-if="plantUpdateParameters" class="edit-new-plant-sensor-form">
    <input v-model="plantUpdateParameters.name" type="text" />
    <!-- location selector -->
    <select v-model="plantUpdateParameters.location">
      <option v-for="location in locations" :value="location">{{ location.name }}</option>
    </select>

    <nv-button @click="save">Save</nv-button>
    <nv-button @click="blinking">Blink</nv-button>
    <button class="delete-button" @click="remove">✕</button>
  </div>
</template>

<style lang="scss">
.plant-img-header-wrapper {
  height: 22rem;
  overflow: hidden;
  border-radius: 10px;
}

.plant-img-header {
  width: 100%;
  object-fit: contain;
}

.edit-new-plant-sensor-form {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: auto 20% 5rem 5rem 3rem;
  gap: 1rem;
}

.blinking-button {
  color: rgb(172, 204, 215);
}
</style>

<template>
  <div class="nv-input-wrapper">
    <label class="nv-label-input">
      {{ label }}
    </label>
    <input class="nv-input" v-model="inputValue" type="text" />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, required: true }
})
const inputValue = ref(props.modelValue)

// updates modelValue if value gets changed from the editor window
watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue
  }
)

watch(
  () => inputValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)
</script>

<style lang="scss">
.nv-input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.nv-label-input {
  padding: 3px;
}

.nv-label-input {
  font-size: 0.8rem;
}
.nv-input {
  padding: 5px 10px;
  border-radius: 10px;
  border-style: none;
  min-height: 2rem;
  font-size: 1rem;
}

.nv-input:focus {
  outline-width: 0;
}
</style>

<template>
  <button :disabled="!isReady" @click="() => login()">Login with Google</button>
</template>

<script lang="ts" setup>
import {
  useCodeClient,
  type ImplicitFlowErrorResponse,
  type ImplicitFlowSuccessResponse
} from 'vue3-google-signin'
import { useCalendarService } from '~~/services/calendar'

const calendarService = useCalendarService()

const handleOnSuccess = async (response: ImplicitFlowSuccessResponse) => {
  localStorage.setItem('google_access_code', response.code)
  await calendarService.getGoogleToken()
}

const handleOnError = (errorResponse: ImplicitFlowErrorResponse) => {
  console.log('Error: ', errorResponse)
}

const { isReady, login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError
})
</script>

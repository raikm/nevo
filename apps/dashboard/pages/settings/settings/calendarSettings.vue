<template>
    <button :disabled="!isReady" @click="() => login()">Login with Google</button>
</template>

<script lang="ts" setup>
import {
useTokenClient, type AuthCodeFlowErrorResponse, type AuthCodeFlowSuccessResponse
} from "vue3-google-signin";


const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
    localStorage.setItem("google_access_token", response.access_token)
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});

</script>
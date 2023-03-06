import axios from 'axios'

export const useInterceptor = () => {
  /**
   * Configure axios with error handling
   */
  axios.interceptors.response.use(
    async (request) => request,
    async (error) => {
      console.log(`Error interceptor: ${error}`)

      if (!axios.isAxiosError(error)) {
        return Promise.reject(error)
      }

      if (error.response?.status === 404) {
        const message =
          error.response.data &&
          error.response.data === typeof 'object' &&
          (error.response.data as Error).message != null
            ? (error.response.data as Error).message
            : error.message

        // TODO show error
      }

      if (error.response && error.response.status >= 500) {
        const message =
          error.response.data &&
          error.response.data === typeof 'object' &&
          (error.response.data as Error).message != null
            ? (error.response.data as Error).message
            : error.message
        // TODO show error
      }
    }
  )
}

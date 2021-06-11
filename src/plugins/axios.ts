import ax from 'axios'

// insert all your axios logic here

export const axios = ax

export default {
    install (Vue) {
        Vue.prototype.$axios = ax
    }
}
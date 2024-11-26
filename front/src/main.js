import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useKakao } from 'vue3-kakao-maps/@utils'
useKakao('5c6ff48b64b92bb770446e41b1cc440f', ['clusterer','services','drawing'])

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars, faUser, faRightFromBracket, faPen, faPaw, faExclamation, faUpDown, faEyeSlash, faEye, faMagnifyingGlass, faCat, faCircleRight, faCircleLeft, faGamepad, faGifts, faAnglesLeft, faAnglesRight} from '@fortawesome/free-solid-svg-icons'
library.add(faBars,faUser,faRightFromBracket, faPen, faPaw, faExclamation, faUpDown, faEyeSlash, faEye,faMagnifyingGlass, faCat, faCircleRight, faCircleLeft, faGamepad, faGifts,faAnglesLeft, faAnglesRight)

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

// app.use(createPinia())
app.use(pinia)
app.use(router)
app.component("font-awesome-icon",FontAwesomeIcon)
app.mount('#app')

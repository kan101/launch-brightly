import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faAngleUp, faMagnifyingGlass, faXmark, } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleUp, faAngleDown, faMagnifyingGlass, faXmark)

import './style.css'
import App from './App.vue'

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

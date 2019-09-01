import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,// registrovanje rutera tj router: router iliti po es6 router. Elem, sa svakim instanciranjem Vue registrujemo i ruter
  render: h => h(App) 
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCroppie from 'vue-croppie'
import VueSweetAlert from 'vue-sweetalert'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueCookies from 'vue-cookies'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(VueAxios, axios)
Vue.use(VueCroppie)
Vue.use(VueSweetAlert)
Vue.use(Vuetify)
Vue.use(VueCookies)
Vue.use(ToggleButton)

window.$ = window.jQuery = require('jquery')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

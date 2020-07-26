import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';
import Vuex from 'vuex';
import { BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

Vue.use(require('vue-cookies'));
Vue.$cookies.config('7d')

Vue.use(new VueSocketIO({
  debug: true,
  // eslint-disable-next-line no-template-curly-in-string
  connection: 'https://ionos2.marcrufeis.de:3002',
  options: {},
}));

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: '',
    loggedIn: false,
    admin: false,
  }
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

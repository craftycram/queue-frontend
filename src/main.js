import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  // eslint-disable-next-line no-template-curly-in-string
  connection: 'https://ionos2.marcrufeis.de:3002',
  options: {},
}));

new Vue({
  render: h => h(App),
}).$mount('#app')

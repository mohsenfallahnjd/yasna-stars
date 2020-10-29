import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
import VueWait from 'vue-wait'
import './assets/css/style.css';

Vue.use(VueWait);
Vue.use(VueProgress)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
    wait: new VueWait({

        useVuex: false,
        vuexModuleName: 'wait',

        registerComponent: true,
        componentName: 'v-wait',

        registerDirective: true,
        directiveName: 'wait',

    }),
    render: h => h(App),
}).$mount('#app')
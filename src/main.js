/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import VDateRange from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

Vue.config.productionTip = false
Vue.use(VDateRange);
new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VDateRange from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

Vue.config.productionTip = false
Vue.use(VDateRange);
new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
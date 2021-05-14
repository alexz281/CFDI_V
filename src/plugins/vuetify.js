import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
//import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import en from 'vuetify/es5/locale/en';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: {
            es,
            en
        },
        current: 'es'
    }
});
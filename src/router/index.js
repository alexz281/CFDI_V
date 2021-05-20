import Vue from 'vue';
import VueRouter from 'vue-router';
import IssuedCFDIView from '@/views/IssuedCFDIView';

Vue.use(VueRouter);

const routes = [{
        path: '*',
        redirect: '/404'
    },
    {
        path: '/issued-cfdi',
        name: 'issued-cfdi',
        component: IssuedCFDIView,
        props: true
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
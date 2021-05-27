import Vue from 'vue';
import VueRouter from 'vue-router';
import IssuedCFDIView from '@/views/IssuedCFDIView';
import RecipCFDIView from '@/views/RecipCFDIView';
import ComplementReceiver from '@/views/ComplementReceiverCFDIView';
import ComplementFReceiver from '@/views/ComplementFReceiverCFDIView';
import ComplementIssued from '@/views/ComplementIssuedCFDIView';
import ComplementFIssued from '@/views/ComplementFIssuedCFDIView';

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
    },
    {
        path: '/recip-cfdi',
        name: 'recip-cfdi',
        component: RecipCFDIView,
        props: true
    },
    {
        path: '/complement-receiver',
        name: 'complement-receiver',
        component: ComplementReceiver,
        props: true
    },
    {
        path: '/complement-receiverF',
        name: 'complement-receiverF',
        component: ComplementFReceiver,
        props: true
    },
    {
        path: '/complement-issued',
        name: 'complement-issued',
        component: ComplementIssued,
        props: true
    },
    {
        path: '/complement-issuedF',
        name: 'complement-issuedF',
        component: ComplementFIssued,
        props: true
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
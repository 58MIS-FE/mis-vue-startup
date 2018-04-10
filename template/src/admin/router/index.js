import Vue from 'vue';
import VueRouter from 'vue-router';
import Log from '../../common/log';

Vue.use(VueRouter);

/* webpackChunkName: "home-index-component" */

const routes = [{
        path: '*',
        redirect: '/home'
    },
    {
        path: '/home',
        component: resolve => require(['../views/home/index.vue'],resolve)
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((route, from, next) => {
    let { meta } = route;

    meta.title && (window.document.title = meta.title);
    next();
});

router.afterEach((to, from) => {
    //pv 统计
    Log.init(to.path)

});
export default router;
import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../views/index';

Vue.use(VueRouter);

/* webpackChunkName: "home-index-component" */

const home = () =>
    import ('../views/home/index.vue');

const routes = [{
<<<<<<< HEAD
        path: '*',
        redirect: '/home'
    },
    {
        path: '/home',
        component: home
    }
];
=======
    path: '*',
    redirect: '/index'
},
{
    path: '/index',
    component: Index
}];
>>>>>>> dev-zz

const router = new VueRouter({
    routes
});

router.beforeEach((route, from, next) => {
    let { meta } = route;

    meta.title && (window.document.title = meta.title);
    next();
});

/*  可以作pv统计   */
router.afterEach((to, from) => {});

export default router;
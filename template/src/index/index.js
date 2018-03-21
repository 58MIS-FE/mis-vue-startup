import Vue from 'vue';
{{# if_eq ui 'element' }}
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
{{/if_eq}}
{{# if_eq ui 'iview' }}
import iView from 'iview';
import 'iview/dist/styles/iview.css';
{{/if_eq}}
import router from './router';
import App from './App';
{{# if_eq ui 'element' }}
Vue.use(ElementUI);
{{/if_eq}}
{{# if_eq ui 'iview' }}
Vue.use(iView);
{{/if_eq}}
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});

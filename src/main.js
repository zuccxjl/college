import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import MineGame from "./MineGame.vue";
import Login from "./views/login/login.vue";
import "./plugins/element.js";
import VueRouter from "vue-router";
import locale from "element-ui/lib/locale/lang/en";
import ElementUI from "element-ui";
import VueResource from 'vue-resource'


import axios from 'axios'

axios.defaults.withCredentials=true;  //跨域保存session有用
axios.defaults.baseURL="http://localhost:3000";
Vue.prototype.$reqs=axios;

Vue.use(ElementUI, { locale });
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;

/*引入页面*/

Vue.use(VueRouter);

// 路由配置
const Routers = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "首页"
    },
    //component: (resolve) => require(['./views/login/login.vue'], resolve)
    component: () => import("./views/login/login.vue")
  },
  {
    path: "/rank",
    name: "rank",
    meta: {
      title: "排行榜"
    },
    //component: (resolve) => require(['./views/login/login.vue'], resolve)
    component: () => import("./views/Rank.vue")
  },
  {
    path: "/recommend",
    name: "recommend",
    meta: {
      title: "游戏推荐"
    },
    //component: (resolve) => require(['./views/login/login.vue'], resolve)
    component: () => import("./views/Recommend.vue")
  },
  {
    path: "/rule",
    name: "rule",
    meta: {
      title: "规则"
    },
    //component: (resolve) => require(['./views/login/login.vue'], resolve)
    component: () => import("./views/Rule.vue")
  },
  {
    path: "/App",
    name: "App",
    meta: {
      title: "扫雷"
    },
    //component: (resolve) => require(['./App.vue'], resolve)
    component: () => import("./MineGame.vue")
  },
  {
    path: "/",
    redirect: "/login"
  }
];
const RouterConfig = {
  // 使用 HTML5 的 History 路由模式
  mode: "history",
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});

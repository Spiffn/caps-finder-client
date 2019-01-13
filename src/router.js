import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "about" */ './views/Settings.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import(/* webpackChunkName: "help" */ './views/Help.vue'),
    },
    {
      path: '/game/:room',
      name: 'game',
      component: () => import(/* webpackChunkName: "chat" */ './views/Game.vue'),
    },
    {
      path: '/play',
      name: 'rooms',
      component: () => import(/* webpackChunkName: "rooms" */ './views/JoinRoom.vue'),
    },
  ],
});

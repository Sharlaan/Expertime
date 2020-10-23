import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    alias: '/campaigns',
    name: 'campaigns',
    component: () => import('../components/CampaignsList.vue'),
  },
  {
    path: '/campaigns/:id',
    name: 'campaign-details',
    component: () => import('../components/Campaign.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

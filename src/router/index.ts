import { CAMPAIGNS_URL } from '@/config';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    alias: CAMPAIGNS_URL,
    name: 'campaigns',
    component: () => import('../components/CampaignsList.vue'),
  },
  // {
  //   path: `${CAMPAIGNS_URL}/:id`,
  //   name: 'campaign-details',
  //   component: () => import('../components/Campaign.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

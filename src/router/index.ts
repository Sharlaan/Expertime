import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/', // '/campaigns',
    name: 'campaigns',
    component: () => import('../views/CampaignsList.vue'),
  },
  {
    path: '/campaigns/:id',
    name: 'campaign-edit',
    component: () => import('../views/CampaignEditForm.vue'),
  },
];

const router = new VueRouter({
  // base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

export default router;

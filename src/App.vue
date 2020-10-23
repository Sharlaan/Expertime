<template>
  <v-app>
    <Header />

    <v-main>
      <CampaignsList />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/layout/Header.vue';
import CampaignsList from './components/CampaignsList.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    CampaignsList,
  },
});
</script>

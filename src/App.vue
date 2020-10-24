<template>
  <v-app>
    <Header />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/layout/Header.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
  },
});
</script>

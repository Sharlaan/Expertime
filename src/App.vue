<template>
  <v-app>
    <Header />

    <v-main>
      <router-view class="main-container"></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './views/layout/Header.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
  },
});
</script>

<style lang="scss" scoped>
.main-container {
  padding: 40px;
}
</style>

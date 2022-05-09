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
import { Options } from 'vue-property-decorator';
import Header from './components/layout/Header.vue';

@Options({
  components: { Header }
})
export default Vue.extend({
  name: 'App',
});
</script>

<style lang="scss" scoped>
.main-container {
  padding: 40px;
}
</style>

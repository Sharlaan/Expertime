<template>
  <header>
    <v-col cols="2" class="text-center">Status</v-col>
    <v-col flex-grow-1 style="border-left: 1px solid grey">Name</v-col>
    <v-col cols="2">Type</v-col>
    <v-col cols="2">Brand</v-col>
    <v-col cols="2">Submission</v-col>
    <v-col cols="1"></v-col>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ListHeader extends Vue {}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
}
</style>

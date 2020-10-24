<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
      class="rounded-lg"
      color="blue lighten-5"
      height="86"
    >
      <v-col cols="2">
        <v-layout column justify-center align-center>
          <v-icon large color="grey darken-1" v-if="campaign.requestStatus.name === 'TO_MODIFY'">
            mdi-timer-sand
          </v-icon>
          <v-icon
            large
            color="grey darken-1"
            v-else-if="campaign.requestStatus.name === 'SUBMITTED'"
          ></v-icon>
          <v-icon large color="grey darken-1" v-else-if="campaign.requestStatus.name === 'DRAFT'">
            mdi-timer-sand
          </v-icon>
          <v-icon
            large
            color="grey darken-1"
            v-else-if="campaign.requestStatus.name === 'TO_REVIEW'"
          >
            mdi-timer-sand
          </v-icon>
          <v-icon large color="green" v-else-if="campaign.requestStatus.name === 'VALIDATED'">
            mdi-check-circle-outline
          </v-icon>
          <v-icon large color="red darken-1" v-else-if="campaign.requestStatus.name === 'REJECTED'">
            mdi-close-circle-outline
          </v-icon>
          <span>{{ campaign.requestStatus.value }}</span>
        </v-layout>
      </v-col>
      <v-col flex-grow-1 style="border-left: 1px solid grey">
        <span>{{ campaign.campaignName }}</span>
      </v-col>
      <v-col cols="2">
        <v-chip
          :color="campaign.advice ? 'red' : 'blue-grey darken-1'"
          label
          text-color="white"
          small
        >
          {{ campaign.advice ? 'Advice' : 'Request' }}
        </v-chip>
      </v-col>
      <v-col cols="2">
        <span>{{ campaign.brand.name }}</span>
      </v-col>
      <v-col cols="2">
        <span>{{ campaign.submittedDate }}</span>
        <!-- <span>{{ format(c.submittedDate) }}</span> -->
      </v-col>
      <v-col cols="1">
        <v-layout justify-end>
          <v-icon x-large color="blue-grey lighten-2">
            mdi-chevron-right
          </v-icon>
        </v-layout>
      </v-col>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Campaign } from '@/interfaces/Campaign';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
  @Prop() campaign!: Campaign;
}
</script>

<style lang="scss" scoped>
.v-card {
  display: flex;
  align-items: center;
  border: 1px solid lightgrey;
}
</style>

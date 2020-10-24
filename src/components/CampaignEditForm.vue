<template>
  <section>
    <h4>Campaign Edit</h4>

    <form></form>
  </section>
</template>

<script lang="ts">
import { Campaign } from '@/interfaces/Campaign';
import { Component, Vue } from 'vue-property-decorator';
import { getCampaign } from '../services/campaigns.service';

// TODO: Since campaign-edit is tightly coupled to this list, maybe consider transforming it into a dialog instead of a full page, as suggested in https://vuetifyjs.com/en/components/data-tables/#crud-actions

@Component
export default class CampaignEditForm extends Vue {
  private currentCampaign: Campaign | null = null;

  mounted() {
    this.retrieveCampaign(+this.$route.params.id);
  }

  async retrieveCampaign(index: Campaign['requestId']) {
    try {
      this.currentCampaign = await getCampaign(index);
    } catch (error) {
      console.error(error);
    }
  }

  goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
  }
}
</script>

<style scoped></style>

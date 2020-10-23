<template>
  <div class="list">
    <section>
      <input type="text" placeholder="Search by name" v-model="query" />
      <select v-model="selectedBrand">
        <option selected></option>
        <option v-for="{ brandId, name } in brands" :key="brandId" :value="brandId">
          {{ name }}
        </option>
      </select>
      <button type="button" @click="search">Filter</button>
    </section>

    <section>
      <h4>Campaigns List</h4>
      <ul>
        <li
          v-for="(campaign, index) in campaigns"
          :key="index"
          @click="setActiveCampaign(campaign, index)"
        >
          {{ campaign.campaignName }}
        </li>
      </ul>
    </section>

    <section>
      <div v-if="currentCampaign">
        <h4>Campaign</h4>
        <div>
          <label> <strong>Status:</strong> </label>
          <span>{{ currentCampaign.requestStatus.name }}</span>
        </div>
        <div>
          <label> <strong>Name:</strong> </label>
          <span>{{ currentCampaign.campaignName }}</span>
        </div>
        <div>
          <label> <strong>Type:</strong> </label>
          <span>{{ currentCampaign.advice ? 'Advice' : 'Request' }}</span>
        </div>
        <div>
          <label> <strong>Name:</strong> </label>
          <span>{{ currentCampaign.brand.name }}</span>
        </div>
        <div>
          <label> <strong>Submission:</strong> </label>
          <span>{{ format(currentCampaign.submittedDate) }}</span>
        </div>
        <div>
          <label> <strong>Description:</strong> </label>
          <span>{{ currentCampaign.campaignDescription }}</span>
        </div>

        <a :href="`${CAMPAIGN_URL}/${currentCampaign.requestId}`">Edit</a>
      </div>
      <p v-else>Click on a Campaign...</p>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import format from 'date-fns/format';
import french from 'date-fns/locale/fr';
import { getAllBrands } from '@/services/brands.service';
import { getAllCampaigns } from '@/services/campaigns.service';
import { Campaign } from '@/interfaces/Campaign';
import { CAMPAIGNS_URL } from '@/config';
import { Brand } from '@/interfaces/Brand';

@Component
export default class CampaignsList extends Vue {
  private CAMPAIGN_URL = CAMPAIGNS_URL;
  private campaigns: Campaign[] = [];
  private brands: Brand[] = [];
  private currentCampaign: Campaign | null = null;
  private currentIndex = -1;
  private query = '';
  private selectedBrand?: Brand['brandId'] | null = null;

  mounted() {
    this.retrieveBrands();
    this.retrieveCampaigns();
  }

  async retrieveBrands() {
    try {
      this.brands = await getAllBrands();
    } catch (error) {
      console.error(error);
    }
  }

  async retrieveCampaigns() {
    try {
      this.campaigns = await getAllCampaigns();
    } catch (error) {
      console.error(error);
    }
  }

  setActiveCampaign(campaign: Campaign, index: number) {
    this.currentCampaign = campaign;
    this.currentIndex = index;
  }

  async search() {
    try {
      this.campaigns = await getAllCampaigns({ query: this.query, brandId: this.selectedBrand });
      console.log('search', this.campaigns);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Add resetFilters

  format(date: string | number | Date, dateFormat: string) {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date);
    return format(date, dateFormat, { locale: french });
  }
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>

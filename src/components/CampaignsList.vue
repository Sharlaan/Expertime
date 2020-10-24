<template>
  <div>
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
      <ul @click="goToDetails" class="list">
        <li v-for="c in campaigns" :key="c.requestId" :id="c.requestId">
          <div>
            <label> <strong>Status:</strong> </label>
            <span>{{ c.requestStatus.name }}</span>
          </div>
          <div>
            <label> <strong>Name:</strong> </label>
            <span>{{ c.campaignName }}</span>
          </div>
          <div>
            <label> <strong>Type:</strong> </label>
            <span>{{ c.advice ? 'Advice' : 'Request' }}</span>
          </div>
          <div>
            <label> <strong>Name:</strong> </label>
            <span>{{ c.brand.name }}</span>
          </div>
          <div>
            <label> <strong>Submission:</strong> </label>
            <span>{{ c.submittedDate }}</span>
            <!-- <span>{{ format(c.submittedDate) }}</span> -->
          </div>
          <div>
            <label> <strong>Description:</strong> </label>
            <span>{{ c.campaignDescription }}</span>
          </div>
        </li>
      </ul>
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

// TODO: Add resetFilters
// TODO: Add loading indicators
// TODO: Add pagination (exploit available filters in service's query params - _page & _limit)
// TODO: Add styles
// TODO: put brands in Store, since it is used in other components (retrieveBrands in App.mounted => actions => one single request for whole app with static content

@Component
export default class CampaignsList extends Vue {
  private CAMPAIGN_URL = CAMPAIGNS_URL;
  private campaigns: Campaign[] = [];
  private brands: Brand[] = [];
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

  goToDetails(event: PointerEvent) {
    const { id } = (event.target as HTMLElement).closest('li') as HTMLLIElement;
    this.$router.push({ name: 'campaign-edit', params: { id } });
  }

  async search() {
    try {
      this.campaigns = await getAllCampaigns({ query: this.query, brandId: this.selectedBrand });
    } catch (error) {
      console.error(error);
    }
  }

  // FIXME: RangeError: Format string contains an unescaped latin alphabet character `n`
  format(date: string | number | Date, dateFormat: string) {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date);
    return format(date, dateFormat, { locale: french });
  }
}
</script>

<style lang="scss" scoped>
.list {
  li {
    display: flex;
    align-items: center;
    border: 1px solid grey;
  }
  li ~ li {
    margin-top: 5px;
  }
}
</style>

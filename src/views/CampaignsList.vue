<template>
  <div>
    <h4>All requests</h4>

    <section class="filters-container">
      <span>Filters</span>
      <input type="text" placeholder="Search by name" v-model="query" />
      <select v-model="selectedBrand">
        <option :value="null">- brand -</option>
        <option v-for="{ brandId, name } in brands" :key="brandId" :value="brandId">
          {{ name }}
        </option>
      </select>
      <v-spacer></v-spacer>
      <v-btn @click="search" color="indigo darken-4">Filter</v-btn>
    </section>

    <section>
      <!-- REPLACE WITH VUETIFY DATATABLE (INCLUDING PAGINATION + FILTERS) -->
      <ListHeader />
      <ul @click="goToDetails" class="d-flex flex-column gutter px-0">
        <ListItem v-for="c in campaigns" :key="c.requestId" :id="c.requestId" :campaign="c" />
      </ul>
    </section>

    <v-pagination circle v-model="page" :length="totalPages"></v-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import format from 'date-fns/format';
import french from 'date-fns/locale/fr';
import { getAllBrands } from '@/services/brands.service';
import { getAllCampaigns } from '@/services/campaigns.service';
import { Campaign } from '@/interfaces/Campaign';
import { CAMPAIGNS_URL } from '@/config';
import { Brand } from '@/interfaces/Brand';
import ListHeader from '@/components/ListHeader.vue';
import ListItem from '@/components/ListItem.vue';

// TODO: Add resetFilters
// TODO: Add loading indicators
// TODO: Extend pagination with itemsPerPage selector (_limit)
// FIXME: changing page ignores filters, and vice-versa ... merge them.
// TODO: Add styles
// TODO: Put brands in Store, since it is used in other components (retrieveBrands in App.mounted => actions => one single request for whole app with static content

@Component({
  components: { ListHeader, ListItem },
})
export default class CampaignsList extends Vue {
  private CAMPAIGN_URL = CAMPAIGNS_URL;
  private campaigns: Campaign[] = [];
  private brands: Brand[] = [];
  private query = '';
  private selectedBrand?: Brand['brandId'] | null = null;
  private page = 1;
  private totalPages = 1;
  private itemsPerPage = 3;

  mounted() {
    this.retrieveBrands();
    this.retrieveCampaigns();
  }

  async retrieveBrands() {
    try {
      const { items } = await getAllBrands();
      this.brands = items;
    } catch (error) {
      console.error(error);
    }
  }

  async retrieveCampaigns(page = 1) {
    try {
      const { items, totalItems } = await getAllCampaigns({ page, limit: this.itemsPerPage });
      this.campaigns = items;
      this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    } catch (error) {
      console.error(error);
    }
  }

  async search() {
    try {
      const { items } = await getAllCampaigns({
        page: 1,
        query: this.query,
        brandId: this.selectedBrand,
      });
      this.campaigns = items;
    } catch (error) {
      console.error(error);
    }
  }

  @Watch('page', { immediate: true })
  onPageChange(newPage: number, prevPage: number) {
    this.retrieveCampaigns(newPage); // calls to fetch next page, which then will trigger a view refresh
  }

  goToDetails(event: PointerEvent) {
    const { id } = (event.target as HTMLElement).closest('.v-card') as HTMLLIElement;
    this.$router.push({
      name: 'campaign-edit',
      params: { id },
      // query: { brands: this.brands },
    });
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
.filters-container {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  > span:first-child {
    margin-right: 10px;
    text-transform: uppercase;
  }

  select,
  input {
    background-color: 'grey';
    border: 1px solid lightgrey;
    border-radius: 4px;
    padding: 5px 10px;
  }

  input {
    margin-right: 10px;
  }

  button {
    color: white;
    background-color: indigo;
    border-radius: 4px;
    padding: 5px 10px;
  }

  select:hover,
  button:hover {
    cursor: pointer;
  }
}

.gutter {
  .v-card ~ .v-card {
    margin-top: 10px;
  }
}

nav[role='navigation'] {
  margin-top: 20px;
}
</style>

<template>
  <section>
    <h4>Campaign Edit</h4>

    <v-form v-model="isValid" @submit.prevent="edit">
      <v-container fluid class="pa-0">
        <v-row align="center">
          <v-col cols="3">
            <v-subheader class="mb-8 pa-0">Brand *</v-subheader>
          </v-col>

          <v-col cols="9">
            <v-select
              :items="brands"
              v-model="brand"
              item-text="name"
              :rules="brandRules"
              color="blue-grey"
              background-color="blue-grey lighten-5"
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-subheader class="pa-0">Campaign name *</v-subheader>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          color="blue-grey"
          background-color="blue-grey lighten-5"
          outlined
          required
        ></v-text-field>

        <v-row class="ma-0">
          <v-col cols="6" v-for="{ mediaId, value } in medias" :key="mediaId" class="pa-0">
            <v-checkbox :label="value"></v-checkbox>
          </v-col>
        </v-row>

        <!-- <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="decisionDeadline"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-combobox
              v-model="decisionDeadline"
              label="Decision deadline"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              required
            ></v-combobox>
          </template>
          <v-date-picker v-model="decisionDeadline" no-title scrollable></v-date-picker>
        </v-menu> -->
      </v-container>
    </v-form>
  </section>
</template>

<script lang="ts">
import { Brand } from '@/interfaces/Brand';
import { Campaign, Media } from '@/interfaces/Campaign';
import { getAllBrands } from '@/services/brands.service';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getCampaign } from '../services/campaigns.service';
import MEDIAS from '../assets/medias';

// TODO: Since campaign-edit is tightly coupled to the CampaignList, maybe consider transforming it into a dialog instead of a full page, as suggested in https://vuetifyjs.com/en/components/data-tables/#crud-actions

@Component
export default class CampaignEditForm extends Vue {
  // @Prop() brands: Brand[] = [];

  private currentCampaign: Campaign | null = null;
  private isValid = false;
  private brands: Brand[] = [];
  private brand: Brand | null = null;
  private brandRules = [(v: Brand) => !!v || 'Brand is required, please select at least one'];
  private name: Campaign['campaignName'] | null = null;
  private nameRules = [
    (v: string) => !!v || 'Name is required',
    // (v: string) => v.length <= 20 || 'Name must be less than 20 characters',
  ];
  private medias: Media[] = this.rearrangeMedias();
  private media: Media[] = [];
  private mediaRules = [(v: Media) => !!v || 'Media is required, please select at least one'];
  private decisionDeadlineRules = [(v: Date) => !!v || 'Deadline is required'];

  mounted() {
    // this.brands = this.$route.query.brands as Brand[]; // Better option: use VueX Store
    this.retrieveBrands();
    this.retrieveCampaign(+this.$route.params.id);
  }

  async retrieveBrands() {
    try {
      const { items } = await getAllBrands();
      this.brands = items;
    } catch (error) {
      console.error(error);
    }
  }

  async retrieveCampaign(index: Campaign['requestId']) {
    try {
      const { items } = await getCampaign(index);
      this.currentCampaign = items;
    } catch (error) {
      console.error(error);
    }
  }

  @Watch('currentCampaign', { immediate: true, deep: true })
  onCurrentCampaignChanged(val: Campaign[], oldVal: Campaign[]) {
    if (val) {
      this.brand = val[0].brand;
      this.name = val[0].campaignName;
    }
  }

  // edit(event: any) {}

  /** Sort MEDIAS alphabetically on value, then append Others, then display them inline + flexwrap */
  rearrangeMedias() {
    const rearrangedMedias = [...MEDIAS];
    const othersMedia = rearrangedMedias.splice(
      MEDIAS.findIndex((m) => m.value === 'Others'),
      1,
    )[0];
    return rearrangedMedias
      .sort((a: Media, b: Media) => (a.value > b.value ? 1 : -1))
      .concat(othersMedia);
  }

  goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
  }
}
</script>

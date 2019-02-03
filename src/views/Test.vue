<template>
  <v-container fill-height fluid>
    <v-layout>
      <v-flex sm8>
        <v-card height="100%" class="pa-3">
          <playing-card class="playing-card" :rank="rank" :suit="suit"/>
          <v-select :items="ranks" v-model="rank"/>
          <v-select :items="suits" v-model="suit"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PlayingCard from '@/components/PlayingCard.vue';

export default {
  components: { PlayingCard },
  data: () => ({
    rank: 'A',
    suit: 'S',
    ranks: '23456789TJQKA'.split(''),
    suits: 'SDHC'.split(''),
  }),
};
</script>

<style>
</style>

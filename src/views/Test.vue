<template>
  <v-container fill-height fluid>
    <v-layout>
      <v-flex sm8>
        <v-card height="100%" class="pa-3">
          <playing-card class="playing-card" :rank="rank" :suit="suit"/>
          <v-select :items="ranks" item-text="name" item-value="value" v-model="rank"/>
          <v-select :items="suits" item-text="name" item-value="value" v-model="suit"/>
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
    c: false,
    rank: 1,
    suit: 'S',
    ranks: [
      { name: 'Ace', value: 1 },
      { name: '2', value: 2 },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 },
      { name: '6', value: 6 },
      { name: '7', value: 7 },
      { name: '8', value: 8 },
      { name: '9', value: 9 },
      { name: '10', value: 10 },
      { name: 'Jack', value: 11 },
      { name: 'Queen', value: 12 },
      { name: 'King', value: 13 },
    ],
    suits: [
      { name: 'Spades ♠', value: 'S' },
      { name: 'Diamonds ♦', value: 'D' },
      { name: 'Hearts ♥', value: 'H' },
      { name: 'Clubs ♣', value: 'C' },
    ],
  }),
};
</script>

<style>
</style>

<template>
  <v-container fill-height fluid>
    <v-layout>
      <v-flex sm8 pr-3>
        <v-card height="100%">

        </v-card>
      </v-flex>
      <v-flex xs12 sm4>
        <room/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Room from '@/components/Room.vue';

export default {
  components: { Room },

  mounted() {
    if (!document.documentElement.classList.contains('no-scroll')) {
      document.documentElement.classList.toggle('no-scroll');
    }
  },

  destroy() {
    if (document.documentElement.classList.contains('no-scroll')) {
      document.documentElement.classList.toggle('no-scroll');
    }
  },
};
</script>

<style>
  .no-scroll {
    overflow-y: hidden;
  }
</style>

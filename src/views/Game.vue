<template>
  <v-container fill-height>
    <v-layout px-3>
      <v-flex pt-5 sm8 pr-2>
        <v-card height="100%">

        </v-card>
      </v-flex>
      <v-flex pt-5 xs12 sm4>
        <room/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Room from '@/components/Room.vue';

export default {
  components: { Room },
};
</script>

<style>

</style>

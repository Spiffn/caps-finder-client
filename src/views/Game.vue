<template>
  <v-container fill-height fluid>
    <room/>
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

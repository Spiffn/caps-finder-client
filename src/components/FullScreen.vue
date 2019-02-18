<template>
  <v-container fill-height fluid>
    <slot/>
  </v-container>
</template>

<script>

export default {

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

<template>
  <div class="create-room-button">
    <button> Create room </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    websocket: null,
  }),

  computed: {
  },

  mounted() {
    console.log('Mounted');
  },
};
</script>

<style>
</style>

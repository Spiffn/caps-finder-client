<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex pt-5 mt-5 xs12 sm6>
        <create-room/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CreateRoom from '@/components/CreateRoom.vue';
import ACTIONS from '@/routerActions';

export default {
  components: { CreateRoom },

  mounted() {
    this.$store.dispatch(ACTIONS.INITIALIZE_USERNAME);
  },

  methods: {
  },
};
</script>

<style>

</style>

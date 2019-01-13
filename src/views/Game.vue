<template>
  <v-layout>
    <v-flex pt-5 xs12 sm4 offset-sm8>
      <chat-box/>
    </v-flex>
  </v-layout>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue';

export default {
  components: { ChatBox },
};
</script>

<style>

</style>

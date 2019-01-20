<template>
  <v-card height="100%" class="flexcard">
    <v-card-title>
      <h3>Room: {{ $route.params.room }}</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-flex class="scroll">
      <v-card v-for="item in items" :key="item.id">
        <v-card-text>
          <chat-message
            :user="item.user"
            :date="item.timestamp"
            :text="item.payload"
            :type="item.type"/>
        </v-card-text>
        <v-divider/>
      </v-card>
    </v-flex>
    <v-card-actions>
      <v-text-field
        v-model="message"
        append-outer-icon="send"
        box
        clearable
        label="Message"
        type="text"
        @click:append-outer="sendMessage"
        @click:clear="clearMessage"
        @keyup.enter="sendMessage"
      ></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
import ChatMessage from './ChatMessage.vue';

export default {
  components: { ChatMessage },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    message: '',
  }),

  methods: {
    sendMessage() {
      if (!this.message) {
        return;
      }
      this.$emit('message', this.message);
      this.clearMessage();
    },
    clearMessage() {
      this.message = '';
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
  flex: 1 1 auto;
  min-height: 0;
}

.flexcard {
  display: flex;
  flex-direction: column;
}
</style>

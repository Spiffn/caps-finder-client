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
    <v-flex mt-3>
    <v-card-actions class="actions">
      <v-textarea
        box
        v-model="message"
        append-outer-icon="send"
        clearable
        :rules="rules"
        counter="250"
        label="Message"
        type="text"
        rows="2"
        @click:append-outer="sendMessage"
        @click:clear="clearMessage"
        @keyup.enter="sendMessage"
      ></v-textarea>
    </v-card-actions>
    </v-flex>
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
    rules: [v => v.length <= 250 || 'Max 250 characters'],
  }),

  methods: {
    sendMessage() {
      if (!this.message || this.message.length > 250) {
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

.actions {
  height: 100px;
}
</style>

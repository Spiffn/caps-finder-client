<template>
  <v-card height="100%" class="flexcard">
    <v-card-title class="no-flex">
      <h3>Room: {{ $route.params.room }}</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout ref="chatMessages" class="scroll">
      <v-flex>
        <v-hover v-for="(item, index) in items" :key="item.id">
          <v-card
            slot-scope="{ hover }"
            :class="[hover ? 'darken-2' : 'darken-3', 'grey']"
          >
            <v-card-text class="break-word">
              <chat-message
                :user="item.user"
                :date="item.timestamp"
                :text="item.payload"
                :type="item.type"
                :showSender="showSender(item, items[index-1])"/>
            </v-card-text>
            <v-divider/>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
    <v-card-actions class="no-flex">
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
    showSender(current, previous) {
      if (!previous) {
        return true;
      }
      return current.type !== previous.type || current.user !== previous.user;
    },
  },

  watch: {
    items() {
      this.$nextTick()
        .then(() => {
          const container = this.$refs.chatMessages;
          container.scrollTop = container.scrollHeight;
        });
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}

.flexcard {
  display: flex;
  flex-direction: column;
}

.break-word{
  overflow-wrap: break-word;
}

.no-flex {
  flex: none;
}
</style>

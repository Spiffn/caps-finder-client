<template>
  <v-card height="100%" class="flexcard">
    <v-layout ref="chatMessages" class="scroll full-height">
      <v-flex>
        <v-hover v-for="(item, index) in chatItems" :key="item.id+item.payload">
          <chat-message
            slot-scope="{ hover }"
            :class="[hover ? 'darken-2' : 'darken-3', 'grey']"
            :user="item.user"
            :date="item.timestamp"
            :text="item.payload"
            :type="item.type"
            :showSender="showSender(item, items[index-1])"/>
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
import _ from 'lodash';
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

  computed: {
    chatItems() {
      return _.filter(this.items, item => typeof (item.payload) === 'string');
    },
  },

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

<style>
.full-height {
  height: 100%;
}

.v-window {
  padding-bottom: 72px;
}

.v-window, .v-window__container, .v-window-item {
  height: 100%;
}

.scroll {
  overflow-y: auto;
}

.flexcard {
  display: flex;
  flex-direction: column;
}

.no-flex {
  flex: none;
}
</style>

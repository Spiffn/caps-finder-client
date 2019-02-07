<template>
  <v-card height="100%" class="flexcard">
    <v-card-title class="no-flex">
      <v-layout>
        <v-flex>
          <h3>
            Room: {{ $route.params.room }}
            <v-tooltip top>
              <v-btn slot="activator" flat icon @click="copy">
                <v-icon>file_copy</v-icon>
              </v-btn>
              <span>Copy room to clipboard</span>
            </v-tooltip>
            <v-snackbar v-model="copied" :timeout="2000" top>
              <span>
                <a :href="url">{{ url }}</a>
                has been copied to the clipboard
              </span>
            </v-snackbar>
          </h3>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout ref="chatMessages" class="scroll">
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

const copyStringToClipboard = (str) => {
  // Create new element
  const el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el);
};

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
    copied: false,
  }),

  computed: {
    url() {
      return window.location.toString();
    },
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
    copy() {
      copyStringToClipboard(this.url);
      this.copied = true;
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

.no-flex {
  flex: none;
}
</style>

<template>
  <v-card height="100%" class="flexcard">
    <v-card-title>
      <h3>Room: {{ $route.params.room }}</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-list class="scroll">
      <template v-for="(item, index) in items">
        <v-list-tile
          :key="item.id"
          avatar
          ripple
        >
          <v-list-tile-content>
            <v-list-tile-title>
              <chat-message
                :user="item.user"
                :date="item.timestamp"
                :text="item.payload"
                :type="item.type"/>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
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
  max-height: 60vh;
}

.flexcard {
  display: flex;
  flex-direction: column;
}
</style>

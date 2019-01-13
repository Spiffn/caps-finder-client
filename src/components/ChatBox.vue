<template>
  <v-card>
    <v-card-title>
      <h3>Room: {{ $route.params.room }}</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-list>
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
                :text="item.text"
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
  data: () => ({
    message: '',
    items: [
    ],
    websocket: null,
  }),

  mounted() {
    this.connectToWebsocket();
  },

  destroyed() {
    this.websocket.close();
  },

  methods: {
    connectToWebsocket() {
      const wsurl = `ws://${window.location.hostname}:8081/${this.$route.params.room}`;
      this.websocket = new WebSocket(wsurl);
      this.websocket.onmessage = this.handleMessage;
    },
    handleMessage(response) {
      const data = this.deserialize(response.data);
      if (data.type === 'message' || data.type === 'status' || data.type === 'announcement') {
        this.addMessage(data);
      }
    },
    sendMessage() {
      if (!this.message) {
        return;
      }
      this.websocket.send(this.serializeMessage(this.message));
      this.clearMessage();
    },
    clearMessage() {
      this.message = '';
    },
    addMessage(message) {
      this.items.push(
        {
          id: message.timestamp,
          timestamp: new Date(message.timestamp),
          user: message.user,
          text: message.payload,
          type: message.type,
        },
      );
    },
    deserialize(data) {
      return JSON.parse(data);
    },
    serializeMessage(message) {
      // TODO: Add more data to send.
      const data = {
        id: new Date().getTime(),
        type: 'message',
        payload: message,
      };

      const i = message.indexOf(' ');

      if (message.startsWith('/') && i > -1) {
        data.type = message.substring(1, i);
        data.payload = message.substring(i + 1);
      }
      return Buffer.from(JSON.stringify(data));
    },
  },
};
</script>

<style scoped>
</style>

<template>
  <v-layout>
    <v-flex sm8 pr-3>
      <v-card height="100%">
        <pre>{{ gameData }}</pre>
        {{ cardsInHand }}
      </v-card>
    </v-flex>
    <v-flex xs12 sm4>
      <chat-box :items="items" @message="sendMessage" />
    </v-flex>
  </v-layout>
</template>

<script>
import 'url';
import ChatBox from './ChatBox.vue';
import ACTIONS from '@/routerActions';

export default {
  components: { ChatBox },

  data: () => ({
    websocket: null,
    items: [],
    cardsInHand: [],
    gameData: {},
  }),

  mounted() {
    const { room } = this.$route.params;
    const user = this.$store.dispatch(ACTIONS.INITIALIZE_USERNAME);

    this.$http.get(`room/${room}/history`).then((resp) => {
      this.items = resp.data.history.map(message => ({
        id: message.timestamp,
        timestamp: new Date(message.timestamp),
        user: message.user,
        payload: message.payload,
        type: message.type,
      }));
    });

    this.$http.get(`room/${room}/user/${user}`).then((resp) => {
      // Connecting to the server for the first time
      if (!resp.data.userExists) {
        this.connectToWebsocket();
      }
    });
  },

  destroyed() {
    this.websocket.close();
  },

  methods: {
    connectToWebsocket() {
      const wsUrl = new URL('/connect', `ws://${window.location.hostname}:8081`);
      wsUrl.search = new URLSearchParams({
        room: this.$route.params.room,
        user: this.$store.getters.username,
      });
      this.websocket = new WebSocket(wsUrl);
      this.websocket.onmessage = this.handleMessage;
    },

    handleMessage(response) {
      const data = this.deserialize(response.data);
      console.log(data);
      if (data.type === 'message' || data.type === 'status' || data.type === 'announcement') {
        this.addMessage(data);
      }
      if (data.type === 'gameUpdate') {
        this.gameData = data.payload;
      }
      if (data.type === 'handUpdate') {
        this.cardsInHand = data.payload;
      }
    },

    sendMessage(message) {
      this.websocket.send(this.serializeMessage(message));
    },

    addMessage(message) {
      this.items.push(
        {
          id: message.timestamp,
          timestamp: new Date(message.timestamp),
          user: message.user,
          payload: message.payload,
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

      if (message.startsWith('/')) {
        if (i > -1) {
          data.type = message.substring(1, i);
          data.payload = message.substring(i + 1);
        } else {
          data.type = message.substring(1);
          data.payload = null;
        }
      }
      return Buffer.from(JSON.stringify(data));
    },
  },
};
</script>

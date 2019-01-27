<template>
  <chat-box :items="items" @message="sendMessage" />
</template>

<script>
import ChatBox from './ChatBox.vue';
import ACTIONS from '@/routerActions';

export default {
  components: { ChatBox },

  data: () => ({
    websocket: null,
    items: [],
  }),

  mounted() {
    console.log(process.env.VUE_APP_API_ROOT);
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
      const wsurl = `${process.env.VUE_APP_WS_ROOT}/connect?room=${this.$route.params.room}&user=${this.$store.getters.username}`;
      this.websocket = new WebSocket(wsurl);
      this.websocket.onmessage = this.handleMessage;
    },

    handleMessage(response) {
      const data = this.deserialize(response.data);
      if (data.type === 'message' || data.type === 'status' || data.type === 'announcement') {
        this.addMessage(data);
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

      if (message.startsWith('/') && i > -1) {
        data.type = message.substring(1, i);
        data.payload = message.substring(i + 1);
      }
      return Buffer.from(JSON.stringify(data));
    },
  },
};
</script>

<style>

</style>

<template>
  <chat-box :items="items" @message="sendMessage" />
</template>

<script>
import ChatBox from './ChatBox.vue';

export default {
  components: { ChatBox },

  data: () => ({
    websocket: null,
    items: [],
  }),

  mounted() {
    this.$http.get(`room/${this.$route.params.room}/history`).then((resp) => {
      this.items = resp.data.history.map(message => ({
        id: message.timestamp,
        timestamp: new Date(message.timestamp),
        user: message.user,
        payload: message.payload,
        type: message.type,
      }));
    });
    this.connectToWebsocket();
    console.log("MOUNTED");
  },

  updated() {
    console.log("UPDATED");
  },
 
  destroyed() {
    console.log("EEEEp");
    this.websocket.close();
    console.log("DESTROYED");
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

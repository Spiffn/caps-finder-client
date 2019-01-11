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
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
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


export default {
  data: () => ({
    message: '',
    items: [
    ],
    websocket: null,
  }),

  computed: {
  },

  mounted() {
    this.connectToWebsocket();
  },

  methods: {
    connectToWebsocket() {
      const wsurl = `ws://localhost:8081/${this.$route.params.room}`;
      this.websocket = new WebSocket(wsurl);
      this.websocket.onmessage = response => this.addMessage(response.data);
    },
    sendMessage() {
      if (!this.message) {
        return;
      }
      this.websocket.send(this.message);
      this.numMessages += 1;
      this.clearMessage();
    },
    clearMessage() {
      this.message = '';
    },
    addMessage(message) {
      this.items.push({ id: new Date().getTime(), text: message });
    },
  },
};
</script>

<style scoped>
</style>

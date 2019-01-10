<template>
  <v-card>
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
        clear-icon="cancel"
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
const wsurl = 'ws://localhost:8081';
const websocket = new WebSocket(wsurl);

export default {
  data: () => ({
    password: 'Password',
    show: false,
    message: '',
    marker: true,
    items: [
    ],
    websocket: null,
  }),

  computed: {
  },

  mounted() {
    console.log('mounted');
    websocket.onmessage = response => this.addMessage(response.data);
  },

  methods: {
    sendMessage() {
      if (!this.message) {
        return;
      }
      websocket.send(this.message);
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

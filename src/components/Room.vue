<template>
  <v-layout>
    <v-flex sm8 pr-3>
      <v-card height="100%">
        <v-layout align-center justify-space-between column fill-height>
          <v-flex>
            <div class="pr-5 pt-5 mr-5 pl-3">
              <div
                v-for="card in cardsPlayed"
                class="card-wrapper"
                :key="card.suit + card.rank.toString()">
                <playing-card
                  v-bind="card" />
              </div>
            </div>
            <pre>{{ gameData }}</pre>
            <div class="pr-5 mr-5 pl-3">
              <div
                v-for="card in hand"
                class="card-wrapper"
                :key="card.suit + card.rank.toString()">
                <playing-card
                  v-model="selectedCards"
                  :value="card.val"
                  v-bind="card" />
              </div>
            </div>
          </v-flex>
          <div class="pb-5">
            <v-btn @click="performAction">
              {{ action.text }}
            </v-btn>
          </div>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12 sm4>
      <chat-box :items="items" @message="sendMessage" />
    </v-flex>
  </v-layout>
</template>

<script>
import 'url';
import _ from 'lodash';
import ChatBox from './ChatBox.vue';
import ACTIONS from '@/routerActions';
import PlayingCard from './PlayingCard.vue';

const rankToNum = (rank) => {
  switch (rank) {
    case 'A':
      return 1;
    case 'T':
      return 10;
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    default:
      return parseInt(rank, 10);
  }
};

export default {
  // Add PlayingCard to components when ready
  components: { ChatBox, PlayingCard },

  data: () => ({
    websocket: null,
    items: [],
    hand: [],
    selectedCards: [],
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

  computed: {
    cardsPlayed() {
      if (!this.gameData || !this.gameData.cardsPlayed) {
        return [];
      }
      return _.map(_.flatten(this.gameData.cardsPlayed), card => ({
        rank: rankToNum(card.substring(0, 1)),
        suit: card.substring(1),
        val: card,
      }));
    },

    action() {
      if (!this.gameData.state || (this.gameData.state
      && this.gameData.state === 'STANDBY')) {
        return { text: 'start game', type: 'start' };
      }
      if (this.selectedCards.length === 0) {
        return { text: 'pass', type: 'skip' };
      }
      return { text: 'play', type: 'play' };
    },
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

    performAction() {
      const timestamp = new Date();
      const { type } = this.action;
      let payload = null;
      switch (this.action.type) {
        case 'start':
          break;
        case 'play':
          payload = this.selectedCards.join(',');
          this.selectedCards = [];
          break;
        case 'skip':
          break;
        default:
          return;
      }
      const command = {
        timestamp,
        payload,
        type,
      };
      console.log({ command });
      this.sendCommand(command);
    },

    handleMessage(response) {
      const data = this.deserialize(response.data);
      if (data.type === 'message' || data.type === 'status' || data.type === 'announcement') {
        this.addMessage(data);
      }
      if (data.type === 'gameUpdate') {
        this.gameData = data.payload;
      }
      if (data.type === 'handUpdate') {
        this.hand = _.map(data.payload, card => ({
          rank: rankToNum(card.substring(0, 1)),
          suit: card.substring(1),
          val: card,
        }));
      }
    },

    sendMessage(message) {
      this.websocket.send(this.serializeMessage(message));
    },

    sendCommand(data) {
      this.websocket.send(Buffer.from(JSON.stringify(data)));
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

    shouldBeSelected(val) {
      return this.selectedCards.includes(val);
    },

    updateVals(e) {
      const isSelected = e.target.selected;
      const val = e.target.value;

      if (isSelected) {
        this.selectedCards.push(val);
      } else {
        this.selectedCards.splice(this.selectedCards.indexOf(val));
      }
    },
  },
};
</script>

<style>
  .smol {
    transform: scale(0.3);
  }
  .card-wrapper {
    width: 30px;
    display: inline-block;
  }
</style>

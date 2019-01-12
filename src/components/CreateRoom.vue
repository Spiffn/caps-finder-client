<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Join a Room</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
            prepend-icon="group_work"
            clearable
            name="room"
            label="Room ID"
            type="text"
            v-model="roomId"
            @keyup.enter="joinRoom(roomId)">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" @click="createRoom">
              Create
              <v-icon right>group_add</v-icon>
            </v-btn>
            <v-btn
            @click="joinRoom(roomId)"
            :disabled="!canJoin">
              Join
              <v-icon right>group</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    websocket: null,
    roomId: '',
    roomList: [],
  }),

  mounted() {
    this.$http.get('rooms')
      .then((res) => {
        this.roomList = res.data.rooms;
        console.log(this.roomList);
      });
  },

  computed: {
    canJoin() {
      // getting all room ids for now
      // TODO: turn into an async property
      return this.roomList.includes(this.roomId);
    },
  },

  methods: {
    createRoom() {
      this.$http.get('room/new')
        .then(res => this.$router.push(`/chat/${res.data.id}`));
    },
    joinRoom(id) {
      if (this.canJoin) {
        this.$router.push(`/chat/${id}`);
      }
    },
  },
};
</script>

<style>
</style>

<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Join a Room</v-toolbar-title>
          </v-toolbar>
          <v-autocomplete
            class="px-2"
            prepend-icon="meeting_room"
            v-model="roomId"
            label="Room ID"
            @keyup.enter="joinRoom(roomId)"
            :items="this.roomList"
          >
          </v-autocomplete>
          <v-list>
            <v-list-tile
              v-for="roomId in this.roomList"
              :key="roomId"
              @click="joinRoom(roomId)"
            >
              <v-list-tile-content>
                <v-list-tile-title v-text="roomId"></v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>
          </v-list>
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

  methods: {
    createRoom() {
      this.$http.get('room/new')
        .then(res => this.$router.push(`/chat/${res.data.id}`));
    },
    canJoin(id) {
      // getting all room ids for now
      // TODO: turn into an async property
      return this.roomList.includes(id);
    },
    joinRoom(id) {
      if (this.canJoin(id)) {
        this.$router.push(`/game/${id}`);
      }
    },
  },
};
</script>

<style>
</style>

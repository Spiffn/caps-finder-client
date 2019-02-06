<template>
  <div
    class="container py-1 px-3"
    @mouseover="hovering = true"
    @mouseout="hovering = false">
    <div class="side">
      <img v-if="type==='message' && showSender" :src="avatar" :alt="user">
      <v-tooltip
        top
        :class="[hovering || type!=='message' ? 'd-inline' : 'd-none']"
        v-if="type!=='message' || !showSender">
        <small slot="activator">{{ date | shortDate }}</small>
        <h3>{{ date | longDate }}</h3>
      </v-tooltip>
    </div>
    <div class="message">
      <div v-if="type==='message'">
        <div v-if="showSender">
          <span>
            <b>{{ user }} </b>
            <v-tooltip top>
              <small slot="activator">{{ date | shortDate }}</small>
              <h3>{{ date | longDate }}</h3>
            </v-tooltip>
          </span>
        </div>
        <div class="text">
          {{ text }}
        </div>
      </div>
      <div v-else-if="type==='status'">
        <div class="text">
          <i>{{ user }} is {{ text }}</i>
        </div>
      </div>
      <div class="text" v-else-if="type==='announcement'">
        <b><i>{{ text }}</i></b>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

const avatarSize = 54;

export default {
  props: {
    text: String,
    date: Date,
    user: String,
    type: {
      type: String,
      default: 'message',
    },
    showSender: { // unused for now, but useful in case we don't want to show metadata
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    hovering: false,
  }),

  computed: {
    avatar() {
      return `https://identicon-api.herokuapp.com/${this.user}/${avatarSize}?format=png`;
    },
  },

  filters: {
    shortDate(val) {
      return moment(val).format('h:mm A');
    },
    longDate(val) {
      return moment(val).format('MMM Do [at] h:mm A');
    },
    noBreak(val) {
      return val.replace(/ /g, '\u00a0');
    },
  },
};
</script>

<style scoped>
.message-metadata {
  font-size: 0.75em;
}

.text {
  hyphens: auto;
}

.message {
  word-wrap: break-word;
  word-break: break-all;
}

.container {
  grid-template-columns: 70px 1fr;
  display: grid;
  width: 100%;
  font-size: 18px;
}

</style>

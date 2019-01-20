<template>
  <div>
    <div v-if="type==='message'">
      <div class="message-metadata">
        {{ user }} @ {{ date | shortDate }}:
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
    <div v-else-if="type==='announcement'">
      <div class="text">
        <b><i>{{ text }}</i></b>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

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

  filters: {
    shortDate(val) {
      return moment(val).format('h:mm a');
    },
  },
};
</script>

<style>
.message-metadata {
  font-size: .75em;
}

.text {
  hyphens: auto;
}
</style>

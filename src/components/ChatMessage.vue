<template>
  <span>
    <span v-if="type==='message'">
      <div class="message-metadata">
        {{ user }} at {{ date | shortDate }}
      </div>
      <div class="text">
        {{ text }}
      </div>
    </span>
    <span v-else-if="type==='status'">
      <div class="text">
        <i>{{ user }} is {{ text }}</i>
      </div>
    </span>
    <span v-else-if="type==='announcement'">
      <div class="text">
        <b><i>{{ text }}</i></b>
      </div>
    </span>
  </span>
</template>

<script>
import dateFormat from 'dateformat';

export default {
  props: {
    text: String,
    date: Date,
    user: String,
    type: {
      type: String,
      default: 'message',
    },
  },
  filters: {
    shortDate(val) {
      return dateFormat(val, 'h:MM TT');
    },
  },
};
</script>

<style>
.message-metadata {
  font-size: 75%;
}

.text {
  hyphens: auto;
}
</style>

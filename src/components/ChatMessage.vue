<template>
  <span>
    <span v-if="type==='message'">
      <div class="message-metadata">
        {{ user }} at {{ date | shortDate }}
      </div>
      {{ text }}
    </span>
    <span v-else-if="type==='status'">
      <i>{{ user }} is {{ text }}</i>
    </span>
    <span v-else-if="type==='announcement'">
      <b><i>{{ text }}</i></b>
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
</style>

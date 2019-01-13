<template>
  <span>
    <span v-if="type==='message'">
      {{ user }} at {{ date | shortDate }} : {{ text }}
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

</style>

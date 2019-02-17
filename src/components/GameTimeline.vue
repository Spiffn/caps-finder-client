<template>
  <v-timeline align-top dense>
    <v-timeline-item
      v-for="(item, index) in eventItems"
      :key="index"
      :color="item.color"
      icon="star"
      fill-dot
      small>
      <v-layout pt-3>
        <v-flex xs3>
          <strong>{{ item.timestamp | shortDate }}</strong>
        </v-flex>
      <v-flex>
        <strong>{{ item.payload }}</strong>
      </v-flex>
      </v-layout>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    eventItems() {
      const announcements = _.filter(this.items, item => item.type === 'announcement');
      for (let i = 0; i < announcements.length; i += 1) {
        if (i % 2 === 0) {
          announcements[i].color = 'green';
        } else {
          announcements[i].color = 'purple';
        }
      }
      console.log(announcements);
      return announcements;
    },
  },

  filters: {
    shortDate(val) {
      return moment(val).format('h:mm A');
    },
  },
};
</script>

<style>

</style>

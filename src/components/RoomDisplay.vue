<template>
  <v-toolbar-title v-if="$route.params.room">
    Room: {{ $route.params.room }}
    <v-tooltip top>
      <v-btn slot="activator" flat icon @click="copy">
        <v-icon>file_copy</v-icon>
      </v-btn>
      <span>Copy room to clipboard</span>
    </v-tooltip>
    <v-snackbar v-model="copied" :timeout="2000" top>
      <span>
        <a :href="url">{{ url }}</a>
        has been copied to the clipboard
      </span>
    </v-snackbar>
  </v-toolbar-title>
</template>

<script>
const copyStringToClipboard = (str) => {
  // Create new element
  const el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el);
};

export default {
  data: () => ({
    copied: false,
  }),
  methods: {
    copy() {
      copyStringToClipboard(this.url);
      this.copied = true;
    },
  },
  computed: {
    url() {
      return `${window.location.protocol}//${window.location.host}${this.$route.path}`;
    },
  },
};
</script>

<style>

</style>

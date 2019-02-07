<template>
  <full-screen class="background">
    <div>
      <h1 class="display-3">
        Capitalism - The Game
        <v-btn outline large to="/play">
          Play now!
        </v-btn>
      </h1>
      <blockquote class="blockquote text-xs-center heading">
        "At least it's not communism" - Fred
      </blockquote>
    </div>
  </full-screen>
</template>
<script>
import FullScreen from '@/components/FullScreen.vue';

export default {
  components: { FullScreen },
};
</script>

<style scoped>
  .background {
    background-image: linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ),
    url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Valentin_de_Boulogne_-_Soldiers_Playing_Cards_and_Dice_%28The_Cheats%29.jpg/1280px-Valentin_de_Boulogne_-_Soldiers_Playing_Cards_and_Dice_%28The_Cheats%29.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    justify-content: center;
  }
</style>

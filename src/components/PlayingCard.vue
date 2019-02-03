<template>
  <div class="card">
    <div class="card-inner">
      <div class="face">
        <div class="grid" :class="color">
          <div class="top">
            <div>{{ rankView }}</div>
            <div class="corner-entity">{{ entity }}</div>
          </div>
          <div class="center">
            <div class="rank-A" v-if="rank==='A'">
              <h1>{{ entity }}</h1>
            </div>
            <div class="rank-2" v-else-if="rank==='2'">
              <div class="flex xs12">{{ entity }}</div>
              <div class="flex xs12 flip">{{ entity }}</div>
            </div>
          </div>
          <div class="bottom flip">
            <div>{{ rankView }}</div>
            <div class="corner-entity">{{ entity }}</div>
          </div>
        </div>
      </div>
      <div class="back">
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    rank: {
      type: [String, Number],
      default: '2',
      validator(value) {
        return '23456789TJQKA'.indexOf(value.toString()) > -1;
      },
    },
    suit: {
      type: String,
      default: 'S',
      validator(value) {
        return 'SHDC'.indexOf(value) > -1;
      },
    },
  },

  computed: {
    entity() {
      return {
        S: '♠',
        H: '♥',
        D: '♦',
        C: '♣',
      }[this.suit];
    },

    rankView() {
      return this.rank !== 'T' ? this.rank : 10;
    },

    color() {
      return ['C', 'S'].includes(this.suit) ? 'black--text' : 'red--text';
    },
  },
};
</script>

<style>

.card, .grid {
  width: 63.5mm;
  height: 88.9mm;
}

.grid {
  background: white;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  display: grid;
  grid-template-rows: repeat(11, minmax(0, 1fr));
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.top {
  grid-row: 1 / 4;
  grid-column: 1;
}

.bottom {
  grid-row: -1 / -4;
  grid-column: -1 / -2;
}

.flip {
 transform: rotate(180deg);
}

.center {
  grid-row: 2 / -2;
  grid-column: 2 / -2;
  font-size: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rank-A {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rank-2 {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-content: space-between;
}

.center {
  /* border: 1px solid black; */
}

.top, .bottom {
  font-size: 30px;
  letter-spacing: -5px;
}

.corner-entity {
  line-height: 0.7;
  font-size: 40px;
}

  /* The flip card container - set the width and height to whatever you want.
  We have added the border property to demonstrate that the flip itself goes
  out of the box on hover (remove perspective if you don't want the 3D effect */
.card {
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.3s;
  transform-style: preserve-3d;
  border-radius: 10px;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.card:hover .card-inner {
  /* transform: rotateY(180deg); */
}

/* Position the front and back side */
.face, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the back side */
.back {
  background-image: url("https://t3.rbxcdn.com/acab25608db99f3e6195c0ece3313b7f");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  transform: rotateY(180deg);
  border-radius: 10px;
}
</style>

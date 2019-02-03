<template>
  <div class="card" :class="{ flipped : flipped }" @click="flipped = !flipped">
    <div class="card-inner">
      <div class="face">
        <div class="grid" :class="color">
          <div class="top">
            <div>{{ rankView }}</div>
            <div class="corner-entity">{{ entity }}</div>
          </div>
          <div class="grid-center center">
            <div class="rank-2-8" v-if="'A2345678'.indexOf(rank) > -1">
              <div
                v-for="i in a15" :key="i"
                class="center"
                :class="{ rotate: pattern[rank].rotated.includes(i)}">
                <template v-if="pattern[rank].indicies.includes(i)">
                  {{ entity }}
                </template>
              </div>
            </div>
            <div class="rank-9-T" v-else-if="'9T'.indexOf(rank) > -1">
              <div
                v-for="i in a21" :key="i"
                class="center"
                :class="{ rotate: pattern[rank].rotated.includes(i)}">
                <template v-if="pattern[rank].indicies.includes(i)">
                  {{ entity }}
                </template>
              </div>
            </div>
            <div class="face-card" :class="faceClass" v-else></div>
          </div>
          <div class="bottom rotate">
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
const a15 = [];
for (let i = 0; i < 15; i += 1) {
  a15.push(i);
}

const a21 = [];
for (let i = 0; i < 21; i += 1) {
  a21.push(i);
}

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

  data: () => ({
    flipped: false,
    a15,
    a21,
    pattern: {
      A: {
        indicies: [7],
        rotated: [],
      },
      2: {
        indicies: [1, 13],
        rotated: [13],
      },
      3: {
        indicies: [1, 7, 13],
        rotated: [13],
      },
      4: {
        indicies: [0, 2, 12, 14],
        rotated: [12, 14],
      },
      5: {
        indicies: [0, 2, 7, 12, 14],
        rotated: [12, 14],
      },
      6: {
        indicies: [0, 2, 6, 8, 12, 14],
        rotated: [12, 14],
      },
      7: {
        indicies: [0, 2, 4, 6, 8, 12, 14],
        rotated: [12, 14],
      },
      8: {
        indicies: [0, 2, 4, 6, 8, 10, 12, 14],
        rotated: [12, 14],
      },
      9: {
        indicies: [0, 2, 6, 8, 12, 10, 14, 18, 20],
        rotated: [12, 14, 18, 20],
      },
      T: {
        indicies: [0, 2, 4, 6, 8, 12, 14, 16, 18, 20],
        rotated: [12, 14, 16, 18, 20],
      },
    },
  }),

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

    faceClass() {
      return {
        J: 'jack',
        Q: 'queen',
        K: 'king',
      }[this.rank];
    },
  },
};
</script>

<style>

.card {
  cursor: pointer;
  transition: all ease-in-out 0.05s;
}

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

.rotate {
 transform: rotate(180deg);
}

.grid-center {
  grid-row: 2 / -2;
  grid-column: 2 / -2;
  font-size: 60px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rank-2-8 {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(5, minmax(0, 1fr));
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.rank-9-T {
  height: 93%;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(7, minmax(0, 1fr));
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.border {
  border: 1px solid black;
}

.top, .bottom {
  font-size: 30px;
  letter-spacing: -5px;
}

.corner-entity {
  line-height: 0.7;
  font-size: 30px;
}

.card {
  background-color: transparent;
  perspective: 1000px;
  transition: transform 0.3 ease-in-out;
}

/* This container is needed to position the front and back side */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  transform-style: preserve-3d;
  border-radius: 10px;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card:hover {
  transform: translateY(-5%);
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
  background:
  linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
  linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
  linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
  linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
  linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
  linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%,
  transparent 50%, transparent 75%, #242424 75%, #242424);
  background-color: #131313;
  background-size: 20px 20px;
  transform: rotateY(180deg);
  border-radius: 10px;
}

.face-card {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
}
</style>
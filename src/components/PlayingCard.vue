<template>
  <div class="card" :class="{ selected : selected }" @click="updateInput">
    <div class="card-inner">
      <div class="face">
        <div class="grid" :class="color">
          <div class="top">
            <div>{{ displayedRank }}</div>
            <div class="corner-entity">{{ entity }}</div>
          </div>
          <div class="grid-center center">
            <div class="rank-A-8" v-if="rank < 9">
              <div
                v-for="i in a15" :key="i"
                class="center"
                :class="{ rotate: pattern[rank].rotated.includes(i)}">
                <template v-if="pattern[rank].indicies.includes(i)">
                  {{ entity }}
                </template>
              </div>
            </div>
            <div class="face-card" :class="faceClass" v-else-if="rank > 10"></div>
            <div class="rank-9-T" v-else>
              <div
                v-for="i in a21" :key="i"
                class="center"
                :class="{ rotate: pattern[rank].rotated.includes(i)}">
                <template v-if="pattern[rank].indicies.includes(i)">
                  {{ entity }}
                </template>
              </div>
            </div>
          </div>
          <div class="bottom rotate">
            <div>{{ displayedRank }}</div>
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
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    rank: {
      type: [String, Number],
      default: '2',
    },
    suit: {
      type: String,
      default: 'S',
    },
    value: {
      type: String,
    },
    modelValue: {
      defaule: false,
    },
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
    },
    flipped: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    selected: false,
    a15,
    a21,
    pattern: {
      1: {
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
      10: {
        indicies: [0, 2, 4, 6, 8, 12, 14, 16, 18, 20],
        rotated: [12, 14, 16, 18, 20],
      },
    },
  }),

  created() {
    this.selected = this.shouldBeChecked;
  },

  methods: {
    updateInput() {
      this.selected = !this.selected;

      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue];

        if (this.selected) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }

        this.$emit('change', newValue);
      } else {
        this.$emit('change', this.selected ? this.trueValue : this.falseValue);
      }
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

    shouldBeChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue;
    },

    color() {
      return ['C', 'S'].includes(this.suit) ? 'black--text' : 'red--text';
    },

    displayedRank() {
      if (this.rank === 1) {
        return 'A';
      }
      if (this.rank === 11) {
        return 'J';
      }
      if (this.rank === 12) {
        return 'Q';
      }
      if (this.rank === 13) {
        return 'K';
      }
      return this.rank.toString();
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
  display: inline-block;
}

.card, .grid {
  width: 100px;
  height: 140px;
}

.grid {
  background: white;
  display: inline-block;
  text-align: center;
  display: grid;
  grid-template-rows: repeat(11, minmax(0, 1fr));
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border-radius: 5px;
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
  font-size: 30px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rank-A-8 {
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
  font-size: 15px;
  letter-spacing: -2px;
}

.corner-entity {
  line-height: 0.7;
  font-size: 15px;
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
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

/* .card:hover {
  transform: translateY(-10%);
} */

/* Position the front and back side */
.face, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 5px;
}

.card:hover .face, .card:hover .back {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.card.selected {
  transform: translateY(-10%);
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
  border-radius: 5px;
}

.face-card {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
}
</style>

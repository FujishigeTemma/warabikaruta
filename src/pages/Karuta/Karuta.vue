<template>
  <div :class="$style.header">
    <!-- <button @click="onClickStop">stop</button> -->
    <div v-if="isPlaying" :class="$style.card">
      <img
        :class="$style.img"
        :src="'/src/assets/' + currentTarget + 'b.jpg'"
      />
    </div>
    <button v-else :class="$style.btn" @click="onClickStart">start!</button>
    <timer :time="time" />
  </div>
  <div v-show="displayOtetuki" :class="$style.otetuki">おてつき</div>
  <div v-if="isPlaying" :class="$style.cardList">
    <div v-for="card in currentTargets" :key="card" :class="$style.card">
      <img
        :class="$style.img"
        :src="'/src/assets/' + card + 'f.jpg'"
        @click="onClickCard(card)"
      />
    </div>
  </div>
  <div v-if="isPlaying">獲得済み: {{ obtained.length }}枚</div>
  <div :class="$style.cardList">
    <div v-for="card in obtained" :key="card" :class="$style.card">
      <img :class="$style.img" :src="'/src/assets/' + card + 'f.jpg'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Timer from './Timer.vue'
import useTimer from './timer'

export default defineComponent({
  name: 'Karuta',
  components: { Timer },
  setup() {
    const pickRandomNubers = (list: number[], len: number) => {
      const arr: number[] = []
      for (let i = 1; i <= len; i++) {
        const index = Math.floor(Math.random() * Math.floor(list.length))
        arr.push(list[index])
        list[index] = list[list.length - 1]
        list.pop()
      }
      return arr
    }
    const NUMBER_OF_CARDS = 46
    let remaining = [...Array(NUMBER_OF_CARDS).keys()]
    let obtained: number[] = []
    const currentTargets = ref(pickRandomNubers(remaining, 12))
    currentTargets.value.forEach(card => remaining.splice(card, 1))
    const currentTarget = ref(
      currentTargets.value[Math.floor(Math.random() * Math.floor(12))]
    )
    const isPlaying = ref(false)
    const displayOtetuki = ref(false)
    const { time, startCountdown, stopCountdown } = useTimer()
    const target = ref(0)
    const onClickStart = () => {
      if (isPlaying.value) return
      target.value = Math.floor(Math.random() * Math.floor(46))
      isPlaying.value = true
      startCountdown(3)
    }
    const onClickStop = () => {
      stopCountdown()
      isPlaying.value = false
    }
    const onClickCard = (card: number) => {
      if (!isPlaying.value || (time.value.min === 0 && time.value.sec === 0))
        return
      if (card === currentTarget.value) {
        const index = currentTargets.value.indexOf(card)
        obtained.push(currentTarget.value)
        const nextTarget = pickRandomNubers(remaining, 1)[0]
        currentTargets.value[index] = nextTarget
        currentTargets.value = currentTargets.value.sort(
          () => Math.random() - 0.5
        )
        currentTarget.value = nextTarget
      } else {
        displayOtetuki.value = true
        setTimeout(() => {
          displayOtetuki.value = false
        }, 1500)
        if (time.value.sec >= 5) {
          time.value.sec = time.value.sec - 5
        } else {
          time.value.min = time.value.min - 1
          time.value.sec = time.value.sec + 60 - 5
        }
        if (time.value.min <= 0 || time.value.sec <= 0) {
          time.value = { min: 0, sec: 0 }
        }
      }
    }
    return {
      currentTargets,
      currentTarget,
      obtained,
      isPlaying,
      displayOtetuki,
      time,
      onClickStart,
      onClickStop,
      onClickCard
    }
  }
})
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cardList {
  margin: 48px;
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(min(100%, 146px), 1fr));
  grid-template-columns: repeat(6, minmax(min(100%, 146px), 1fr));
  gap: 16px;
}
.card {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.img {
  // かるたは73:52が標準らしい
  height: 146px;
  width: 104px;
  // 画像サイズがまちまちなので左上を基準にトリミング
  object-fit: cover;
  object-position: 0% 0%;
}
.btn {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 0.5rem 2rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
  background-color: #094;
  color: #00662d;
  text-shadow: -1px -1px 1px #00ff71;
  border-bottom: 5px solid #00662d;
  margin-top: 3px;
  border-bottom: 2px solid #00662d;
}
.otetuki {
  color: red;
}
</style>

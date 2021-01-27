<template>
  <div :class="$style.container">
    <timer :time="time" />
    <button @click="onClickStart">start</button>
    <button @click="onClickStop">stop</button>
    <div v-show="isPlaying" :class="$style.card">
      <img :class="$style.img" :src="'/src/assets/' + (target + 1) + 'b.jpg'" />
    </div>
    <div v-for="card in cards" :key="card" :class="$style.card">
      <img :class="$style.img" :src="'/src/assets/' + (card + 1) + 'f.jpg'" />
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
    const cards = [...Array(46).keys()]
    const isPlaying = ref(false)
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
    return { cards, target, isPlaying, time, onClickStart, onClickStop }
  }
})
</script>

<style lang="scss" module>
.container {
  margin: 48px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 146px), 1fr));
  gap: 16px;
}
.card {
  display: flex;
  justify-content: center;
}
.img {
  // かるたは73:52が標準らしい
  height: 146px;
  width: 104px;
  // 画像サイズがまちまちなので左上を基準にトリミング
  object-fit: cover;
  object-position: 0% 0%;
}
</style>

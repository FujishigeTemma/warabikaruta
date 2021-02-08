<template>
  <div :class="$style.header">
    <div v-if="state === GameState.Playing" :class="$style.card">
      <img
        :class="$style.img"
        :src="'/src/assets/' + currentTarget + 'b.jpg'"
      />
    </div>
    <button v-else :class="$style.btn" @click="onStart(Timelimit['150秒'])">
      start!
    </button>
    <timer :time="time" />
  </div>
  <div :class="{ [$style.error]: failed }">お手つき</div>
  <div v-if="state === GameState.Playing" :class="$style.cardList">
    <div v-for="card in targets" :key="card" :class="$style.card">
      <img
        :class="$style.img"
        :src="'/src/assets/' + card + 'f.jpg'"
        @click="onTap(card)"
      />
    </div>
  </div>
  <div v-if="state === GameState.Playing">
    獲得済み: {{ obtained.length }}枚
  </div>
  <div :class="$style.cardList">
    <div v-for="card in obtained" :key="card" :class="$style.card">
      <img :class="$style.img" :src="'/src/assets/' + card + 'f.jpg'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Timer from './Timer.vue'
import useTimer from './timer'
import useKaruta, { GameState } from './karuta'

export default defineComponent({
  name: 'Karuta',
  components: { Timer },
  setup() {
    const { time, startCountdown, stopCountdown } = useTimer()
    const {
      state,
      failed,
      obtained,
      targets,
      currentTarget,
      onStart,
      onFinish,
      onTap,
      Timelimit
    } = useKaruta(time, startCountdown, stopCountdown)

    return {
      GameState,
      targets,
      currentTarget,
      obtained,
      state,
      failed,
      time,
      onStart,
      onFinish,
      onTap,
      Timelimit
    }
  }
})
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
}
.cardList {
  margin: 48px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 146px), 1fr));
  // grid-template-columns: repeat(6, minmax(min(100%, 146px), 1fr));
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
.error {
  color: red;
}
</style>

<template>
  <select-modal :is-shown="showSelectModal" @set="onTimelimitSetted" />
  <clear-modal :is-shown="showClearModal" @select="onSelect" />
  <failed-modal :is-shown="showFailedModal" @select="onSelect" />
  <interval v-if="showInterval" @done="atInterval" />
  <miss-modal v-if="failed" @done="afterPenalty" />
  <div :class="$style.container">
    <div v-if="showGameBox" :class="$style.viewBox">
      <div :class="$style.header">
        <div
          v-if="state === GameState.Playing"
          :class="$style.card"
          :hidden="showInterval"
        >
          <img :class="$style.img" :src="`/images/${currentTarget}b.jpg`" />
        </div>
        <Button v-else @click="onStart(timelimit)"> start! </Button>
        <timer :time="time" />
        <menu-modal @pause="stopCountdown" @select="onSelect"></menu-modal>
      </div>
      <div
        v-if="state === GameState.Playing || state === GameState.Finished"
        :class="$style.cardList"
      >
        <div
          v-for="card in targets.filter((_, i) => i % 2 == 0)"
          :key="card"
          :class="$style.card"
          :hidden="showInterval"
        >
          <img
            :class="$style.img"
            :src="`/images/${card}f.jpg`"
            @click="onTap(card)"
          />
        </div>
      </div>
      <div
        v-if="state === GameState.Playing || state === GameState.Finished"
        :class="$style.cardList"
      >
        <div
          v-for="card in targets.filter((_, i) => i % 2 == 1)"
          :key="card"
          :class="$style.card"
          :hidden="showInterval"
        >
          <img
            :class="$style.img"
            :src="`/images/${card}f.jpg`"
            @click="onTap(card)"
          />
        </div>
      </div>

      <progress-bar :progress="(time / timelimit) * 100" :time="time" />
      <div
        v-if="state === GameState.Start && nowPlaying"
        :class="$style.caption"
      >
        〜空札詠み中〜<br />ワラビー君は<br />蕨のかわいい<br />マスコット
      </div>
      <div v-if="state === GameState.Playing">
        獲得済み: {{ obtained.length }}枚
      </div>
      <div :class="$style.cardListObtained">
        <div v-for="card in obtained" :key="card" :class="$style.card">
          <img :class="$style.img" :src="`/images/${card}f.jpg`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from './Button.vue'
import Timer from './Timer.vue'
import SelectModal from './SelectModal.vue'
import MenuModal from './MenuModal.vue'
import ProgressBar from './ProgressBar.vue'
import useTimer from './timer'
import useKaruta, { GameState } from './karuta'
import ClearModal from './ClearModal.vue'
import FailedModal from './FailedModal.vue'
import Interval from './Interval.vue'
import playAudio from './Player'
import MissModal from './MissModal.vue'

export default defineComponent({
  name: 'Karuta',
  components: {
    Button,
    Timer,
    SelectModal,
    MenuModal,
    ProgressBar,
    ClearModal,
    FailedModal,
    Interval,
    MissModal
  },
  setup() {
    const showSelectModal = ref(true)
    const showClearModal = ref(false)
    const showFailedModal = ref(false)
    const showGameBox = ref(false)
    const showInterval = ref(false)

    const nowPlaying = ref<Promise<unknown> | undefined>(undefined)

    const { time, startCountdown, stopCountdown } = useTimer(showFailedModal)
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
    } = useKaruta(
      time,
      startCountdown,
      stopCountdown,
      showClearModal,
      showInterval,
      nowPlaying
    )

    const onSelect = (action: string) => {
      if (action === 'resume') {
        startCountdown(time.value)
        return
      }
      if (action === 'quit') {
        state.value = GameState.Playing
        time.value = Timelimit['150秒']
        return
      }
      if (action === 'restart') {
        obtained.value = []
        state.value = GameState.Start
        time.value = timelimit.value
        onStart(timelimit.value)
        showClearModal.value = false
        showFailedModal.value = false
        nowPlaying.value = undefined
      }
    }

    const timelimit = ref(Timelimit['150秒'])
    const onTimelimitSetted = (t: number) => {
      timelimit.value = t
      time.value = t
      showSelectModal.value = false
      showGameBox.value = true
    }

    const atInterval = async () => {
      if (nowPlaying.value) {
        await nowPlaying.value
        nowPlaying.value = undefined
      }
      showInterval.value = false
      startCountdown(time.value)
      nowPlaying.value = playAudio(`/audio/${currentTarget.value}.mp3`)
    }

    const afterPenalty = () => {
      failed.value = false
    }

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
      onSelect,
      stopCountdown,
      timelimit,
      onTimelimitSetted,
      showSelectModal,
      showClearModal,
      showFailedModal,
      showGameBox,
      showInterval,
      atInterval,
      afterPenalty,
      nowPlaying
    }
  }
})
</script>

<style lang="scss" module>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      0deg,
      rgba(139, 126, 74, 0.8),
      rgba(168, 157, 95, 0.6) 10%,
      rgba(168, 157, 95, 0.2) 90%,
      rgba(139, 126, 74, 0.8)
    ),
    linear-gradient(
      90deg,
      #f9daa4,
      #f9daa4 25%,
      #cea660 25%,
      #cea660 50%,
      #ddba78 50%,
      #ddba78 75%,
      #c69f5a 75%,
      #c69f5a
    );
  background-size: 4px 20px;
}
.viewBox {
  width: 1024px;
  height: 768px;
  border-radius: 4px;
  overflow-y: scroll;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
}
.cardList {
  margin: 48px;
  display: flex;
  justify-content: space-around;
  gap: 16px;
  align-items: center;
}
.cardListObtained {
  margin: 48px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.card {
  display: flex;
  justify-content: center;
  cursor: pointer;
  &[hidden] {
    visibility: hidden;
  }
}
.img {
  // かるたは73:52が標準らしい
  height: 146px;
  width: 104px;
  // 画像サイズがまちまちなので左上を基準にトリミング
  object-fit: cover;
  object-position: 0% 0%;
}
.caption {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  padding: 16px;
  font-size: 64px;
  writing-mode: vertical-rl;
  line-height: 3em;
}
</style>

<template>
  <select-modal :is-show="showSelectModal" @set="onTimelimitSetted" />
  <clear-modal :is-show="showClearModal" @select="onSelect" />
  <failed-modal :is-show="showFailedModal" @select="onSelect" />

  <div :class="$style.header">
    <div v-if="state === GameState.Playing" :class="$style.card">
      <img :class="$style.img" :src="`/src/assets/${currentTarget}b.jpg`" />
    </div>
    <Button v-else @click="onStart(timelimit)"> start! </Button>
    <timer :time="time" />
    <menu-modal @pause="stopCountdown" @select="onSelect"></menu-modal>
  </div>

  <!-- <div :class="{ [$style.error]: failed }">お手つき</div> -->

  <div
    v-if="state === GameState.Playing || state === GameState.Finished"
    :class="$style.cardList"
  >
    <div
      v-for="card in targets.filter((_, i) => i % 2 == 0)"
      :key="card"
      :class="$style.card"
    >
      <img
        :class="$style.img"
        :src="`/src/assets/${card}f.jpg`"
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
    >
      <img
        :class="$style.img"
        :src="`/src/assets/${card}f.jpg`"
        @click="onTap(card)"
      />
    </div>
  </div>

  <progress-bar :progress="(time / timelimit) * 100" :time="time" />
  <div v-if="state === GameState.Playing">
    獲得済み: {{ obtained.length }}枚
  </div>
  <div :class="$style.cardList">
    <div v-for="card in obtained" :key="card" :class="$style.card">
      <img :class="$style.img" :src="`/src/assets/${card}f.jpg`" />
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

export default defineComponent({
  name: 'Karuta',
  components: {
    Button,
    Timer,
    SelectModal,
    MenuModal,
    ProgressBar,
    ClearModal,
    FailedModal
  },
  setup() {
    const showSelectModal = ref(true)
    const showClearModal = ref(false)
    const showFailedModal = ref(false)

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
    } = useKaruta(time, startCountdown, stopCountdown, showClearModal)

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
        onStart(timelimit.value)
      }
    }

    const timelimit = ref(Timelimit['150秒'])
    const onTimelimitSetted = (t: number) => {
      timelimit.value = t
      time.value = t
      showSelectModal.value = false
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
      showFailedModal
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
  grid-template-columns: repeat(6, minmax(min(100%, 146px), 1fr));
  gap: 16px;
  align-items: center;
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

.error {
  color: red;
}
</style>

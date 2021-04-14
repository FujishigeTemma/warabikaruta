<template>
  <teleport to="#game-modal-target">
    <div :class="$style.container">
      <div v-if="!waiting" :class="$style.modal">{{ time + 1 }}</div>
      <div v-else :class="$style.modal">札詠み中</div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'Interval',
  emits: {
    done: () => true
  },
  setup(props, context) {
    const time = ref(2)
    let timerId: number
    const waiting = ref(false)
    const count = () => {
      if (time.value > 0) {
        time.value--
      } else {
        clearInterval(timerId)
        context.emit('done')
        waiting.value = true
      }
    }
    onMounted(() => {
      timerId = setInterval(count, 1000)
    })
    return {
      time,
      waiting
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  font-family: 'M PLUS Rounded 1c', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.modal {
  position: fixed;
  display: flex;
  color: #e26a6a;
  font-size: 144px;
}
</style>

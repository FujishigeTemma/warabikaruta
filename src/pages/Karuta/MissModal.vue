<template>
  <teleport to="#game-modal-target">
    <div :class="$style.container">
      <div :class="$style.modal">おてつき</div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'MissModal',
  emits: {
    done: () => true
  },
  setup(props, context) {
    let timerId: number
    const callback = () => {
      clearInterval(timerId)
      context.emit('done')
    }
    onMounted(() => {
      timerId = setInterval(callback, 500)
    })
    return
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

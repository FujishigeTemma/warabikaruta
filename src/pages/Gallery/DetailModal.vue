<template>
  <teleport to="#gallery-modal-target">
    <div v-if="isShown" :class="$style.container" @click="close">
      <div :class="$style.viewBox">
        <div :class="$style.item" @mousedown="beforeClose">
          <img :class="$style.img" :src="`/src/assets/${card}f.jpg`" />
          <img :class="$style.img" :src="`/src/assets/${card}b.jpg`" />
        </div>
        <div :class="$style.text">
          {{ arr[card] }}
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import description from './description'

export default defineComponent({
  name: 'DetailModal',
  props: {
    isShown: {
      type: Boolean,
      default: false
    },
    card: {
      type: Number,
      required: true
    }
  },
  emits: {
    close: () => true
  },
  setup(props, context) {
    let isImage = false
    const close = () => {
      if (isImage) {
        isImage = false
        return
      }
      context.emit('close')
    }
    const beforeClose = () => {
      isImage = true
    }
    const arr = Object.values(description)
    return { close, beforeClose, arr }
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
.viewBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item {
  display: flex;
}
.img {
  // かるたは73:52が標準らしい
  --vh: 100vh;
  height: calc(var(--vh) * 0.5);
  width: calc(var(--vh) * 0.5 * 52 / 73);
  // 画像サイズがまちまちなので左上を基準にトリミング
  object-fit: cover;
  object-position: 0% 0%;
}
.text {
  max-width: 768px;
  margin-top: 16px;
  color: white;
  font-size: 24px;
}
</style>

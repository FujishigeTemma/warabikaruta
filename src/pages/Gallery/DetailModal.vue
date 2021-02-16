<template>
  <teleport to="#gallery-modal-target">
    <div v-if="isShow" :class="$style.container" @click="close">
      <div :class="$style.item" @mousedown="beforeClose">
        <img :class="$style.img" :src="`/src/assets/${card}f.jpg`" />
        <img :class="$style.img" :src="`/src/assets/${card}b.jpg`" />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DetailModal',
  props: {
    isShow: {
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
    return { close, beforeClose }
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
</style>

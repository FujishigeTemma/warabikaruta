<template>
  <div :class="$style.container">
    <div :class="$style.progress" :style="style"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const style = computed(() => ({
      width: props.progress + '%'
    }))
    return { style }
  }
})
</script>

<style lang="scss" module>
.container {
  margin: 24px 0;
  width: 100%;
  height: 12px;
}
.progress {
  height: 100%;
  background: #2c3e50;
  transition-duration: 1s;
  transition-timing-function: linear;
}
</style>

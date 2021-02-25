<template>
  <div :class="$style.container">
    <img src="/src/assets/guide.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Guide',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>

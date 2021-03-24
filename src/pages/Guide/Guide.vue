<template>
  <div :class="$style.container">
    <img src="/images/guide.png" />
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
  display: flex;
  justify-content: center;
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
</style>

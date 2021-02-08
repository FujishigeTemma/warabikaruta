<template>
  <div :class="$style.container">{{ formatedTime }}</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Timer',
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const formatedTime = computed(() =>
      [((props.time / 60) | 0).toString(), (props.time % 60).toString()]
        .map(str => (str.length === 1 ? '0' + str : str))
        .join(':')
    )
    return {
      formatedTime
    }
  }
})
</script>

<style lang="scss" module>
.container {
  font-size: 3rem;
  margin: 8px;
}
</style>

<template>
  <div :class="$style.container">{{ formatedTime }}</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

export default defineComponent({
  name: 'Timer',
  props: {
    time: {
      type: Object as PropType<{ min: number; sec: number }>,
      required: true
    }
  },
  setup(props) {
    const formatedTime = computed(() =>
      [props.time.min.toString(), props.time.sec.toString()]
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
}
</style>

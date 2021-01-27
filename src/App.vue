<template>
  <router-link to="karuta">Karuta</router-link>
  |
  <router-link to="gallery">Gallery</router-link>
  <div :class="$style.container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss" module>
.container {
  margin: 0 auto;
  max-width: 960px;
}
</style>

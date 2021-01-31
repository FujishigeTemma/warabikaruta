<template>
  <div :class="$style.container">
    <router-link to="karuta" :class="$style.button">
      実践！タイムアタックモード
    </router-link>
    <router-link to="gallery" :class="$style.button">
      カルタ資料集
    </router-link>
    <router-link to="guide" :class="$style.button">
      カルタ競技必携
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Index'
})
</script>

<style lang="scss" module>
.container {
  background-color: #0fd1aa;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button {
  width: 36rem;
  border: 5px solid #2c3e50;
  color: #2c3e50;
  font-family: 'Helvetica Neue', 'Helvetica', 'Hiragino Sans',
    'Hiragino Kaku Gothic ProN', 'Arial', 'Yu Gothic', 'Meiryo', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.1rem;
  margin: 32px;
  padding: 1rem;
  background-color: #e26a6a;
  box-shadow: 10px 10px 0 #f1c40f, 20px 20px 0 #3498db;
}
</style>

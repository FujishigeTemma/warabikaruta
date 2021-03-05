<template>
  <div :class="$style.container">
    <div v-for="card in cards" :key="card" :class="$style.card">
      <img
        v-show="card !== selected"
        :class="$style.img"
        :src="`/images/${card}f.jpg`"
        @click="onClick(card)"
      />
      <img
        v-show="card === selected"
        :class="$style.img"
        :src="`/images/${card}b.jpg`"
        @click="onClick(card)"
      />
    </div>
    <detail-modal
      :is-shown="isShown"
      :card="selected"
      @close="isShown = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DetailModal from './DetailModal.vue'

export default defineComponent({
  name: 'Karuta',
  components: { DetailModal },
  setup() {
    const cards = [...Array(46).keys()]
    const selected = ref<number | undefined>(undefined)
    const isShown = ref(false)
    const onClick = (card: number) => {
      if (card === selected.value) {
        selected.value = undefined
        return
      }
      selected.value = card
      isShown.value = true
    }
    return { cards, selected, isShown, onClick }
  }
})
</script>

<style lang="scss" module>
.container {
  margin: 48px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 146px), 1fr));
  gap: 16px;
}
.card {
  display: flex;
  justify-content: center;
}
.img {
  // かるたは73:52が標準らしい
  height: 146px;
  width: 104px;
  // 画像サイズがまちまちなので左上を基準にトリミング
  object-fit: cover;
  object-position: 0% 0%;
}
</style>

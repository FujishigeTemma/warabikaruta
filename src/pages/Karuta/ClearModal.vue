<template>
  <teleport to="#game-modal-target">
    <div v-if="isShow" :class="$style.container">
      <div :class="$style.modal">
        <div :class="$style.title">
          <div :class="$style.content">GAME CLEAR</div>
          <img :class="$style.character" src="../../assets/warabi-kun2.png" />
        </div>
        <div :class="$style.next">
          <div :class="$style.item" @click="onClick('restart')">
            もう一度遊ぶ
          </div>
          <div :class="$style.item">
            <router-link to="/">トップ画面に戻る</router-link>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    select: (action: string) => true
  },
  setup(props, context) {
    const onClick = (action: string) => {
      context.emit('select', action)
    }
    return {
      onClick
    }
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
.modal {
  padding: 36px 48px;
  background: #fff;
  border-radius: 6px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.content {
  position: relative;
  color: #555;
  background: #e0edff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 36px;
  border-radius: 8px;
  height: fit-content;
}
.content:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -15px;
  border: 15px solid transparent;
  border-left: 15px solid #e0edff;
}
.character {
  margin: 8px;
}
.next {
  display: flex;
}
.item {
  cursor: pointer;
  font-size: 36px;
  width: fit-content;
  margin: 16px;
  &:hover {
    background: #e0edff;
  }
}
</style>

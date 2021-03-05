<template>
  <teleport to="#game-modal-target">
    <div v-if="isShown" :class="$style.container">
      <div :class="$style.modal">
        <div :class="$style.title">GAME OVER</div>
        <div :class="$style.comment">
          <div :class="$style.content">残念...もう一度遊ぶ？</div>
          <img :class="$style.character" src="/images/warabi-kun3.png" />
        </div>
        <div :class="$style.next">
          <div :class="$style.item" @click="onClick('restart')">
            もう一度挑戦する
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
    isShown: {
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
  font-family: 'M PLUS Rounded 1c', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  font-size: 52px;
  margin-bottom: 36px;
}
.comment {
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
  padding: 16px;
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
  margin-left: 20px;
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

<template>
  <div :class="$style.btn" @click="pause">中断</div>
  <teleport to="#game-modal-target">
    <div v-show="showModal" :class="$style.container">
      <div :class="$style.modal">
        <div :class="$style.item" @click="onClick('resume')">再開</div>
        <div :class="$style.item" @click="onClick('restart')">
          最初からやり直す
        </div>
        <router-link to="/">
          <div :class="$style.item" @click="onClick('quit')">
            トップ画面に戻る
          </div>
        </router-link>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MenuModal',
  emits: {
    pause: () => true,
    select: (action: string) => true
  },
  setup(props, context) {
    const showModal = ref(false)
    const pause = () => {
      context.emit('pause')
      showModal.value = true
    }
    const onClick = (action: string) => {
      context.emit('select', action)
      showModal.value = false
    }
    return {
      showModal,
      pause,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 48px;
  background: #fff;
  border-radius: 6px;
}
.item {
  cursor: pointer;
  font-size: 36px;
  width: 288px;
  margin: 4px;
  &:hover {
    text-decoration: underline;
  }
}

.btn {
  border-radius: 4px;
  border: 1px solid #2c3e50;
  padding: 4px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.4);
}
</style>

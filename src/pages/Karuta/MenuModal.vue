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
            ゲームを辞める
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
</style>

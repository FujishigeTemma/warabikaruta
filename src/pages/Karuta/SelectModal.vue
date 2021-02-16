<template>
  <teleport to="#game-modal-target">
    <div v-if="isShow" :class="$style.container">
      <div :class="$style.modal">
        <div :class="$style.comment">
          <div :class="$style.content">
            難易度を選んでね！<br />すべてのモードでクリアできるかな？
          </div>
          <img :class="$style.character" src="../../assets/warabi-kun1.png" />
        </div>
        <div :class="$style.difficultyList">
          <div :class="$style.item" @click="onClick(200)">
            {{ '簡単 ' + Timelimit['200秒'] + '秒' }}
          </div>
          <div :class="$style.item" @click="onClick(150)">
            {{ '普通 ' + Timelimit['150秒'] + '秒' }}
          </div>
          <div :class="$style.item" @click="onClick(100)">
            {{ '難しい ' + Timelimit['100秒'] + '秒' }}
          </div>
          <div :class="$style.item" @click="onClick(60)">
            {{ '鬼 ' + Timelimit['60秒'] + '秒' }}
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Timelimit } from './karuta'

export default defineComponent({
  name: 'SelectModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    set: (time: number) => true
  },
  setup(props, context) {
    const onClick = (time: number) => {
      context.emit('set', time)
    }
    return {
      onClick,
      Timelimit
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
  padding: 8px;
  font-size: 20px;
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
.difficultyList {
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
  writing-mode: vertical-rl;
}
</style>

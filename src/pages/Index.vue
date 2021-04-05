<template>
  <div :class="$style.container">
    <router-link to="karuta" :class="$style.button">
      実践！タイムアタックモード
    </router-link>
    <router-link to="gallery" :class="$style.button">
      カルタ資料集
    </router-link>
    <router-link to="guide" :class="$style.button"> ルール説明 </router-link>
    <div :class="[$style.comment, $style.rightTop]">
      <div :class="$style.content">
        ゲームのやり方は<br />「ルール説明」を<br />クリックして確認してね！
      </div>
      <img :class="$style.character" src="/images/warabi-kun4.png" />
    </div>
    <div :class="[$style.comment, $style.leftBottom]">
      <div :class="$style.content">
        カルタ資料集では<br />全ての札が表示されるよ♪<br />札をクリックすると<br />その札の説明が見れます♪
      </div>
      <img :class="$style.character" src="/images/warabi-kun5.png" />
    </div>
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
.comment {
  display: flex;
  align-items: center;
  margin: 8px;
}
.rightTop {
  position: fixed;
  right: 0px;
  top: 48px;
}
.leftBottom {
  position: fixed;
  left: 0px;
  bottom: 48px;
}
.content {
  position: relative;
  color: #555;
  background: #e0edff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
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
  height: 124px;
  margin: 8px;
}
</style>

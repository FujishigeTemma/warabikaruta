<template>
  <button :class="$style.btn">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button'
})
</script>

<style lang="scss" module>
.btn {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 0.5rem 2rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
  background-color: #094;
  color: #00662d;
  text-shadow: -1px -1px 1px #00ff71;
  border-bottom: 5px solid #00662d;
  margin-top: 3px;
  border-bottom: 2px solid #00662d;
}
</style>

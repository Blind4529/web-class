<template>
  <div class="counter-box">
    <h4>独立计数器</h4>
    <p>点击次数：{{ count }}</p>
    <p class="counter-box__id">组件 ID：{{ componentId }}</p>
    <button type="button" @click="count += 1">Click Me</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const componentId = Math.random().toString(36).slice(2, 6)
</script>

<style scoped>
.counter-box {
  padding: 16px;
  border: 1px solid #ffd591;
  border-radius: 12px;
  background: #fff7e8;
}

.counter-box h4,
.counter-box p {
  margin: 0;
}

.counter-box__id {
  margin-top: 6px;
  font-size: 12px;
  color: #8c6d1f;
}

.counter-box button {
  margin-top: 12px;
  border: 0;
  border-radius: 8px;
  background: #fa8c16;
  color: #fff;
  padding: 8px 14px;
  cursor: pointer;
}
</style>

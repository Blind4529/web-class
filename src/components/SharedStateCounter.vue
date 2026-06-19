<template>
  <div class="shared-counter">
    <h4>共享状态计数器</h4>
    <p>点击次数：{{ state.count }}</p>
    <p class="shared-counter__id">组件 ID：{{ componentId }}</p>
    <button type="button" @click="state.count += 1">Click Me</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// 模拟错误写法：多个组件实例共享同一个对象引用
const state = reactive({ count: 0 })
const componentId = Math.random().toString(36).slice(2, 6)
</script>

<style scoped>
.shared-counter {
  padding: 16px;
  border: 1px solid #ffccc7;
  border-radius: 12px;
  background: #fff2f0;
}

.shared-counter h4,
.shared-counter p {
  margin: 0;
}

.shared-counter__id {
  margin-top: 6px;
  font-size: 12px;
  color: #a8071a;
}

.shared-counter button {
  margin-top: 12px;
  border: 0;
  border-radius: 8px;
  background: #f5222d;
  color: #fff;
  padding: 8px 14px;
  cursor: pointer;
}
</style>

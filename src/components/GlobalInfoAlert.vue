<template>
  <div v-if="visible" class="global-alert">
    <div class="global-alert__content">
      <strong>{{ title }}</strong>
      <p>{{ message }}</p>
    </div>
    <button class="global-alert__close" type="button" @click="visible = false">
      x
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: '全局提示',
  },
  message: {
    type: String,
    default: '这是一个通过 main.js 全局注册的组件。',
  },
})

const visible = ref(true)
</script>

<style scoped>
.global-alert {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid #b6d8ff;
  border-radius: 12px;
  background: linear-gradient(135deg, #eef6ff, #f7fbff);
}

.global-alert__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #24527a;
}

.global-alert__content p {
  margin: 0;
  color: #5c6f82;
  font-size: 13px;
}

.global-alert__close {
  border: 0;
  background: transparent;
  color: #24527a;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}
</style>

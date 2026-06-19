<template>
  <div class="city-card" @mouseover="hovered = true" @mouseout="hovered = false">
    <h4>
      城市：
      <span :style="{ color: hovered ? '#f5222d' : '#1677ff' }">{{ city }}</span>
    </h4>
    <p v-if="hovered">鼠标移入后触发 `@mouseover`，当前卡片状态已变化。</p>
    <p v-else>鼠标移出后触发 `@mouseout`，状态恢复。</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  city: {
    type: String,
    default: '南宁',
  },
})

const hovered = ref(false)
</script>

<style scoped>
.city-card {
  padding: 18px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  background: #fff;
  min-height: 110px;
}

.city-card h4,
.city-card p {
  margin: 0;
}

.city-card p {
  margin-top: 10px;
  color: #666;
}
</style>

<template>
  <div class="parent-box">
    <h4>局部注册演示</h4>
    <p>这个区域内部可以使用 `SpecialButton`，外部页面默认不可直接使用。</p>
    <div class="parent-box__buttons">
      <SpecialButton />
      <SpecialButton />
    </div>
  </div>
</template>

<script setup>
import SpecialButton from './SpecialButton.vue'
</script>

<style scoped>
.parent-box {
  padding: 18px;
  border: 1px solid #91caff;
  border-radius: 12px;
  background: #f0f8ff;
}

.parent-box h4,
.parent-box p {
  margin: 0;
}

.parent-box__buttons {
  display: flex;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
}
</style>

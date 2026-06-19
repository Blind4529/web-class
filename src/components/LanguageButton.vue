<template>
  <button class="language-btn" type="button" @click="emitLanguage">
    {{ item }}
  </button>
</template>

<script setup>
const props = defineProps({
  item: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['showLanguage'])

const emitLanguage = () => {
  emit('showLanguage', props.item)
}
</script>

<style scoped>
.language-btn {
  border: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #1677ff, #69b1ff);
  color: #fff;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 15px;
}
</style>

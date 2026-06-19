<template>
  <el-card class="play-card" shadow="hover">
    <template #header>
      <div class="play-card__header">
        <div>
          <h3>Vue `v-model` 单行演示</h3>
          <p>改这一行模板代码，立即看绑定占位文字和插值结果的变化。</p>
        </div>
        <el-tag size="small" type="primary">Vue 指令</el-tag>
      </div>
    </template>

    <div class="play-card__body">
      <label class="play-card__label">模板行</label>
      <el-input v-model="templateLine" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" />

      <div class="play-card__actions">
        <el-button plain @click="resetDemo">重置示例</el-button>
      </div>

      <div class="vue-demo">
        <label class="play-card__label">实时效果</label>
        <input v-model="message" :placeholder="placeholderText" class="vue-demo__input" type="text">
        <p class="vue-demo__result">{{ renderedText }}</p>
      </div>

      <div v-if="codeDetails.length" class="play-card__explain">
        <span class="play-card__explain-title">代码拆解</span>
        <ul>
          <li v-for="item in codeDetails" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="play-card__tips">
        <span class="play-card__tips-title">易错点 / 易混点</span>
        <ul>
          <li>`v-model` 是双向绑定，输入框和数据会同时变化。</li>
          <li>`{{ message }}` 是插值，不是属性绑定；属性绑定应使用 `v-bind` 或 `:`。</li>
          <li>模板里写 `v-model="msg"`，脚本里必须真的有 `msg` 这个响应式数据。</li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { explainVueTemplate } from '../codeExplain'

const defaultTemplateLine = '<input v-model="message" placeholder="请输入内容">'
const defaultMessage = 'RuoYi Demo'

const templateLine = ref(defaultTemplateLine)
const message = ref(defaultMessage)

const resetDemo = () => {
  templateLine.value = defaultTemplateLine
  message.value = defaultMessage
}

const placeholderText = computed(() => {
  const match = templateLine.value.match(/placeholder="([^"]*)"/)
  return match ? match[1] : '请输入内容'
})

const renderedText = computed(() => {
  if (templateLine.value.includes('{{')) {
    return templateLine.value.replace('{{ message }}', message.value)
  }
  return `Hello ${message.value}`
})

const codeDetails = computed(() => explainVueTemplate(templateLine.value))
</script>

<style scoped>
.play-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.play-card__header h3 {
  margin: 0;
  font-size: 18px;
}

.play-card__header p {
  margin: 6px 0 0;
  color: #606266;
  font-size: 13px;
}

.play-card__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.play-card__actions {
  display: flex;
  justify-content: flex-end;
}

.play-card__label {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
}

.vue-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vue-demo__input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
}

.vue-demo__result {
  margin: 0;
  padding: 12px;
  border-radius: 10px;
  background: #f0f9eb;
  color: #529b2e;
}

.play-card__explain,
.play-card__tips {
  padding: 12px 14px;
  border-radius: 12px;
}

.play-card__explain {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}

.play-card__tips {
  background: #fff7e6;
  border: 1px solid #ffd591;
}

.play-card__explain-title,
.play-card__tips-title {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
}

.play-card__explain-title {
  color: #389e0d;
}

.play-card__tips-title {
  color: #ad6800;
}

.play-card__explain ul,
.play-card__tips ul {
  margin: 0;
  padding-left: 18px;
}

.play-card__explain ul {
  color: #527a1f;
}

.play-card__tips ul {
  color: #8c6d1f;
}
</style>

<template>
  <el-card class="play-card" shadow="hover">
    <template #header>
      <div class="play-card__header">
        <div>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
        <el-tag size="small" type="info">jQuery 单行代码</el-tag>
      </div>
    </template>

    <div class="play-card__body">
      <label class="play-card__label">代码行</label>
      <el-input v-model="code" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" />

      <div class="play-card__actions">
        <el-button type="primary" @click="runLine">运行</el-button>
        <el-button @click="resetStage">重置示例</el-button>
      </div>

      <div ref="stageRef" class="play-card__stage" />

      <div v-if="errorMessage" class="play-card__error">{{ errorMessage }}</div>

      <div v-if="codeDetails.length" class="play-card__explain">
        <span class="play-card__explain-title">代码拆解</span>
        <ul>
          <li v-for="item in codeDetails" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div v-if="tips.length" class="play-card__tips">
        <span class="play-card__tips-title">易错点 / 易混点</span>
        <ul>
          <li v-for="tip in tips" :key="tip">{{ tip }}</li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import $ from 'jquery'
import { computed, nextTick, onMounted, ref } from 'vue'
import { explainJQueryCode } from '../codeExplain'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  initialCode: {
    type: String,
    required: true,
  },
  initialHtml: {
    type: String,
    required: true,
  },
  tips: {
    type: Array,
    default: () => [],
  },
})

const code = ref(props.initialCode)
const stageRef = ref(null)
const errorMessage = ref('')

const resetStage = async () => {
  code.value = props.initialCode
  stageRef.value.innerHTML = props.initialHtml
  await nextTick()
  errorMessage.value = ''
}

const runLine = () => {
  try {
    const $root = $(stageRef.value)
    const runner = new Function('$root', '$', code.value)
    runner($root, $)
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error.message
  }
}

const codeDetails = computed(() => explainJQueryCode(code.value))

onMounted(() => {
  resetStage()
})
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

.play-card__label {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
}

.play-card__actions {
  display: flex;
  gap: 10px;
}

.play-card__stage {
  min-height: 160px;
  padding: 16px;
  border-radius: 12px;
  background: #f7fbff;
  border: 1px solid #dce8f9;
}

.play-card__stage :deep(.jq-box) {
  position: relative;
  width: 140px;
  padding: 12px;
  border-radius: 10px;
  background: #1677ff;
  color: #fff;
}

.play-card__stage :deep(.jq-message) {
  margin: 0 0 12px;
}

.play-card__error {
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff2f0;
  color: #cf1322;
  border: 1px solid #ffccc7;
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

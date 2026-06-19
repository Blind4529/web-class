<template>
  <el-card class="play-card" shadow="hover">
    <template #header>
      <div class="play-card__header">
        <div>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
        <el-tag size="small" type="success">JS 单行代码</el-tag>
      </div>
    </template>

    <div class="play-card__body">
      <label class="play-card__label">代码行</label>
      <el-input v-model="code" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" />

      <div class="play-card__actions">
        <el-button plain @click="resetCode">重置示例</el-button>
      </div>

      <label class="play-card__label">实时效果</label>
      <iframe class="play-card__frame" :srcdoc="srcdoc" />

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
import { computed, ref } from 'vue'
import { explainJsCode } from '../codeExplain'

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
  html: {
    type: String,
    required: true,
  },
  tips: {
    type: Array,
    default: () => [],
  },
})

const code = ref(props.initialCode)

const resetCode = () => {
  code.value = props.initialCode
}

const srcdoc = computed(() => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      margin: 0;
      padding: 16px;
      font-family: "Segoe UI", Arial, sans-serif;
      color: #303133;
    }
    .box {
      padding: 12px;
      border-radius: 12px;
      background: #f5f7fa;
      border: 1px solid #dcdfe6;
    }
    button {
      margin-top: 12px;
      border: 0;
      border-radius: 8px;
      background: #1677ff;
      color: #fff;
      padding: 8px 14px;
    }
  </style>
</head>
<body>
  ${props.html}
  <script>
    try {
      ${code.value}
    } catch (error) {
      document.body.insertAdjacentHTML('beforeend', '<pre style="color:#cf1322;">' + error.message + '</pre>');
    }
  <\/script>
</body>
</html>`)

const codeDetails = computed(() => explainJsCode(code.value))
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

.play-card__frame {
  width: 100%;
  height: 180px;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  background: #fff;
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

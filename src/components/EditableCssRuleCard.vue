<template>
  <el-card class="play-card" shadow="hover">
    <template #header>
      <div class="play-card__header">
        <div>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
        <el-tag size="small" type="warning">CSS 单行规则</el-tag>
      </div>
    </template>

    <div class="play-card__body">
      <label class="play-card__label">规则行</label>
      <el-input v-model="rule" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" />

      <div class="play-card__actions">
        <el-button plain @click="resetRule">重置示例</el-button>
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
import { explainCssRule } from '../codeExplain'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  initialRule: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  baseStyles: {
    type: String,
    default: '',
  },
  tips: {
    type: Array,
    default: () => [],
  },
})

const rule = ref(props.initialRule)

const resetRule = () => {
  rule.value = props.initialRule
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
      background: #fff;
      color: #303133;
    }
    .stage {
      position: relative;
      min-height: 120px;
      padding: 16px;
      border-radius: 12px;
      background: #f8fbff;
      border: 1px solid #dce8f9;
    }
    .demo-box {
      display: inline-block;
      margin: 6px;
      padding: 10px 12px;
      border-radius: 10px;
      background: #409eff;
      color: #fff;
    }
    .anchor {
      padding: 8px 10px;
      border-radius: 8px;
      background: #ecf5ff;
      color: #409eff;
      display: inline-block;
    }
    ${props.baseStyles}
    ${rule.value}
  </style>
</head>
<body>
  ${props.html}
</body>
</html>`)

const codeDetails = computed(() => explainCssRule(rule.value))
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
  height: 190px;
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

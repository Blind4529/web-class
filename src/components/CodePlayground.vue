<template>
  <div class="playground-page">
    <section class="playground-hero">
      <div>
        <p class="playground-hero__eyebrow">LIVE CODE BOARD</p>
        <h1>代码练习板</h1>
        <p class="playground-hero__desc">
          左边敲代码，右边同步预览。支持 `HTML` 页面片段练习，也支持 `Vue` 小型组件练习，适合边写边记忆语法。
        </p>
      </div>
      <div class="playground-hero__meta">
        <span>双模式切换</span>
        <span>实时预览</span>
        <span>支持重置</span>
      </div>
    </section>

    <el-card class="playground-toolbar" shadow="hover">
      <div class="playground-toolbar__inner">
        <div class="playground-mode">
          <span class="playground-label">练习模式</span>
          <div class="playground-chip-group">
            <button
              v-for="item in modes"
              :key="item.id"
              type="button"
              class="playground-chip"
              :class="{ 'is-active': activeMode === item.id }"
              @click="switchMode(item.id)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="playground-preset">
          <span class="playground-label">示例模板</span>
          <el-select v-model="selectedPresetId" class="playground-select" @change="applyPreset">
            <el-option
              v-for="preset in currentMode.presets"
              :key="preset.id"
              :label="preset.label"
              :value="preset.id"
            />
          </el-select>
        </div>

        <div class="playground-toolbar__actions">
          <el-button plain @click="resetCode">重置模板</el-button>
        </div>
      </div>
    </el-card>

    <section class="playground-layout">
      <el-card class="playground-editor" shadow="hover">
        <template #header>
          <div class="playground-panel__header">
            <div>
              <h2>代码输入区</h2>
              <p>{{ currentMode.editorHint }}</p>
            </div>
            <el-tag type="primary">{{ currentMode.label }}</el-tag>
          </div>
        </template>

        <div class="playground-editor__body">
          <div class="playground-help">
            <div class="playground-help__block">
              <span class="playground-label">支持格式</span>
              <p>{{ currentMode.supportText }}</p>
            </div>
            <div class="playground-help__block">
              <span class="playground-label">练习建议</span>
              <p>{{ currentMode.tip }}</p>
            </div>
          </div>

          <el-input
            v-model="code"
            type="textarea"
            :autosize="{ minRows: 18, maxRows: 28 }"
            class="playground-editor__input"
          />
        </div>
      </el-card>

      <div class="playground-preview-column">
        <el-card class="playground-preview" shadow="hover">
          <template #header>
            <div class="playground-panel__header">
              <div>
                <h2>同步预览区</h2>
                <p>代码修改后，这里会自动刷新显示。</p>
              </div>
              <el-tag type="success">实时预览</el-tag>
            </div>
          </template>

          <iframe
            class="playground-preview__frame"
            :srcdoc="previewDoc"
            title="代码练习板预览"
          />
        </el-card>

        <el-card class="playground-guide" shadow="hover">
          <template #header>
            <div class="playground-panel__header">
              <div>
                <h2>快速说明</h2>
                <p>练习时建议先改文字，再改结构，最后补样式和交互。</p>
              </div>
            </div>
          </template>

          <ul class="playground-guide__list">
            <li v-for="item in currentMode.guide" :key="item">{{ item }}</li>
          </ul>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const htmlPresets = [
  {
    id: 'html-card',
    label: '完整 HTML 卡片',
    code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML 练习板</title>
  <style>
    body {
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      font-family: Arial, sans-serif;
    }

    .card {
      max-width: 420px;
      padding: 24px;
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
    }

    h1 {
      margin-top: 0;
      color: #1677ff;
    }

    button {
      margin-top: 12px;
      border: 0;
      border-radius: 10px;
      padding: 10px 16px;
      background: #2563eb;
      color: #ffffff;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <section class="card">
    <h1>HTML 完整页面练习</h1>
    <p>试着修改标题、颜色、按钮文字和卡片结构。</p>
    <button onclick="this.textContent='已点击'">点我试试</button>
  </section>
</body>
</html>`,
  },
  {
    id: 'html-form',
    label: '完整 HTML 表单',
    code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>登录表单练习</title>
  <style>
    body {
      margin: 0;
      padding: 24px;
      background: linear-gradient(135deg, #eff6ff, #f8fafc);
      font-family: Arial, sans-serif;
    }

    .login-form {
      width: 320px;
      display: grid;
      gap: 10px;
      padding: 24px;
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 0 12px 30px rgba(37, 99, 235, 0.12);
    }

    input {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 10px 12px;
    }

    button {
      margin-top: 6px;
      border: 0;
      border-radius: 10px;
      padding: 10px 16px;
      background: #0f766e;
      color: #ffffff;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <form class="login-form">
    <h1>登录练习</h1>
    <label for="username">用户名</label>
    <input id="username" placeholder="请输入用户名">
    <label for="password">密码</label>
    <input id="password" type="password" placeholder="请输入密码">
    <button type="button">登录</button>
  </form>
</body>
</html>`,
  },
]

const vuePresets = [
  {
    id: 'vue-counter',
    label: '完整 Vue 计数器',
    code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 计数器练习</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    body {
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      font-family: Arial, sans-serif;
    }

    .panel {
      max-width: 420px;
      padding: 24px;
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
    }

    h1 {
      margin-top: 0;
      color: #42b883;
    }

    input {
      display: block;
      width: 100%;
      margin: 12px 0;
      padding: 10px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
    }

    button {
      border: 0;
      border-radius: 10px;
      padding: 10px 16px;
      background: #0f766e;
      color: #ffffff;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="app" class="panel">
    <h1>{{ title }}</h1>
    <p>当前计数：{{ count }}</p>
    <input v-model="title" placeholder="修改标题">
    <button @click="count++">点击加一</button>
  </div>

  <script>
    const { createApp } = Vue

    createApp({
      data() {
        return {
          title: 'Vue 完整页面练习',
          count: 0,
        }
      },
    }).mount('#app')
  <\/script>
</body>
</html>`,
  },
  {
    id: 'vue-list',
    label: '完整 Vue 列表过滤',
    code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 列表过滤练习</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    body {
      margin: 0;
      padding: 24px;
      background: linear-gradient(135deg, #f0fdf4, #f8fafc);
      font-family: Arial, sans-serif;
    }

    .panel {
      max-width: 460px;
      padding: 24px;
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 0 12px 32px rgba(16, 185, 129, 0.12);
    }

    input {
      width: 100%;
      margin: 12px 0 16px;
      padding: 10px 12px;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
    }

    ul {
      margin: 0;
      padding-left: 20px;
    }

    li + li {
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div id="app" class="panel">
    <h1>Vue 列表练习</h1>
    <input v-model="keyword" placeholder="输入关键字筛选">
    <ul>
      <li v-for="item in filteredCourses" :key="item">{{ item }}</li>
    </ul>
  </div>

  <script>
    const { createApp } = Vue

    createApp({
      data() {
        return {
          keyword: '',
          courses: ['HTML', 'CSS', 'JavaScript', 'Vue'],
        }
      },
      computed: {
        filteredCourses() {
          return this.courses.filter((item) =>
            item.toLowerCase().includes(this.keyword.toLowerCase())
          )
        },
      },
    }).mount('#app')
  <\/script>
</body>
</html>`,
  },
]

const modes = [
  {
    id: 'html',
    label: 'HTML 模式',
    presets: htmlPresets,
    editorHint: '从 `<!DOCTYPE html>` 开始练完整页面代码，适合按考试与作业写法整页练习。',
    supportText: '建议直接写完整 HTML 文档，包括 `head`、`body`、`style` 和少量原生 `script`。',
    tip: '先改 `title`、结构和文案，再补样式，最后加交互。',
    guide: [
      '推荐从 `<!DOCTYPE html>` 到 `</html>` 全部自己写一遍。',
      '可以直接练 `meta`、`title`、`link`、`style`、`script` 的完整位置。',
      '修改 class 名后，记得同步修改 CSS 选择器。',
    ],
  },
  {
    id: 'vue',
    label: 'Vue 模式',
    presets: vuePresets,
    editorHint: '同样从 `<!DOCTYPE html>` 开始写完整 Vue 页面，适合练习 CDN 引入 Vue 的完整结构。',
    supportText: '推荐完整写出 `script src`、根节点 `#app`、`createApp()`、`data`、`computed`、事件绑定。',
    tip: '先保证 HTML 骨架正确，再写 Vue 指令和 `createApp` 逻辑。',
    guide: [
      '推荐练习 `{{ }}`、`v-model`、`v-for`、`@click` 和 `computed`。',
      'Vue 模式使用完整 HTML 文档，通过 CDN 加载 Vue 运行时。',
      '如果预览异常，优先检查 `#app`、`createApp()` 和脚本标签是否完整。',
    ],
  },
]

const activeMode = ref('html')
const selectedPresetId = ref(htmlPresets[0].id)
const code = ref(htmlPresets[0].code)

const currentMode = computed(() => modes.find((item) => item.id === activeMode.value) ?? modes[0])

const activePreset = computed(
  () => currentMode.value.presets.find((item) => item.id === selectedPresetId.value) ?? currentMode.value.presets[0],
)

const switchMode = (modeId) => {
  activeMode.value = modeId
  selectedPresetId.value = modes.find((item) => item.id === modeId)?.presets[0]?.id ?? ''
  code.value = modes.find((item) => item.id === modeId)?.presets[0]?.code ?? ''
}

const applyPreset = (presetId) => {
  const preset = currentMode.value.presets.find((item) => item.id === presetId)
  if (preset) {
    code.value = preset.code
  }
}

const resetCode = () => {
  code.value = activePreset.value?.code ?? ''
}

const normalizePreviewDoc = (source) => {
  const trimmed = source.trim()
  if (/^<!doctype html>/i.test(trimmed) || /^<html[\s>]/i.test(trimmed)) {
    return trimmed
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>代码练习板</title>
</head>
<body>
${source}
</body>
</html>`
}

const previewDoc = computed(() => normalizePreviewDoc(code.value))
</script>

<template>
  <el-card class="play-card" shadow="hover">
    <template #header>
      <div class="play-card__header">
        <div>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
        <el-tag size="small">一行代码可编辑</el-tag>
      </div>
    </template>

    <div class="play-card__body">
      <label class="play-card__label">代码行</label>
      <el-input v-model="code" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" />

      <div class="play-card__actions">
        <el-button plain @click="resetCode">重置示例</el-button>
      </div>

      <label class="play-card__label">实时效果</label>
      <iframe class="play-card__frame" :style="{ height }" :srcdoc="srcdoc" />

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
import { explainHtmlCode } from '../codeExplain'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  initialLine: {
    type: String,
    required: true,
  },
  wrapperBefore: {
    type: String,
    default: '',
  },
  wrapperAfter: {
    type: String,
    default: '',
  },
  previewStyles: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '160px',
  },
  tips: {
    type: Array,
    default: () => [],
  },
})

const code = ref(props.initialLine)

const resetCode = () => {
  code.value = props.initialLine
}

const extractAttr = (source, name) => {
  const doubleMatch = source.match(new RegExp(`${name}="([^"]*)"`, 'i'))
  if (doubleMatch) return doubleMatch[1]
  const singleMatch = source.match(new RegExp(`${name}='([^']*)'`, 'i'))
  return singleMatch ? singleMatch[1] : ''
}

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const renderSpecialPreview = (source) => {
  const trimmed = source.trim()
  const lower = trimmed.toLowerCase()

  if (lower.startsWith('<link') && lower.includes('stylesheet')) {
    const href = extractAttr(trimmed, 'href') || 'externalstyle.css'
    return `
      <div class="sim-card">
        <div class="sim-badge">External CSS</div>
        <h3>外部样式表已接入</h3>
        <p>当前样式文件：<strong>${escapeHtml(href)}</strong></p>
        <div class="sim-row">
          <div class="sim-box sim-box--blue">标题样式</div>
          <div class="sim-box sim-box--green">卡片样式</div>
        </div>
        <button class="sim-button">Styled Button</button>
      </div>
    `
  }

  if (lower.startsWith('<meta') && lower.includes('refresh')) {
    const seconds = extractAttr(trimmed, 'content') || '30'
    return `
      <div class="sim-card">
        <div class="sim-badge">Meta Refresh</div>
        <h3>页面自动刷新模拟</h3>
        <div class="sim-countdown">${escapeHtml(seconds)}s</div>
        <p>浏览器会在设定秒数后重新加载页面。</p>
      </div>
    `
  }

  if (lower.startsWith('<meta') && lower.includes('viewport')) {
    return `
      <div class="sim-card">
        <div class="sim-badge">Viewport</div>
        <h3>移动端适配视口</h3>
        <div class="phone-frame">
          <div class="phone-frame__top"></div>
          <div class="phone-frame__screen">
            <div class="phone-frame__bar"></div>
            <div class="phone-frame__grid">
              <span></span><span></span>
            </div>
          </div>
        </div>
        <p>让页面宽度跟随设备宽度，避免移动端缩放失真。</p>
      </div>
    `
  }

  if (lower.startsWith('<script') && lower.includes('src=')) {
    const src = extractAttr(trimmed, 'src') || 'app.js'
    const mode = lower.includes('defer') ? 'defer 延迟执行' : lower.includes('async') ? 'async 异步执行' : '普通加载'
    return `
      <div class="sim-card">
        <div class="sim-badge">External Script</div>
        <h3>外部脚本加载模拟</h3>
        <p>脚本文件：<strong>${escapeHtml(src)}</strong></p>
        <p>执行模式：<strong>${mode}</strong></p>
        <div class="sim-console">console.log("script loaded")</div>
      </div>
    `
  }

  if (lower.startsWith('<script') && lower.includes('colorbox')) {
    return `
      <div class="sim-card">
        <div class="sim-badge">Colorbox Plugin</div>
        <h3>灯箱插件初始化效果</h3>
        <div class="gallery-row">
          <div class="gallery-thumb">Image 1</div>
          <div class="gallery-thumb">Image 2</div>
          <div class="gallery-thumb">Image 3</div>
        </div>
        <div class="lightbox-preview">点击缩略图后会弹出覆盖层并支持分组浏览</div>
      </div>
    `
  }

  if (lower.startsWith('<base')) {
    const href = extractAttr(trimmed, 'href') || 'd:/assets/img/'
    return `
      <div class="sim-card">
        <div class="sim-badge">Base Path</div>
        <h3>相对路径解析模拟</h3>
        <p>基准地址：<strong>${escapeHtml(href)}</strong></p>
        <div class="sim-path-list">
          <div>room1.jpg -> ${escapeHtml(href)}room1.jpg</div>
          <div>icons/logo.png -> ${escapeHtml(href)}icons/logo.png</div>
        </div>
      </div>
    `
  }

  if (lower.includes('<pre>') && (lower.includes('npm ') || lower.includes('vue create') || lower.includes('node -v'))) {
    const lines = trimmed
      .replace('<pre>', '')
      .replace('</pre>', '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `<div><span class="sim-terminal__prompt">$</span> ${escapeHtml(line)}</div>`)
      .join('')
    return `
      <div class="sim-card">
        <div class="sim-badge">CLI Demo</div>
        <h3>命令行执行流程</h3>
        <div class="sim-terminal">${lines}</div>
      </div>
    `
  }

  if (lower.includes('&lt;template&gt;') && lower.includes('&lt;script&gt;') && lower.includes('&lt;style')) {
    return `
      <div class="sim-card">
        <div class="sim-badge">SFC Structure</div>
        <h3>.vue 单文件组件结构</h3>
        <div class="sfc-stack">
          <div class="sfc-block sfc-block--template">template: 页面结构</div>
          <div class="sfc-block sfc-block--script">script: 数据与逻辑</div>
          <div class="sfc-block sfc-block--style">style scoped: 当前组件样式</div>
        </div>
      </div>
    `
  }

  if (lower.includes('components: { specialbutton }')) {
    return `
      <div class="sim-card">
        <div class="sim-badge">Local Registration</div>
        <h3>局部注册关系图</h3>
        <div class="relation-flow">
          <div class="relation-node">ParentBox</div>
          <div class="relation-arrow">imports</div>
          <div class="relation-node relation-node--purple">SpecialButton</div>
        </div>
        <p>只有 ParentBox 里能直接使用 SpecialButton。</p>
      </div>
    `
  }

  if (lower.includes('app.component(')) {
    return `
      <div class="sim-card">
        <div class="sim-badge">Global Registration</div>
        <h3>全局注册关系图</h3>
        <div class="relation-flow">
          <div class="relation-node">main.js</div>
          <div class="relation-arrow">app.component()</div>
          <div class="relation-node relation-node--green">GlobalAlert</div>
        </div>
        <p>注册完成后，多个页面都可以直接使用该组件。</p>
      </div>
    `
  }

  if (lower.includes('component :is')) {
    return `
      <div class="sim-card">
        <div class="sim-badge">Dynamic Component</div>
        <h3>动态组件切换模拟</h3>
        <div class="sim-tabs">
          <span class="active">Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <div class="sim-panel">当前展示的是通过 <code>:is</code> 选中的组件内容。</div>
      </div>
    `
  }

  if (lower.includes('@mouseover') && lower.includes('@mouseout')) {
    return `
      <div class="sim-card">
        <div class="sim-badge">Mouse Events</div>
        <h3>鼠标事件交互模拟</h3>
        <div class="hover-demo">Hover Me</div>
        <p>移入后文字和背景会变化，模拟组件中 hover 状态切换。</p>
      </div>
    `
  }

  return ''
}

const specialPreviewHtml = computed(() => renderSpecialPreview(code.value))

const srcdoc = computed(() => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      margin: 0;
      padding: 16px;
      font-family: "Segoe UI", Arial, sans-serif;
      background: #ffffff;
      color: #303133;
      line-height: 1.6;
    }
    a { color: #1677ff; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #dcdfe6; padding: 8px; text-align: center; }
    fieldset { border: 1px solid #dcdfe6; border-radius: 10px; padding: 12px; }
    code { font-family: Consolas, monospace; background:#f5f7fa; padding:2px 6px; border-radius:6px; }
    .sim-card { padding: 16px; border-radius: 16px; background: linear-gradient(135deg, #f8fbff, #ffffff); border: 1px solid #d9ecff; }
    .sim-badge { display:inline-block; margin-bottom:10px; padding:4px 10px; border-radius:999px; background:#e6f4ff; color:#1677ff; font-size:12px; font-weight:700; }
    .sim-card h3 { margin: 0 0 8px; font-size: 20px; }
    .sim-card p { margin: 8px 0 0; color: #4e5969; }
    .sim-row { display:flex; gap:12px; flex-wrap:wrap; margin: 14px 0; }
    .sim-box { min-width:120px; padding:14px; border-radius:12px; color:#fff; text-align:center; }
    .sim-box--blue { background:#1677ff; }
    .sim-box--green { background:#52c41a; }
    .sim-button { margin-top: 6px; border: 0; border-radius: 10px; background:#722ed1; color:#fff; padding:10px 16px; }
    .sim-countdown { width: 82px; height: 82px; display:flex; align-items:center; justify-content:center; margin: 12px 0; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #69b1ff, #1677ff); color:#fff; font-size:24px; font-weight:700; }
    .phone-frame { width: 150px; margin: 12px 0; padding: 10px; border-radius: 24px; background:#1f1f1f; }
    .phone-frame__top { width: 60px; height: 8px; margin: 0 auto 12px; border-radius: 999px; background:#595959; }
    .phone-frame__screen { border-radius: 16px; background:#fff; padding: 10px; }
    .phone-frame__bar { height: 18px; border-radius: 8px; background:#1677ff; margin-bottom: 8px; }
    .phone-frame__grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
    .phone-frame__grid span { display:block; height: 54px; border-radius:10px; background:#d6e4ff; }
    .sim-console { margin-top:12px; padding:12px; border-radius:12px; background:#141414; color:#95de64; font-family: Consolas, monospace; }
    .gallery-row { display:flex; gap:10px; margin: 12px 0; }
    .gallery-thumb { flex:1; min-height:72px; display:flex; align-items:center; justify-content:center; border-radius:12px; background:#d6e4ff; color:#1677ff; font-weight:700; }
    .lightbox-preview { padding:12px; border-radius:12px; background:#1f1f1f; color:#fff; }
    .sim-path-list { margin-top: 12px; display:flex; flex-direction:column; gap:8px; }
    .sim-path-list div { padding:10px 12px; border-radius:10px; background:#f5f7fa; font-family: Consolas, monospace; }
    .sim-terminal { margin-top: 12px; padding: 14px; border-radius: 14px; background:#0f172a; color:#e2e8f0; font-family: Consolas, monospace; }
    .sim-terminal__prompt { color:#95de64; }
    .sfc-stack { display:flex; flex-direction:column; gap:10px; margin-top: 12px; }
    .sfc-block { padding:14px 16px; border-radius:12px; color:#fff; font-weight:700; }
    .sfc-block--template { background:#1677ff; }
    .sfc-block--script { background:#722ed1; }
    .sfc-block--style { background:#52c41a; }
    .relation-flow { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin: 14px 0; }
    .relation-node { padding:12px 16px; border-radius:12px; background:#e6f4ff; color:#1677ff; font-weight:700; }
    .relation-node--purple { background:#f9f0ff; color:#722ed1; }
    .relation-node--green { background:#f6ffed; color:#389e0d; }
    .relation-arrow { color:#8c8c8c; font-weight:700; }
    .sim-tabs { display:flex; gap:10px; margin: 12px 0; }
    .sim-tabs span { padding:8px 12px; border-radius:10px; background:#f5f7fa; color:#606266; }
    .sim-tabs .active { background:#1677ff; color:#fff; }
    .sim-panel { padding:14px; border-radius:12px; background:#f5fbff; border:1px solid #d9ecff; }
    .hover-demo { width: 160px; padding:14px; border-radius:12px; background:#e6f4ff; color:#1677ff; text-align:center; font-weight:700; transition: all .2s ease; }
    .hover-demo:hover { background:#fff1f0; color:#f5222d; transform: translateY(-2px); }
    ${props.previewStyles}
  </style>
</head>
<body>
  ${specialPreviewHtml.value || `${props.wrapperBefore}${code.value}${props.wrapperAfter}`}
</body>
</html>`)

const codeDetails = computed(() => explainHtmlCode(code.value))
</script>

<style scoped>
.play-card {
  border-radius: 16px;
}

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

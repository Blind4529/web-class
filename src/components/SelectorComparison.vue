<template>
  <el-card class="selector-card" shadow="hover">
    <template #header>
      <div class="selector-card__header">
        <div>
          <h3>CSS 选择器四种高频混淆对比</h3>
          <p>直接改选择器和 HTML 结构，观察 `div p`、`div > p`、`div + p`、`div ~ p` 的差异。</p>
        </div>
        <el-tag type="danger">重点易混</el-tag>
      </div>
    </template>

    <div class="selector-card__body">
      <div class="selector-card__editor">
        <label>示例 HTML</label>
        <el-input v-model="htmlCode" type="textarea" :autosize="{ minRows: 7, maxRows: 12 }" />
      </div>

      <div class="selector-card__actions">
        <el-button plain @click="resetDemo">重置示例</el-button>
      </div>

      <div class="selector-grid">
        <div v-for="item in selectorList" :key="item.key" class="selector-grid__item">
          <label>{{ item.label }}</label>
          <el-input v-model="selectors[item.key]" />
          <p class="selector-grid__desc">{{ item.desc }}</p>
          <div v-if="resultMap[item.key].error" class="selector-grid__error">
            选择器错误：{{ resultMap[item.key].error }}
          </div>
          <div v-else class="selector-grid__result">
            <div class="selector-grid__count">匹配数量：{{ resultMap[item.key].count }}</div>
            <div class="selector-grid__preview" v-html="resultMap[item.key].html" />
          </div>
        </div>
      </div>

      <div class="selector-card__tips">
        <span>记忆口诀</span>
        <ul>
          <li>`div p`：只要在 div 里面，隔几层都算。</li>
          <li>`div > p`：必须是 div 的亲儿子。</li>
          <li>`div + p`：只找 div 后面紧挨着的第一个 p。</li>
          <li>`div ~ p`：找 div 后面所有同级 p，但必须同级，且在 div 后面。</li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const defaultHtmlCode = `<div class="wrap">
  <p>div 的直接子级 p</p>
  <section><p>div 里的后代 p</p></section>
</div>
<p>紧邻 div 后的 p</p>
<p>同级后续 p</p>
<span>span 元素</span>
<p>被 span 隔开的 p</p>`

const htmlCode = ref(defaultHtmlCode)

const defaultSelectors = {
  descendant: 'div p',
  child: 'div > p',
  adjacent: 'div + p',
  sibling: 'div ~ p',
}

const selectors = reactive({
  ...defaultSelectors,
})

const selectorList = [
  { key: 'descendant', label: 'div p', desc: '后代选择器：匹配 div 内部所有层级的 p。' },
  { key: 'child', label: 'div > p', desc: '子代选择器：只匹配 div 的直接子元素 p。' },
  { key: 'adjacent', label: 'div + p', desc: '相邻兄弟：只匹配 div 后面紧挨着的第一个同级 p。' },
  { key: 'sibling', label: 'div ~ p', desc: '通用兄弟：匹配 div 后面所有同级 p。' },
]

const buildPreview = (selector) => {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(`<div class="demo-root">${htmlCode.value}</div>`, 'text/html')
    const root = doc.body.firstElementChild
    const matches = root.querySelectorAll(selector)

    matches.forEach((element) => {
      element.classList.add('matched')
    })

    return {
      count: matches.length,
      html: root.innerHTML,
      error: '',
    }
  } catch (error) {
    return {
      count: 0,
      html: '',
      error: error.message,
    }
  }
}

const resultMap = computed(() => ({
  descendant: buildPreview(selectors.descendant),
  child: buildPreview(selectors.child),
  adjacent: buildPreview(selectors.adjacent),
  sibling: buildPreview(selectors.sibling),
}))

const resetDemo = () => {
  htmlCode.value = defaultHtmlCode
  selectors.descendant = defaultSelectors.descendant
  selectors.child = defaultSelectors.child
  selectors.adjacent = defaultSelectors.adjacent
  selectors.sibling = defaultSelectors.sibling
}
</script>

<style scoped>
.selector-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.selector-card__header h3 {
  margin: 0;
  font-size: 18px;
}

.selector-card__header p {
  margin: 6px 0 0;
  color: #606266;
  font-size: 13px;
}

.selector-card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.selector-card__actions {
  display: flex;
  justify-content: flex-end;
}

.selector-card__editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.selector-card__editor label,
.selector-grid__item label {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
}

.selector-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.selector-grid__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border-radius: 14px;
  background: #fafcff;
  border: 1px solid #e6eef8;
}

.selector-grid__desc,
.selector-grid__count {
  margin: 0;
  color: #606266;
  font-size: 13px;
}

.selector-grid__preview {
  min-height: 132px;
  padding: 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #ebeef5;
  line-height: 1.8;
}

.selector-grid__error {
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff2f0;
  color: #cf1322;
  border: 1px solid #ffccc7;
}

.selector-card__tips {
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff7e6;
  border: 1px solid #ffd591;
}

.selector-card__tips span {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #ad6800;
}

.selector-card__tips ul {
  margin: 0;
  padding-left: 18px;
  color: #8c6d1f;
}

.selector-grid__preview :deep(.matched) {
  background: #ffd666;
  color: #613400;
  border-radius: 4px;
  padding: 1px 4px;
}

@media (max-width: 900px) {
  .selector-grid {
    grid-template-columns: 1fr;
  }
}
</style>

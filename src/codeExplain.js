const htmlTagDocs = {
  a: '用于创建超链接，常配合 href 和 target 控制跳转地址与打开方式。',
  audio: '用于嵌入音频，常配合 controls、autoplay、loop、muted。',
  base: '用于设置整页相对路径的基准地址，会影响当前文档中的相对链接解析。',
  br: '用于强制换行，是空标签。',
  button: '用于创建按钮，可通过 type 指定 submit、reset 或 button。',
  datalist: '为 input 提供候选建议列表，本身不是下拉框。',
  details: '用于创建可折叠区域，open 表示默认展开。',
  div: '块级容器，常用于页面布局和大块内容分组。',
  fieldset: '用于把一组表单控件语义化分组，常与 legend 搭配。',
  figcaption: '用于描述 figure 中的图片或媒体内容说明。',
  figure: '用于包裹图片、图表、代码片段等独立内容。',
  form: '用于收集并提交用户输入，常配合 action、method、target。',
  h1: '一级标题，通常用于最重要的页面标题。',
  h2: '二级标题，用于划分次一级内容。',
  hr: '用于插入主题分隔线，是空标签。',
  iframe: '用于在当前页面内嵌另一个页面或 HTML 片段。',
  img: '用于显示图片，常见关键属性是 src 和 alt。',
  input: '表单输入控件，具体行为由 type 决定。',
  legend: 'fieldset 的标题，用来说明这一组表单控件的主题。',
  li: '列表项标签，必须放在 ol 或 ul 中。',
  link: '常用于在 head 中引入外部样式表等外部资源关系。',
  meta: '用于提供字符集、描述、关键词、视口等元信息。',
  meter: '表示已知范围内的度量值，如评分、占用率。',
  ol: '有序列表，强调列表项顺序。',
  option: 'select 或 datalist 中的候选项。',
  output: '用于显示计算结果或脚本输出。',
  p: '段落标签，用于承载一段文本。',
  pre: '保留空格和换行，常用于展示代码或格式化文本。',
  progress: '表示任务进度，如下载进度或加载进度。',
  script: '用于编写或引入 JavaScript 代码。',
  select: '下拉选择控件，可通过 multiple 和 size 变成列表框。',
  span: '行内容器，常用于小范围文字或行内片段修饰。',
  style: '用于在页面内书写内部样式表。',
  summary: 'details 的标题行，点击它通常会展开或收起 details。',
  table: '表格容器，用于展示二维数据。',
  td: '表格普通单元格。',
  textarea: '多行文本输入框。',
  th: '表头单元格，通常表示列头或行头。',
  thead: '表格头部分组。',
  tbody: '表格主体分组。',
  tfoot: '表格尾部分组。',
  tr: '表格中的一行。',
  ul: '无序列表，强调集合而非先后顺序。',
  video: '用于嵌入视频，常配合 controls、muted、poster。',
}

const htmlAttrDocs = {
  action: '表单提交地址，提交时数据会发送到这里。',
  alt: '图片无法显示时的替代文本，也有助于可访问性和搜索引擎理解图片内容。',
  autocomplete: '控制浏览器是否自动补全输入内容。',
  autoplay: '表示媒体在加载后自动播放。',
  checked: '表示单选框或复选框默认被选中。',
  class: '为元素指定类名，便于批量复用 CSS 样式或脚本选择。',
  cols: '指定 textarea 的可见列宽。',
  colspan: '让单元格横向跨越多列。',
  content: '常用于 meta，表示元信息的具体值。',
  controls: '显示音频或视频的原生播放控件。',
  defer: '让脚本延迟到文档解析完成后执行，适合外链脚本。',
  for: 'label 或 output 指向关联元素的 id。',
  height: '控制元素高度，img、iframe、video 等常用。',
  href: '指定链接地址或外部资源地址。',
  'http-equiv': '让 meta 模拟 HTTP 响应头行为，如 refresh。',
  id: '为元素提供唯一标识，常用于 getElementById、label 关联和 CSS 精确选择。',
  list: '把 input 和 datalist 关联起来，提供输入建议。',
  loop: '媒体播放结束后重新循环播放。',
  max: '指定 number、range、meter、progress 等控件的最大值。',
  maxlength: '限制文本输入的最大字符数。',
  method: '指定表单提交方式，常见是 get 和 post。',
  min: '指定 number、range、meter、progress 等控件的最小值。',
  multiple: '允许 select 或文件选择控件一次选择多个值。',
  muted: '使媒体默认静音。',
  name: '为表单控件指定提交字段名，也是 radio 分组的重要依据。',
  open: '让 details 默认展开。',
  pattern: '为输入框提供正则校验规则。',
  placeholder: '在输入为空时显示提示文本。',
  poster: '视频未播放前展示的封面图。',
  readonly: '允许查看但不允许修改输入内容。',
  rel: '描述 link 或 a 与目标资源的关系。',
  required: '表示表单项必填。',
  rows: '指定 textarea 的可见行数。',
  size: '控制输入框可见宽度，或 select 可见项目数。',
  src: '指定图片、脚本、iframe、音视频等资源来源地址。',
  srcdoc: '直接把 HTML 字符串作为 iframe 的内嵌内容。',
  step: '控制 number 或 range 的步进增量。',
  style: '内联样式，直接把 CSS 写在当前元素上。',
  target: '指定链接或表单结果的打开位置，如 _blank 或某个 frame 名。',
  type: '指定 input、button、script 等标签的具体类型和行为。',
  value: '控件的当前值或默认值。',
  width: '控制元素宽度。',
}

const cssPropertyDocs = {
  background: '设置背景综合属性，可以同时写颜色、图片、重复方式等。',
  'background-color': '设置元素背景颜色。',
  border: '设置边框粗细、样式和颜色。',
  'border-collapse': '控制表格边框是否合并成单线。',
  bottom: '配合定位属性控制元素距离底部的位置。',
  clear: '清除浮动影响，让元素不再环绕前面的浮动元素。',
  color: '设置文字颜色。',
  display: '控制元素的显示类型，如 block、inline、none。',
  'font-family': '设置字体族。',
  'font-size': '设置字体大小。',
  'font-style': '设置字体样式，如 normal 或 italic。',
  'font-weight': '设置字体粗细。',
  float: '让元素向左或向右浮动。',
  height: '设置元素高度。',
  left: '配合定位属性控制元素距离左侧的位置。',
  'letter-spacing': '设置字符间距。',
  margin: '设置外边距。',
  'min-height': '设置最小高度。',
  opacity: '设置透明度，1 为完全不透明，0 为完全透明。',
  padding: '设置内边距。',
  position: '设置定位方式，如 static、relative、absolute、fixed。',
  right: '配合定位属性控制元素距离右侧的位置。',
  'text-align': '设置文本水平对齐方式。',
  'text-transform': '控制字母大小写转换。',
  top: '配合定位属性控制元素距离顶部的位置。',
  visibility: '控制元素可见性，hidden 会隐藏但仍占位。',
  width: '设置元素宽度。',
  'z-index': '控制定位元素的层叠顺序。',
}

const jsDocs = {
  const: 'const 用于声明常量，声明后不能重新赋值。',
  let: 'let 用于声明块级作用域变量，适合现代 JavaScript。',
  function: 'function 用于定义函数，把一段逻辑封装后重复调用。',
  return: 'return 用于把函数执行结果返回给调用方。',
  'document.getElementById': '根据 id 获取页面中的单个 DOM 元素。',
  textContent: '设置或读取纯文本内容，不会解析 HTML 标签。',
  innerHTML: '设置或读取 HTML 字符串，会按标签结构解析。',
  onsubmit: '表单提交事件，常用于提交前自定义校验。',
  preventDefault: '阻止浏览器默认行为，如阻止表单提交或链接跳转。',
  value: '读取或设置表单控件的当前值。',
}

const jqueryDocs = {
  '$root.find': '在当前演示容器内部查找匹配的元素，避免影响整个页面。',
  append: '把内容插入到目标元素内部的末尾。',
  prepend: '把内容插入到目标元素内部的开头。',
  after: '把内容插入到目标元素后面。',
  remove: '删除匹配元素本身及其所有子节点。',
  empty: '清空匹配元素内部内容，但保留元素本身。',
  slideToggle: '在展开和收起之间切换，并带滑动动画。',
  slideDown: '向下展开元素。',
  slideUp: '向上收起元素。',
  fadeToggle: '在淡入和淡出之间切换。',
  fadeIn: '淡入显示元素。',
  fadeOut: '淡出隐藏元素。',
  animate: '平滑修改可动画的 CSS 属性，如 left、opacity、width。',
  css: '动态修改元素样式。',
  text: '设置或读取纯文本内容。',
  html: '设置或读取 HTML 内容。',
}

const vueDirectiveDocs = {
  'v-model': '双向绑定表单值，输入框内容变化会同步更新数据，数据变化也会更新输入框。',
  'v-bind': '绑定 HTML 属性或组件 props，简写为冒号 :。',
  'v-on': '绑定事件监听器，简写为 @。',
  'v-if': '条件渲染，条件不满足时节点不会被创建。',
  'v-show': '通过 CSS display 控制显隐，节点始终存在。',
  'v-for': '根据数组或对象循环渲染列表。',
  'v-once': '只渲染一次，后续数据变化不会重新更新该节点。',
}

const toUniqueLines = (lines) => [...new Set(lines.filter(Boolean))]

export const explainHtmlCode = (code) => {
  const lines = []
  const tagMatches = [...code.matchAll(/<\s*([a-zA-Z][\w-]*)/g)].map((match) => match[1].toLowerCase())
  const attrMatches = [...code.matchAll(/([:@a-zA-Z-]+)\s*=\s*(['"])(.*?)\2/g)]

  toUniqueLines(tagMatches).forEach((tag) => {
    if (htmlTagDocs[tag]) {
      lines.push(`标签 <${tag}>：${htmlTagDocs[tag]}`)
    }
  })

  const attrInfo = {}
  attrMatches.forEach((match) => {
    const name = match[1].toLowerCase()
    const value = match[3]
    attrInfo[name] ||= []
    if (value && !attrInfo[name].includes(value)) {
      attrInfo[name].push(value)
    }
  })

  Object.entries(attrInfo).forEach(([name, values]) => {
    if (htmlAttrDocs[name]) {
      const example = values[0] ? ` 当前值示例：\`${values[0]}\`.` : ''
      lines.push(`属性 ${name}：${htmlAttrDocs[name]}${example}`)
    }
  })

  return toUniqueLines(lines)
}

export const explainCssRule = (rule) => {
  const lines = []
  const selector = rule.split('{')[0]?.trim()

  if (selector) {
    if (selector.includes('>')) {
      lines.push(`选择器 ${selector}：使用子代选择器，只匹配直接子元素。`)
    } else if (selector.includes('+')) {
      lines.push(`选择器 ${selector}：使用相邻兄弟选择器，只匹配后面紧挨着的一个兄弟元素。`)
    } else if (selector.includes('~')) {
      lines.push(`选择器 ${selector}：使用通用兄弟选择器，匹配后面所有同级兄弟元素。`)
    } else if (selector.includes(' ')) {
      lines.push(`选择器 ${selector}：使用后代选择器，可匹配更深层级的后代元素。`)
    } else {
      lines.push(`选择器 ${selector}：这是当前规则作用的目标元素范围。`)
    }
  }

  ;[...rule.matchAll(/([a-z-]+)\s*:\s*([^;]+);?/g)].forEach((match) => {
    const property = match[1].toLowerCase()
    const value = match[2].trim()
    if (cssPropertyDocs[property]) {
      lines.push(`属性 ${property}: ${value}：${cssPropertyDocs[property]}`)
    }
  })

  return toUniqueLines(lines)
}

export const explainJsCode = (code) => {
  const lines = []

  Object.entries(jsDocs).forEach(([token, desc]) => {
    if (code.includes(token)) {
      lines.push(`${token}：${desc}`)
    }
  })

  return toUniqueLines(lines)
}

export const explainJQueryCode = (code) => {
  const lines = []

  Object.entries(jqueryDocs).forEach(([token, desc]) => {
    if (code.includes(token)) {
      lines.push(`${token}()：${desc}`)
    }
  })

  return toUniqueLines(lines)
}

export const explainVueTemplate = (code) => {
  const lines = explainHtmlCode(code)

  Object.entries(vueDirectiveDocs).forEach(([token, desc]) => {
    if (code.includes(token)) {
      lines.push(`${token}：${desc}`)
    }
  })

  return toUniqueLines(lines)
}

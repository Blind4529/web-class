export const modules = [
  { id: 'overview', title: '复习总览' },
  { id: 'html', title: 'HTML5' },
  { id: 'css', title: 'CSS3' },
  { id: 'table', title: '表格与框架' },
  { id: 'form', title: '表单与 JavaScript' },
  { id: 'jquery', title: 'jQuery' },
  { id: 'bootstrap', title: 'Bootstrap' },
  { id: 'vue', title: 'Vue 3' },
]

export const chapterSummary = [
  {
    title: 'HTML5',
    points: [
      '文档骨架：DOCTYPE、html、head、body、title、meta、link、script、base、noscript。',
      '内容标签：h1-h6、p、b、i、u、br、hr、div、span、a、img、ol、ul、li。',
      '媒体与交互：audio、video、meter、progress、details、summary、iframe。',
      '语义化：header、nav、section、article、aside、figure、figcaption、footer。',
    ],
  },
  {
    title: 'CSS3',
    points: [
      '三种样式：inline、internal、external，优先级从高到低递减。',
      '选择器：元素、类、ID、后代、子代、相邻兄弟、通用兄弟、分组与嵌套。',
      '属性：字体、文本、背景、列表、表格、display、visibility、position、float、clear、z-index。',
      '定位：static、relative、absolute、fixed，并结合 top/right/bottom/left 使用。',
    ],
  },
  {
    title: '表格与框架',
    points: [
      'table、caption、thead、tbody、tfoot、tr、th、td 的结构与语义。',
      'colspan 横向合并单元格，rowspan 纵向合并单元格。',
      '表格常用样式：border、border-collapse、padding、text-align、width、height。',
      'iframe 相关：src、name、target、srcdoc、height、width 与内容嵌入。',
    ],
  },
  {
    title: '表单与 JavaScript',
    points: [
      'form 常见属性：action、method、target、autocomplete、novalidate。',
      'input 类型：text、password、email、tel、url、number、date、time、range、radio、checkbox、image。',
      '配套标签：label、fieldset、legend、select、option、optgroup、textarea、datalist、button、output。',
      'JS 基础：变量、运算符、函数、条件、循环、getElementById、表单对象与 onsubmit 验证。',
    ],
  },
  {
    title: 'jQuery 与 Bootstrap',
    points: [
      'jQuery：$(document).ready()、选择器、append、prepend、remove、click、hide/show/toggle、slide、fade、animate。',
      '插件概念：colorbox、galleria 可扩展图片灯箱与图库能力。',
      'Bootstrap：container、row、col、btn、badge、navbar、form-control、form-check、list-group、input-group、breadcrumb。',
      '响应式：12 栏栅格、breakpoints、spacing utilities、dropdown 与 navbar 折叠。',
    ],
  },
  {
    title: 'Vue 3',
    points: [
      '核心概念：响应式、组件化、虚拟 DOM、模板、指令、双向绑定。',
      '常用指令：v-bind、v-on、v-model、v-for、v-if、v-else、v-show、v-once。',
      'CLI 与结构：vue create、npm run serve、App.vue、main.js、src、public、package.json。',
      '组件专题：data() 返回新对象、局部注册、全局注册、动态组件、组件事件。',
    ],
  },
]

export const codeSnippets = {
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>RuoYi Review</title>
  <link rel="stylesheet" href="style.css">
  <script src="app.js"></script>
</head>
<body>
  <header>Header</header>
  <nav>Navigation</nav>
  <main>
    <article>Content</article>
    <aside>Tips</aside>
  </main>
  <footer>Footer</footer>
</body>
</html>`,
  css: `/* 优先级：inline > internal > external > browser default */
#heroTitle { color: #1677ff; }
.note { color: #722ed1; }
div > p { letter-spacing: 1px; }
.hidden { display: none; }
.ghost { visibility: hidden; }
.card { position: relative; }
.badge { position: absolute; top: 0; right: 0; }`,
  table: `<table border="1">
  <caption>Student Marks</caption>
  <thead>
    <tr><th>Name</th><th colspan="2">Scores</th></tr>
  </thead>
  <tbody>
    <tr><td rowspan="2">John</td><td>Math: 90</td><td>Science: 85</td></tr>
    <tr><td colspan="2">Total: 175</td></tr>
  </tbody>
</table>

<iframe name="contentFrame" srcdoc="<h3>Frame Content</h3>"></iframe>`,
  form: `<form id="reviewForm" onsubmit="return validateForm()">
  <input type="text" id="name" required placeholder="Name">
  <input type="email" id="email" required placeholder="Email">
  <input type="number" id="age" min="18" required>
  <select>
    <optgroup label="Framework">
      <option>Vue</option>
      <option>RuoYi</option>
    </optgroup>
  </select>
  <button type="submit">Submit</button>
</form>
<script>
function validateForm() {
  return document.getElementById('age').value >= 18;
}
</script>`,
  jquery: `$(document).ready(function () {
  $('#menu ul').hide();
  $('#toggleButton').click(function () {
    $('.panel').slideToggle('slow');
  });
  $('#box').animate({ left: '80px', opacity: 0.5 }, 400);
});`,
  bootstrap: `<div class="container-fluid">
  <div class="row">
    <div class="col-md-4">col-md-4</div>
    <div class="col-md-4">col-md-4</div>
    <div class="col-md-4">col-md-4</div>
  </div>
  <button class="btn btn-primary btn-sm">Save</button>
  <span class="badge badge-warning">3</span>
</div>`,
  vue: `<template>
  <input v-model="name" placeholder="Enter name">
  <p v-if="name">Hello {{ name }}</p>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.text }}</li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      items: [{ id: 1, text: 'HTML' }, { id: 2, text: 'Vue' }]
    }
  }
}
</script>`,
}

export const vueCliCommands = [
  'node -v / npm -v',
  'npm install -g @vue/cli',
  'vue --version',
  'vue create my-vue-project',
  'npm run serve',
  'npm run build',
]

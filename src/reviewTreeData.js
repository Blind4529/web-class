export const reviewTree = [
  {
    id: 'chapter-html',
    title: 'Chapter 1 HTML',
    children: [
      {
        id: 'html-structure',
        title: 'HTML 页面骨架与空标签',
        intro: '本节对应 PDF 中 HTML5 基本结构、DOCTYPE、html、head、body，以及 container tag 和 empty tag 的区别。',
        knowledge: [
          'DOCTYPE 必须写在第一行，用来告诉浏览器按照 HTML5 标准模式解析。',
          'html 是整个页面的根元素，head 存放元数据，body 存放用户可见内容。',
          '成对标签通常需要闭合，例如 html、head、body、p。',
          '空标签没有内容和结束标签，例如 br、hr、img，资料中也把 DOCTYPE 视为空标签式写法。',
        ],
        mistakes: [
          'DOCTYPE 不是普通 HTML 标签，位置错了可能影响浏览器解析模式。',
          '不要把 head 中的资源描述内容直接写到 body 的可见区域里。',
        ],
        demos: [
          {
            type: 'html',
            title: '最小 HTML5 模板',
            description: '修改标题和 body 内容，理解 head 与 body 的职责。',
            initialLine: '<!DOCTYPE html><html><head><title>Book Your Hotel</title></head><body>Book your favorite hotel.</body></html>',
            height: '180px',
            tips: ['title 影响标签页标题，body 才是页面主体内容。'],
          },
          {
            type: 'html',
            title: '空标签 br / hr',
            description: '改成不同文本和空标签，观察换行与分隔线。',
            initialLine: '<p>First line<br>Second line</p><hr>',
            tips: ['br 是换行；hr 是水平分隔线，不要和段落标签混淆。'],
          },
        ],
      },
      {
        id: 'html-head',
        title: 'HEAD 区域：title / meta / link / script / base / noscript',
        intro: '本节覆盖资料中 head 可包含的资源和元信息标签。',
        knowledge: [
          'title 决定浏览器标签页标题，通常每个文档只应有一个。',
          'meta 可描述 description、keywords、author，也可用 http-equiv 做刷新等行为。',
          'link 常用于外部样式表和外部关系描述，常见属性有 rel、href、media。',
          'script 可以写内部脚本，也可以通过 src 引用外部脚本，并配合 async、defer。',
          'base 用于设置相对路径的基准地址。',
          'noscript 用于脚本不可用时的降级提示。',
        ],
        mistakes: [
          'meta 是给浏览器和搜索引擎看的，不是页面可见正文。',
          'script 的 async 和 defer 都是异步思想，但执行时机不同。',
          'base 会影响所有相对路径，使用不当容易让资源路径整体失效。',
        ],
        demos: [
          {
            type: 'html',
            title: 'meta refresh',
            description: '修改刷新秒数，观察 meta 的写法。',
            initialLine: '<meta http-equiv="refresh" content="30">',
            wrapperBefore: '<p>这是 head 区域常见的自动刷新写法示例：</p><pre>',
            wrapperAfter: '</pre>',
            height: '140px',
            tips: ['这里展示的是代码写法，真正刷新行为通常放在完整文档 head 中。'],
          },
          {
            type: 'html',
            title: 'link 外链样式',
            description: '修改 rel 与 href，记忆外部样式表写法。',
            initialLine: '<link rel="stylesheet" href="StyleHome.css">',
            wrapperBefore: '<pre>',
            wrapperAfter: '</pre>',
            height: '120px',
            tips: ['最常见组合是 rel=stylesheet 与 href=样式路径。'],
          },
          {
            type: 'html',
            title: 'script 外链',
            description: '修改 src、defer、async 等属性。',
            initialLine: '<script src="app.js" defer></script>',
            wrapperBefore: '<pre>',
            wrapperAfter: '</pre>',
            height: '120px',
            tips: ['script 如果直接写在模板字符串里要注意结束标签转义问题。'],
          },
          {
            type: 'html',
            title: 'base 基准路径',
            description: '修改 href，理解相对资源如何被统一解析。',
            initialLine: '<base href="d:/assets/img/">',
            wrapperBefore: '<pre>',
            wrapperAfter: '</pre>',
            height: '120px',
            tips: ['base 常被忽略，但一旦设置会影响整页相对路径。'],
          },
        ],
      },
      {
        id: 'html-body-text',
        title: '正文文本、列表、DIV / SPAN、details / summary',
        intro: '本节覆盖 headings、paragraph、inline formatting、列表、div / span 区别，以及 details / summary 交互标签。',
        knowledge: [
          'h1-h6 表示不同层级标题，p 表示段落。',
          'b、i、u 分别表示加粗、斜体、下划线；br 换行；hr 分隔。',
          'ol 是有序列表，ul 是无序列表，li 是列表项。',
          'div 是块级容器，span 是行内容器，最常见考点是块级与行内的区别。',
          'details / summary 可实现原生折叠面板，无需 JavaScript。',
        ],
        mistakes: [
          'div 默认换行且独占一行，span 默认行内显示，不应混为一谈。',
          '有序列表强调顺序，无序列表强调集合，不是单纯换个圆点样式。',
        ],
        demos: [
          {
            type: 'html',
            title: '标题与段落',
            description: '修改 h1-h6 与 p 内容，观察层级差异。',
            initialLine: '<div><h1>BookYourHotel</h1><h2>Rating of the Hotels</h2><p><b>Bold</b>, <i>italic</i>, <u>underline</u></p></div>',
          },
          {
            type: 'html',
            title: '有序 / 无序列表',
            description: '改 li 项目，区分 sequence matters 与 group items。',
            initialLine: '<div><ol><li>Wake up</li><li>Brush teeth</li></ol><ul><li>Apples</li><li>Bananas</li></ul></div>',
            height: '170px',
          },
          {
            type: 'html',
            title: 'DIV 和 SPAN',
            description: '修改文字内容，观察 block 与 inline 的视觉区别。',
            initialLine: '<div style="background:#d9eaff;padding:10px;">This is a DIV block.</div>Just before <span style="background:#ffe7b3;padding:3px;">this SPAN</span> stays inline.',
            tips: ['div 常用于大块布局，span 常用于行内小片段修饰。'],
          },
          {
            type: 'html',
            title: 'details / summary',
            description: '修改 summary 标题和内部内容。',
            initialLine: '<details open><summary>Categories of Rooms</summary><p>Standard, deluxe, suite...</p></details>',
          },
        ],
      },
      {
        id: 'html-media',
        title: '图片、多媒体、meter、progress',
        intro: '本节对应 img、audio、video，以及 meter / progress 的含义和属性。',
        knowledge: [
          'img 常见格式是 GIF、JPEG/JPG、PNG，常用属性有 src、alt、width、height。',
          'audio 和 video 常用属性有 controls、autoplay、loop、muted，video 还有 poster。',
          'meter 表示已知区间内的标量值，如评分、占用率。',
          'progress 表示任务进度，如下载完成度。',
        ],
        mistakes: [
          'alt 是替代文本，不是标题说明。',
          'meter 和 progress 都像进度条，但语义不同。',
        ],
        demos: [
          {
            type: 'html',
            title: 'img 标签',
            description: '修改 alt、width、height，理解图片基础属性。',
            initialLine: '<img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22140%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23e6f4ff%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%231677ff%22 font-size=%2220%22%3EIMG%3C/text%3E%3C/svg%3E" alt="Deluxe Room" width="220" height="100">',
          },
          {
            type: 'html',
            title: 'audio / video 常见属性',
            description: '修改 controls、muted、loop、autoplay 等属性。',
            initialLine: '<div><audio controls muted></audio><br><video controls muted width="240" poster=""></video></div>',
            height: '200px',
          },
          {
            type: 'html',
            title: 'meter / progress',
            description: '改 value、min、max，体会语义差异。',
            initialLine: '<div><meter min="0" max="10" value="4"></meter> <progress max="100" value="12">12%</progress></div>',
          },
        ],
      },
      {
        id: 'html-semantic',
        title: '语义化标签与导航',
        intro: '本节覆盖 article、aside、header、footer、nav、figure、figcaption、a 以及 target。',
        knowledge: [
          'header 是页头或区块头部，nav 存放导航链接。',
          'article 表示独立内容块，aside 表示侧边补充内容。',
          'footer 表示页脚或区块尾部。',
          'figure + figcaption 用于图片或示意内容加说明。',
          'a 的 href 指向目标地址，target 控制打开位置，如 _blank 或指定 frame。',
        ],
        mistakes: [
          '语义化标签不是只为了样式，更重要的是结构意义、可访问性和 SEO。',
          'target=_blank 与 iframe 的 target=frameName 都属于“打开位置”控制，但语境不同。',
        ],
        demos: [
          {
            type: 'html',
            title: '语义化布局',
            description: '修改语义化区域内容。',
            initialLine: '<div><header>Header</header><nav>Nav</nav><article>Article</article><aside>Aside</aside><footer>Footer</footer></div>',
            previewStyles: 'header,nav,article,aside,footer{display:block;margin:6px 0;padding:8px 10px;border-radius:8px;background:#f5f7fa;}',
            height: '220px',
          },
          {
            type: 'html',
            title: 'figure / figcaption',
            description: '修改说明文字，理解图片语义容器。',
            initialLine: '<figure><img alt="room" src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%2290%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 rx=%2214%22 fill=%22%23d9f7be%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23389e0d%22%3ERoom%3C/text%3E%3C/svg%3E"><figcaption>Deluxe Room</figcaption></figure>',
          },
          {
            type: 'html',
            title: 'a + target',
            description: '改 href 和 target，观察链接跳转写法。',
            initialLine: '<a href="homepage.html" target="_blank">BookYourHotel</a>',
          },
        ],
      },
      {
        id: 'html-web-concepts',
        title: '静态页、动态页、编辑器、Internet 与 WWW',
        intro: '本节是 PDF 中偏理论的补充概念，用于理解网页类型和开发工具。',
        knowledge: [
          '静态网页内容固定，动态网页内容通常根据时间、数据或用户操作实时生成。',
          '文本编辑器如 Notepad、VS Code；可视化编辑器如 Dreamweaver。',
          'Internet 是互联网络整体，WWW 是互联网页面系统。',
        ],
        mistakes: [
          '静态页不等于“没有 CSS/JS”；动态页也不等于“必须后端渲染”。',
          'Internet 与 Web 不是同义词。',
        ],
        demos: [
          {
            type: 'html',
            title: '概念记忆卡',
            description: '这是一张概念回顾卡，用于课堂讲解时快速记忆。',
            initialLine: '<ul><li>Static page: fixed content</li><li>Dynamic page: real-time generated content</li><li>Internet != WWW</li></ul>',
            height: '170px',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-css',
    title: 'Chapter 2 CSS',
    children: [
      {
        id: 'css-intro',
        title: 'CSS 作用、语法、三种引入方式与优先级',
        intro: '本节覆盖 CSS 是什么、为什么需要 CSS、规则语法，以及 inline / internal / external 三种方式。',
        knowledge: [
          'CSS 用于控制 HTML 元素的外观、布局和表现。',
          '标准写法是 selector { property: value; }。',
          '三种写法：内联 style、内部 style、外部 css 文件。',
          '资料中的优先级口诀为：inline > internal > external > browser default。',
        ],
        mistakes: [
          '真实优先级不仅看引入方式，还要看选择器优先级和书写顺序。',
          'external 最适合多页面复用，不应因为“优先级低”就滥用 inline。',
        ],
        demos: [
          {
            type: 'html',
            title: '内联样式',
            description: '修改 style 内属性，理解 inline CSS。',
            initialLine: '<p style="font-size:24px;color:red;">Hotel booking from the comfort of your room.</p>',
          },
          {
            type: 'html',
            title: '内部样式表',
            description: '直接看 style 标签写法。',
            initialLine: '<style>p { color:red; font-size:20px; font-style:italic; }</style><p>Internal CSS demo</p>',
            height: '170px',
          },
          {
            type: 'html',
            title: '外部样式表',
            description: '记忆 link 引入 css 的标准格式。',
            initialLine: '<link rel="stylesheet" href="externalstyle.css">',
            wrapperBefore: '<pre>',
            wrapperAfter: '</pre>',
            height: '120px',
          },
        ],
      },
      {
        id: 'css-selectors-basic',
        title: 'ID、Class、元素、分组与上下文选择器',
        intro: '本节对应 CSS 选择器基础：#id、.class、元素、分组和上下文嵌套。',
        knowledge: [
          'ID 选择器用 #，适合选中唯一元素。',
          'Class 选择器用 .，适合复用样式。',
          '元素选择器直接写标签名，如 p、h1。',
          '分组选择器用逗号连接，如 h1, p。',
          '上下文选择器可写 div p、li a 等。',
        ],
        mistakes: [
          '不要把同一个 id 重复给多个元素。',
          'class 可以重复复用，id 应该唯一。',
        ],
        demos: [
          {
            type: 'css',
            title: 'ID 选择器',
            description: '改颜色和字重，观察 #id 生效范围。',
            initialRule: '#pname { color: green; font-weight: bold; }',
            html: '<div class="stage"><p id="pname">Welcome to BookYourHotel Website.</p><p>Other paragraph</p></div>',
          },
          {
            type: 'css',
            title: 'Class 选择器',
            description: '改字体大小和颜色，观察同类多元素复用。',
            initialRule: '.first { font-size: 20px; color: red; font-weight: bold; }',
            html: '<div class="stage"><h1 class="first">Welcome</h1><p class="first">This site gives info.</p><p>Normal text</p></div>',
          },
          {
            type: 'css',
            title: '分组选择器',
            description: '逗号可同时命中多个选择器。',
            initialRule: 'h1, p { color: red; }',
            html: '<div class="stage"><h1>Heading</h1><p>Paragraph</p><span>Span</span></div>',
          },
        ],
      },
      {
        id: 'css-selector-confusions',
        title: '后代、子代、相邻兄弟、通用兄弟对比',
        intro: '这是资料中最容易混淆的一组选择器，也是你刚刚特别点名要求强化的部分。',
        knowledge: [
          'div p：匹配 div 内所有后代 p。',
          'div > p：只匹配 div 的直接子元素 p。',
          'div + p：只匹配 div 后面紧挨着的第一个同级 p。',
          'div ~ p：匹配 div 后面所有同级 p。',
        ],
        mistakes: [
          'div + p 只会命中一个最近的相邻兄弟。',
          'div ~ p 虽然是“后面所有”，但前提是和 div 同级。',
        ],
        demos: [{ type: 'selectorComparison' }],
      },
      {
        id: 'css-properties',
        title: '字体、文本、列表、背景属性',
        intro: '本节对应 font-family、font-size、font-style、text-align、text-decoration、list-style、background 等。',
        knowledge: [
          '字体属性：font-family、font-size、font-style、font-weight、font-variant。',
          '文本属性：text-align、text-indent、line-height、color、text-decoration、text-transform、letter-spacing。',
          '列表属性：list-style-type、list-style-position、list-style-image。',
          '背景属性：background-color、background-image。',
        ],
        mistakes: [
          'text-decoration 控制下划线等装饰，不等于字体颜色或粗细。',
          'list-style-type 影响项目符号，和列表顺序语义不是同一层概念。',
        ],
        demos: [
          {
            type: 'css',
            title: '字体与文本',
            description: '修改字体、对齐、字母间距等属性。',
            initialRule: '.demo-box { font-family: Helvetica; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; }',
            html: '<div class="stage"><p class="demo-box">hotel booking demo</p></div>',
          },
          {
            type: 'css',
            title: '列表样式',
            description: '切换 disc、circle、square、decimal 等值。',
            initialRule: 'ul { list-style-type: square; list-style-position: inside; }',
            html: '<div class="stage"><ul><li>Deluxe rooms</li><li>Free breakfast</li><li>Sea view</li></ul></div>',
          },
          {
            type: 'css',
            title: '背景样式',
            description: '修改背景色或背景图。',
            initialRule: '.demo-box { background-color: lavender; color: #303133; }',
            html: '<div class="stage"><div class="demo-box">Background demo</div></div>',
          },
        ],
      },
      {
        id: 'css-layout',
        title: 'display、visibility、position、float、clear、伪类',
        intro: '本节覆盖资料中布局与显隐的高频考点。',
        knowledge: [
          'display: none 隐藏且不占位；display: block / inline 改变盒子显示方式。',
          'visibility: hidden 隐藏但占位。',
          'position 取值包括 static、relative、absolute、fixed，可结合 top/right/bottom/left/z-index。',
          'float 让元素左右浮动，clear 取消浮动影响。',
          '资料回顾还包含 :link、:visited、:hover、:active 四个链接状态。',
        ],
        mistakes: [
          'visibility 与 display 的占位差异是高频选择题。',
          'absolute 脱离文档流，relative 仍占原位置。',
          '伪类前面有冒号，类选择器前面是点号。',
        ],
        demos: [
          {
            type: 'css',
            title: 'display: none',
            description: '观察元素是否移出布局。',
            initialRule: '.demo-box { display: none; }',
            html: '<div class="stage"><div class="demo-box">Hidden</div><div class="anchor">后续元素位置变化</div></div>',
          },
          {
            type: 'css',
            title: 'visibility: hidden',
            description: '观察元素隐藏但保留位置。',
            initialRule: '.demo-box { visibility: hidden; }',
            html: '<div class="stage"><div class="demo-box">Invisible</div><div class="anchor">占位仍保留</div></div>',
          },
          {
            type: 'css',
            title: 'float / clear',
            description: '修改 float 和 clear 值，观察文字环绕。',
            initialRule: '.demo-box { float: left; width: 90px; } .anchor { clear: both; display:block; margin-top:10px; }',
            html: '<div class="stage"><div class="demo-box">image</div><div>Text floats around the box.</div><div class="anchor">clear: both starts below</div></div>',
            baseStyles: '.stage{min-height:150px;}',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-table',
    title: 'Chapter 3 Tables & Frames',
    children: [
      {
        id: 'table-structure',
        title: 'table / thead / tbody / tfoot / caption / th / td',
        intro: '本节覆盖表格的基本结构和头体脚分区。',
        knowledge: [
          'table 是表格容器，caption 是标题。',
          'thead / tbody / tfoot 用于划分头部、主体、尾部。',
          'tr 是行，th 是表头单元格，td 是普通数据单元格。',
        ],
        mistakes: ['th 默认表现通常加粗居中，td 是普通单元格。'],
        demos: [
          {
            type: 'html',
            title: '完整表格结构',
            description: '修改 caption 或单元格内容。',
            initialLine: '<table border="1"><caption>Test Results</caption><thead><tr><th>Name</th><th>Marks</th></tr></thead><tbody><tr><td>Joseph</td><td>98</td></tr></tbody><tfoot><tr><td colspan="2">Total: 1 student</td></tr></tfoot></table>',
            height: '220px',
          },
        ],
      },
      {
        id: 'table-merge',
        title: 'colspan 与 rowspan',
        intro: '本节是表格章节最容易出题的点：横向合并和纵向合并。',
        knowledge: [
          'colspan 横向跨列。',
          'rowspan 纵向跨行。',
        ],
        mistakes: ['colspan across columns，rowspan across rows，这是最经典的记忆方式。'],
        demos: [
          {
            type: 'html',
            title: 'colspan',
            description: '改 colspan 数值，观察横向合并效果。',
            initialLine: '<table border="1"><tr><td colspan="3">Top Three Performers</td></tr><tr><td>Name</td><td>Login</td><td>Marks</td></tr></table>',
            height: '180px',
          },
          {
            type: 'html',
            title: 'rowspan',
            description: '改 rowspan 数值，观察纵向合并效果。',
            initialLine: '<table border="1"><tr><td rowspan="3">Top Three</td><td>Joseph</td></tr><tr><td>Steve</td></tr><tr><td>John</td></tr></table>',
            height: '180px',
          },
        ],
      },
      {
        id: 'table-style',
        title: '表格样式属性',
        intro: '本节覆盖 border、border-collapse、padding、text-align、width、height、background-color。',
        knowledge: [
          'border 控制边框样式。',
          'border-collapse 控制边框是否合并。',
          'padding 控制单元格内边距。',
          'text-align 控制文本对齐。',
          'width / height 控制表格尺寸。',
        ],
        mistakes: ['border-collapse: collapse 是表格样式常见高频点。'],
        demos: [
          {
            type: 'css',
            title: '表格样式规则',
            description: '修改边框、背景、对齐方式。',
            initialRule: 'table { border-collapse: collapse; width: 100%; } th { background-color: #BDB76B; color: #006400; } th, td { border: 1px solid #008B8B; padding: 6px; text-align: center; }',
            html: '<table><tr><th>Name</th><th>Marks</th></tr><tr><td>Steve</td><td>92</td></tr></table>',
          },
        ],
      },
      {
        id: 'iframe',
        title: 'iframe、src、srcdoc、name、target、样式',
        intro: '本节对应现代 HTML 中用 iframe 展示多页面内容的方式。',
        knowledge: [
          'iframe 用于嵌入另一个网页或 HTML 片段。',
          'src 指向外部页面地址；srcdoc 直接写入内联 HTML。',
          'name 可与 a 标签的 target 组合，让链接在指定 frame 中打开。',
          '常见样式和属性包括 width、height、border、margin、padding。',
        ],
        mistakes: [
          'srcdoc 会覆盖 src 的显示结果。',
          'frameName target 与 _blank 都是 target，但前者针对指定 frame，后者新开窗口。',
        ],
        demos: [
          {
            type: 'html',
            title: 'iframe + srcdoc',
            description: '修改 srcdoc 中的 HTML 内容。',
            initialLine: '<iframe width="100%" height="120" name="ContentFrame" srcdoc="<h3>Learn MySQL</h3><p>Frame content here.</p>"></iframe>',
            height: '220px',
          },
          {
            type: 'html',
            title: 'iframe 样式',
            description: '记忆边框与尺寸写法。',
            initialLine: '<iframe style="border:5px solid black;margin-left:1px;padding:2px;" width="100%" height="100" srcdoc="<p>Styled frame</p>"></iframe>',
            height: '220px',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-form-js',
    title: 'Chapter 4 Forms & JS',
    children: [
      {
        id: 'form-attributes',
        title: 'form 基础属性',
        intro: '本节覆盖 form 标签的核心属性：name、id、action、method、autocomplete、novalidate、target。',
        knowledge: [
          'name 便于脚本中识别表单。',
          'id 便于 CSS 和 JavaScript 精确选中。',
          'action 指向提交地址，method 常见为 get 和 post。',
          'autocomplete 可控制浏览器自动填充，novalidate 可关闭浏览器原生校验。',
          'target 控制响应打开位置。',
        ],
        mistakes: [
          'GET 会把数据放在 URL 中，POST 放在请求体中。',
          'novalidate 一旦开启，required 等原生校验将失效。',
        ],
        demos: [
          {
            type: 'html',
            title: 'form 标准结构',
            description: '修改 action、method 等属性。',
            initialLine: '<form name="OrderFoodOnline" id="orderForm" method="post" action="process.html" autocomplete="on"><input type="text" placeholder="Name"><button>Submit</button></form>',
          },
        ],
      },
      {
        id: 'form-inputs',
        title: 'input 类型与属性',
        intro: '本节覆盖 text、password、email、tel、url、number、date、time、range、radio、checkbox、image，以及 placeholder、required、pattern、readonly 等属性。',
        knowledge: [
          '不同 type 会改变输入行为和浏览器校验能力。',
          'email 和 url 具备基础格式校验。',
          'number 可配合 min / max，range 可配合 min / max / step。',
          'radio 同名互斥，checkbox 可多选。',
          '常用属性包括 value、placeholder、required、autofocus、pattern、disabled、readonly、maxlength、size。',
        ],
        mistakes: [
          'radio 是否互斥取决于 name 是否相同。',
          'pattern 是正则校验，不是提示文字。',
        ],
        demos: [
          {
            type: 'html',
            title: '文本类 input',
            description: '切换 text、password、email、url、number。',
            initialLine: '<div><input type="text" placeholder="First name"> <input type="email" required placeholder="name@example.com"> <input type="number" min="0" max="50"></div>',
          },
          {
            type: 'html',
            title: 'radio / checkbox / range',
            description: '改 value、checked、min、max、step。',
            initialLine: '<div><input type="radio" name="food" value="veg" checked> Vegetarian <input type="radio" name="food" value="nonveg"> Non-vegetarian <br><input type="checkbox" value="Continental"> Continental <br><input type="range" min="10" max="50" step="5" value="10"></div>',
            height: '190px',
          },
          {
            type: 'html',
            title: 'pattern / required',
            description: '修改正则表达式和必填限制。',
            initialLine: '<form><input type="tel" pattern="^1[3-9]\\d{9}$" required placeholder="11位手机号"><button>Submit</button></form>',
          },
        ],
      },
      {
        id: 'form-select-group',
        title: 'select、option、optgroup、label、fieldset、legend',
        intro: '本节是表单分组和可访问性相关内容。',
        knowledge: [
          'select 可生成下拉列表或列表框。',
          'option 是选项，optgroup 可对选项分组。',
          'label 与输入框通过 for / id 关联，提高可访问性。',
          'fieldset 和 legend 用于一组表单字段的语义分组。',
        ],
        mistakes: [
          'size > 1 可让 select 变成列表框。',
          'multiple 配合 Ctrl/Command 才能多选。',
        ],
        demos: [
          {
            type: 'html',
            title: 'select / optgroup',
            description: '修改 option 和 optgroup 分组。',
            initialLine: '<select name="hotels" size="1" multiple><optgroup label="Italian"><option value="pasta">Pasta</option><option value="fish">Fish</option></optgroup><optgroup label="Chinese"><option value="chow">Chowmein</option></optgroup></select>',
            height: '180px',
          },
          {
            type: 'html',
            title: 'label / fieldset / legend',
            description: '理解点击 label 聚焦输入框、fieldset 语义分组。',
            initialLine: '<fieldset><legend>Food preferences</legend><label for="nameField">Name:</label><input id="nameField" type="text"></fieldset>',
          },
        ],
      },
      {
        id: 'form-other-elements',
        title: 'textarea、datalist、output、button、keygen',
        intro: '本节覆盖其他表单元素，其中 keygen 已被废弃，但资料里仍有提到。',
        knowledge: [
          'textarea 适合多行文本。',
          'datalist 为 input 提供候选建议。',
          'output 常用于显示计算结果。',
          'button 可以是 submit、reset 或普通按钮。',
          'keygen 属于已废弃标签，现代项目不建议使用。',
        ],
        mistakes: ['datalist 不是 select，它更像“输入建议列表”。'],
        demos: [
          {
            type: 'html',
            title: 'textarea / datalist',
            description: '修改建议项和默认文本。',
            initialLine: '<div><textarea rows="3" cols="16">Enter address</textarea><br><input list="states" placeholder="State"><datalist id="states"><option value="Alabama"><option value="California"></datalist></div>',
            height: '210px',
          },
          {
            type: 'html',
            title: 'output / button',
            description: '理解 output 计算结果和按钮类型。',
            initialLine: '<form oninput="res.value=parseInt(a.value||0)+parseInt(b.value||0)"><input type="number" id="a" value="1"> + <input type="number" id="b" value="2"> = <output name="res" for="a b">3</output> <button type="reset">Reset</button></form>',
            height: '180px',
          },
        ],
      },
      {
        id: 'js-basics',
        title: 'JavaScript 变量、运算符、函数',
        intro: '本节对应 JavaScript 基础语法部分。',
        knowledge: [
          '变量写法有 let、const、var，现代项目优先 let / const。',
          '运算符包括算术、赋值、比较、逻辑。',
          '函数可接收参数并返回值，参数和实参需区分。',
        ],
        mistakes: [
          'age = 25 这种未声明直接赋值的写法不推荐。',
          '== 与 === 在比较规则上不同，考试和面试都常问。',
        ],
        demos: [
          {
            type: 'js',
            title: '变量赋值',
            description: '修改这一行，观察 DOM 内容变化。',
            initialCode: "let message = 'Hello'; document.getElementById('box').textContent = message;",
            html: '<div id="box" class="box">Original</div>',
          },
          {
            type: 'js',
            title: '函数返回值',
            description: '改函数逻辑和参数，观察返回结果。',
            initialCode: "function sum(a, b){ return a + b } document.getElementById('box').textContent = 'sum(5,3) = ' + sum(5,3)",
            html: '<div id="box" class="box">Result</div>',
          },
        ],
      },
      {
        id: 'js-validation',
        title: 'getElementById、onsubmit、表单对象与常见事件',
        intro: '本节覆盖资料中的 form objects、getElementById、onsubmit 验证，以及 focus / blur / change 等事件。',
        knowledge: [
          '推荐给输入框设置 id，再用 document.getElementById() 访问。',
          '表单对象可通过 form.elements[name] 访问内部字段。',
          '常见方法与事件：submit / reset / click / focus / blur / onchange / onselect / onsubmit。',
        ],
        mistakes: [
          'getElementById 返回的是单个 DOM 节点，不是数组。',
          '阻止默认提交要用 event.preventDefault() 或 onsubmit 返回 false。',
        ],
        demos: [
          {
            type: 'js',
            title: 'getElementById',
            description: '改一行代码，直接读取 input 的 value。',
            initialCode: "document.getElementById('result').textContent = document.getElementById('username').value;",
            html: '<input id="username" value="RuoYi User"><div id="result" class="box">result</div>',
          },
          {
            type: 'js',
            title: 'onsubmit 自定义校验',
            description: '修改条件判断，观察阻止提交的逻辑。',
            initialCode: "document.getElementById('demoForm').onsubmit = function(e){ if(document.getElementById('fname').value === ''){ e.preventDefault(); document.getElementById('msg').textContent = 'Name must be filled out'; } };",
            html: '<form id="demoForm"><input id="fname" value=""><button>Submit</button></form><div id="msg" class="box">点击提交</div>',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-jquery',
    title: 'Chapter 5 jQuery',
    children: [
      {
        id: 'jquery-intro',
        title: 'jQuery 引入与 $(document).ready()',
        intro: '本节覆盖 jQuery 是什么、为什么使用，以及 ready 的意义。',
        knowledge: [
          'jQuery 是轻量级 JS 库，用于简化 DOM 操作、事件和动画。',
          '基本思想是 $(selector).action()。',
          '$(document).ready() 用于确保 DOM 加载完成后再执行代码。',
        ],
        mistakes: ['脚本顺序错误时，可能在 DOM 尚未生成就执行选择器，导致取不到元素。'],
        demos: [
          {
            type: 'jquery',
            title: 'document.ready 思想',
            description: '改一行代码，模拟加载完成后初始化文本。',
            initialCode: '$root.find(".jq-message").text("DOM is ready");',
            initialHtml: '<p class="jq-message">等待初始化...</p><div class="jq-box">jQuery Box</div>',
            tips: ['真实项目中通常包在 $(document).ready(function(){ ... }) 内。'],
          },
        ],
      },
      {
        id: 'jquery-selectors',
        title: '元素、ID、Class、属性、层级选择器',
        intro: '本节对应 jQuery 选择器部分。',
        knowledge: [
          '$("h1") 选元素，$("#header") 选 id，$(".product") 选 class。',
          '$("[src]") 与 $("[src=\'movie.jpg\']") 是属性选择器。',
          '$("#menu ul")、$("#menu li a") 属于层级选择。',
        ],
        mistakes: ['jQuery 选择器语法和 CSS 很像，但调用结果是 jQuery 对象。'],
        demos: [
          {
            type: 'jquery',
            title: 'class 选择器',
            description: '改成不同选择器，观察命中范围。',
            initialCode: '$root.find(".jq-box").css("background", "#52c41a");',
            initialHtml: '<div class="jq-box">Box A</div><div class="jq-box">Box B</div><p class="jq-message">Message</p>',
          },
          {
            type: 'jquery',
            title: '层级选择器',
            description: '模拟 $("#menu li a") 这种结构式选择。',
            initialCode: '$root.find("#menu li a").css("color", "#cf1322");',
            initialHtml: '<div id="menu"><ul><li><a href="#">Laptops</a></li><li><a href="#">Cameras</a></li></ul></div>',
          },
        ],
      },
      {
        id: 'jquery-content',
        title: 'html()、append()、prepend()、after()、remove()、empty()',
        intro: '本节对应内容操作方法。',
        knowledge: [
          'html() 设置或读取 HTML。',
          'append() 尾插，prepend() 头插，after() 插到目标后面。',
          'remove() 删除元素本身及其子元素，empty() 只删除子元素。',
        ],
        mistakes: ['remove 和 empty 容易混淆：一个删自己，一个保留自己删孩子。'],
        demos: [
          {
            type: 'jquery',
            title: 'append / prepend',
            description: '把这一行改成 prepend、append 或 after。',
            initialCode: '$root.find(".jq-message").append(" [append]");',
            initialHtml: '<p class="jq-message">Message</p><div class="jq-box">DOM Box</div>',
          },
          {
            type: 'jquery',
            title: 'remove / empty',
            description: '改写为 remove() 或 empty()，观察差异。',
            initialCode: '$root.find(".jq-box").empty();',
            initialHtml: '<div class="jq-box"><span>Child content</span></div>',
          },
        ],
      },
      {
        id: 'jquery-events-effects',
        title: '事件与效果：click、hide/show、toggle、slide、fade、animate',
        intro: '本节是 jQuery 最常用的事件与效果方法。',
        knowledge: [
          '事件方法包括 click、dblclick、mouseenter、mouseleave、keydown、submit、focus、blur。',
          '效果方法包括 hide、show、toggle、slideDown、slideUp、slideToggle、fadeIn、fadeOut、animate。',
          'animate({ params }, speed, callback) 可平滑改变 CSS 属性。',
        ],
        mistakes: [
          'slideToggle 是来回切换，不是固定只展开。',
          'animate 只能平滑处理可动画的 CSS 属性。',
        ],
        demos: [
          {
            type: 'jquery',
            title: 'slideToggle',
            description: '修改这行代码，观察显示与收起切换。',
            initialCode: '$root.find(".jq-box").slideToggle();',
            initialHtml: '<p class="jq-message">Click Run</p><div class="jq-box">Slide Panel</div>',
          },
          {
            type: 'jquery',
            title: 'fadeIn / fadeOut',
            description: '改成 fadeOut()、fadeToggle() 等。',
            initialCode: '$root.find(".jq-box").fadeToggle(300);',
            initialHtml: '<div class="jq-box">Fade Box</div>',
          },
          {
            type: 'jquery',
            title: 'animate()',
            description: '修改 left、opacity、width 等参数。',
            initialCode: '$root.find(".jq-box").animate({ left: "80px", opacity: 0.5, width: "220px" }, 400);',
            initialHtml: '<div class="jq-box">Animate Box</div>',
          },
        ],
      },
      {
        id: 'jquery-plugins',
        title: '实战菜单、Colorbox、Galleria 插件概念',
        intro: '本节覆盖 jQuery 菜单切换与两个图库插件概念。',
        knowledge: [
          '实战菜单通常会先隐藏子菜单，再通过 click + slideToggle 展开。',
          'Colorbox 是轻量级灯箱插件，常见写法是 $("a").colorbox()。',
          'rel="gallery" 可把多张图片归为一组，并支持上一张/下一张。',
          'slideshow: true 可启用播放模式。',
          'Galleria 更偏页面内缩略图库，Colorbox 更偏覆盖式灯箱。',
        ],
        mistakes: [
          'Colorbox 和 Galleria 都是插件，不是 jQuery 内建方法。',
          '想用插件必须先引入对应的 CSS 和 JS 文件。',
        ],
        demos: [
          {
            type: 'jquery',
            title: '菜单 slideToggle',
            description: '模拟资料里的菜单展开逻辑。',
            initialCode: '$root.find(".submenu").slideToggle("slow");',
            initialHtml: '<div id="menu"><p class="jq-message">Laptops</p><ul class="submenu" style="display:none;"><li>Gaming</li><li>Ultrabook</li></ul></div>',
          },
          {
            type: 'html',
            title: 'Colorbox 代码记忆',
            description: '这是插件初始化标准写法记忆卡。',
            initialLine: '<script>$(document).ready(function(){ $("a").colorbox({ transition:"fade", height:"250", width:"220" }); })</script>',
            wrapperBefore: '<pre>',
            wrapperAfter: '</pre>',
            height: '140px',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-bootstrap',
    title: 'Bootstrap 4.1.3',
    children: [
      {
        id: 'bs-intro',
        title: 'Bootstrap 介绍、移动优先、CDN 与依赖',
        intro: '本节覆盖 Bootstrap 的定位、移动优先思想、grid 与 JS 依赖。',
        knowledge: [
          'Bootstrap 是开源 CSS 框架，提供响应式栅格、UI 组件和 JS 插件。',
          '核心理念包括 mobile-first、12 栏栅格、组件丰富、可定制。',
          'Bootstrap JS 依赖 jQuery 与 Popper。',
          'meta viewport 是移动端适配关键标签。',
        ],
        mistakes: ['没有 viewport 时，响应式体验通常会失真。'],
        demos: [
          {
            type: 'html',
            title: 'CDN 引入模板',
            description: '记忆 viewport、bootstrap.css、jQuery、Popper、bootstrap.js 的引入顺序。',
            initialLine: '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"><script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>',
            height: '170px',
          },
        ],
      },
      {
        id: 'bs-grid',
        title: 'Grid 栅格：container、row、col、offset、order、breakpoints',
        intro: '本节是 Bootstrap 最核心的布局系统。',
        knowledge: [
          '.container 固定宽容器，.container-fluid 全宽容器。',
          '.row 是栅格行容器，.col-* 是列。',
          'breakpoints 包括 col-、col-sm-、col-md-、col-lg-、col-xl-。',
          'offset-* 控制偏移，order-* 控制视觉顺序，no-gutters 去掉间距。',
        ],
        mistakes: ['row 下面通常直接放列，列总和不应超过 12 栏概念。'],
        demos: [
          {
            type: 'html',
            title: 'row + col-md-4',
            description: '修改列类名，理解 12 栏布局。',
            initialLine: '<div class="row"><div class="col-md-4">col-md-4</div><div class="col-md-4">col-md-4</div><div class="col-md-4">col-md-4</div></div>',
            previewStyles: '.row{display:flex;gap:10px;}.col-md-4{flex:1;padding:12px;border-radius:8px;background:#409eff;color:#fff;text-align:center;}.col-md-6{flex:0 0 50%;padding:12px;border-radius:8px;background:#67c23a;color:#fff;text-align:center;}.offset-md-3{margin-left:25%;}',
            height: '160px',
          },
          {
            type: 'html',
            title: 'offset',
            description: '修改 offset 概念行，观察列偏移。',
            initialLine: '<div class="row"><div class="col-md-6 offset-md-3">Centered with offset</div></div>',
            previewStyles: '.row{display:flex;}.col-md-6{width:50%;padding:12px;border-radius:8px;background:#67c23a;color:#fff;text-align:center;}.offset-md-3{margin-left:25%;}',
            height: '140px',
          },
        ],
      },
      {
        id: 'bs-typography',
        title: 'Typography 与 Text Utilities',
        intro: '本节覆盖 display、lead、text-*、text-transform、font-weight 等。',
        knowledge: [
          '.display-1 到 .display-4 用于大标题。',
          '.lead 让段落更突出。',
          '.text-muted 与 text-primary/success/danger/warning 提供文字颜色。',
          '.text-uppercase / capitalize 与 .font-weight-bold / italic 属于常用工具类。',
        ],
        mistakes: ['工具类是现成类名，不是 CSS 属性本身。'],
        demos: [
          {
            type: 'html',
            title: 'display / lead / text-*',
            description: '修改类名，观察文字风格。',
            initialLine: '<div><h1 class="display-4">Display heading</h1><p class="lead">This paragraph uses .lead for emphasis.</p><p class="text-danger text-uppercase">danger uppercase alert</p></div>',
            previewStyles: '.display-4{font-size:2.4rem;font-weight:300;}.lead{font-size:1.2rem;color:#606266;}.text-danger{color:#f56c6c;}.text-uppercase{text-transform:uppercase;}',
            height: '220px',
          },
        ],
      },
      {
        id: 'bs-forms',
        title: 'Bootstrap 表单类',
        intro: '本节覆盖 form-control、form-group、form-check、form-inline、尺寸类。',
        knowledge: [
          '.form-control 样式化 input / select / textarea。',
          '.form-group 负责控件间距。',
          '.form-check / .form-check-input / .form-check-label 用于单选复选。',
          '.form-inline 适合横向紧凑型表单。',
        ],
        mistakes: ['Bootstrap 类只负责样式，不会自动替代原生表单语义和校验。'],
        demos: [
          {
            type: 'html',
            title: 'form-control / form-group',
            description: '修改 placeholder 或类名。',
            initialLine: '<div class="form-group"><label>Email</label><input type="email" class="form-control" placeholder="name@example.com"></div>',
            previewStyles: '.form-group{display:flex;flex-direction:column;gap:6px;}.form-control{width:100%;padding:10px 12px;border:1px solid #dcdfe6;border-radius:8px;}',
          },
          {
            type: 'html',
            title: 'form-check / form-inline',
            description: '改 checkbox 或 inline 布局内容。',
            initialLine: '<div><div class="form-check"><input class="form-check-input" type="checkbox"><label class="form-check-label">Remember me</label></div><form class="form-inline"><input class="form-control" placeholder="Username"><button class="btn btn-success">Login</button></form></div>',
            previewStyles: '.form-check{display:flex;gap:6px;align-items:center;}.form-inline{display:flex;gap:8px;margin-top:10px;}.form-control{padding:10px 12px;border:1px solid #dcdfe6;border-radius:8px;}.btn-success{background:#67c23a;color:#fff;border:none;padding:10px 14px;border-radius:8px;}',
            height: '210px',
          },
        ],
      },
      {
        id: 'bs-buttons-nav',
        title: '按钮、徽标、下拉、列表组、输入组、导航栏',
        intro: '本节合并多个常用 Bootstrap 组件类。',
        knowledge: [
          '按钮核心类有 btn、btn-primary、btn-secondary、btn-success、btn-danger、btn-outline-*、btn-lg、btn-sm、btn-block。',
          '按钮组使用 btn-group / btn-group-vertical。',
          '徽标使用 badge、badge-pill、badge-*。',
          '下拉相关类包括 dropdown、dropdown-toggle、dropdown-menu、dropdown-item、dropdown-divider。',
          '列表组使用 list-group / list-group-item；输入组使用 input-group / input-group-text。',
          '导航栏使用 navbar、navbar-brand、navbar-nav、nav-item、nav-link、navbar-toggler、collapse navbar-collapse。',
        ],
        mistakes: [
          'dropdown 这类交互组件需要 Bootstrap JS 与 Popper。',
          'badge 是小徽标，不是按钮。',
        ],
        demos: [
          {
            type: 'html',
            title: '按钮与 badge',
            description: '修改按钮类名和徽标数字。',
            initialLine: '<div><button class="btn btn-primary btn-sm">Primary</button> <button class="btn btn-outline-danger">Outline Danger</button> <span class="badge badge-warning">3</span></div>',
            previewStyles: '.btn{padding:8px 12px;border-radius:8px;border:1px solid transparent;background:#fff;margin-right:8px;}.btn-primary{background:#409eff;color:#fff;}.btn-outline-danger{border-color:#f56c6c;color:#f56c6c;}.btn-sm{padding:6px 10px;}.badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#e6a23c;color:#fff;}',
          },
          {
            type: 'html',
            title: 'list-group / input-group / navbar / breadcrumb',
            description: '理解多个导航组件的基础结构。',
            initialLine: '<div><ul class="list-group"><li class="list-group-item active">Inbox <span class="badge badge-light">12</span></li><li class="list-group-item">Sent</li></ul><div class="input-group"><span class="input-group-text">@</span><input class="form-control" placeholder="username"></div><nav class="navbar">MyApp | Home | Features</nav><ol class="breadcrumb"><li>Home</li><li>Bootstrap</li></ol></div>',
            previewStyles: '.list-group{border:1px solid #dcdfe6;border-radius:8px;overflow:hidden;}.list-group-item{padding:10px 12px;border-bottom:1px solid #ebeef5;display:flex;justify-content:space-between;}.list-group-item.active{background:#409eff;color:#fff;}.badge-light{background:#fff;color:#303133;}.input-group{display:flex;margin-top:10px;}.input-group-text,.form-control{padding:10px 12px;border:1px solid #dcdfe6;}.input-group-text{border-right:none;border-radius:8px 0 0 8px;background:#f5f7fa;}.form-control{border-radius:0 8px 8px 0;}.navbar{margin-top:10px;padding:12px;border-radius:8px;background:#303133;color:#fff;}.breadcrumb{margin-top:10px;padding:10px 14px;border-radius:8px;background:#fff;display:flex;gap:10px;}',
            height: '260px',
          },
        ],
      },
      {
        id: 'bs-icons-spacing',
        title: 'Font Awesome 图标与间距工具类',
        intro: '本节覆盖 Bootstrap 4 图标集成和 spacing utilities。',
        knowledge: [
          'Bootstrap 4 本身没有内建图标，常结合 Font Awesome。',
          '写法通常是 <i class="fas fa-home"></i>。',
          '间距工具类写法是 {property}{sides}-{size}，如 mt-3、px-4、mx-auto、p-3。',
          'd-flex、justify-content-center 也是常用布局工具类。',
        ],
        mistakes: ['m 是 margin，p 是 padding；x 表示左右，y 表示上下。'],
        demos: [
          {
            type: 'html',
            title: '图标与按钮',
            description: '记忆 Font Awesome 与 Bootstrap 按钮组合写法。',
            initialLine: '<button class="btn btn-primary"><i class="fas fa-save"></i> Save</button>',
            previewStyles: '.btn{padding:8px 12px;border-radius:8px;border:none;background:#409eff;color:#fff;}.fas{font-style:normal;margin-right:6px;}',
          },
          {
            type: 'html',
            title: '间距工具类',
            description: '修改 mt-3、p-4、mx-auto 等类名记忆写法。',
            initialLine: '<div class="bg-light p-4 mb-3">Large padding + margin bottom</div><div class="bg-warning p-2 mx-auto text-center" style="max-width:250px;">Centered block</div>',
            previewStyles: '.bg-light{background:#f5f7fa;}.bg-warning{background:#faad14;}.p-4{padding:24px;}.p-2{padding:8px;}.mb-3{margin-bottom:12px;}.mx-auto{margin-left:auto;margin-right:auto;}.text-center{text-align:center;}',
            height: '180px',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-vue-intro',
    title: 'Chapter 12 Vue 基础',
    children: [
      {
        id: 'vue-what',
        title: 'Vue 是什么与核心特性',
        intro: '本节覆盖 Vue 是渐进式框架，以及其特性：Virtual DOM、Data Binding、Components、Event Handling、Animation/Transition、Computed、Templates、Directives、Vue-CLI。',
        knowledge: [
          'Vue 是渐进式框架，易上手、轻量、适合 SPA，也容易集成到现有项目。',
          '核心特性包括虚拟 DOM、数据绑定、组件、事件处理、过渡动画、计算属性、模板、指令、CLI。',
          'Vue 聚焦视图层，但可以与其他库配合。',
        ],
        mistakes: ['Vue 不是只能做 SPA，但 SPA 是其经典应用场景之一。'],
        demos: [{ type: 'vueBinding' }],
      },
      {
        id: 'vue-directives',
        title: '常用指令：v-bind、v-on、v-model、v-for、v-if、v-show、v-once',
        intro: '本节对应 Vue 模板指令集合。',
        knowledge: [
          'v-bind 绑定属性，简写是 :。',
          'v-on 绑定事件，简写是 @。',
          'v-model 双向绑定表单。',
          'v-for 负责列表渲染；v-if / v-else / v-else-if 控制条件渲染；v-show 控制 display 显隐；v-once 只渲染一次。',
        ],
        mistakes: [
          'v-if 是“渲染不渲染”，v-show 是“显示不显示”。',
          'v-once 不会强制重渲染，反而会锁定首次渲染结果。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'directives',
            title: 'Vue 指令综合实验台',
            description: '把 v-bind、v-on、v-model、v-for、v-if、v-show、v-once 放到同一个真实示例里演示。',
          },
        ],
      },
      {
        id: 'vue-virtual-dom',
        title: 'DOM 与 Virtual DOM 工作流程',
        intro: '本节覆盖真实 DOM 与虚拟 DOM 的关系，以及初始渲染、数据变化、diff、patch、同步更新过程。',
        knowledge: [
          '真实 DOM 以树结构表示页面节点，节点多时更新成本高。',
          'Vue 会先生成虚拟 DOM，在数据变化时创建新的 VDOM 并与旧 VDOM diff。',
          '最终只把必要的 patch 应用到真实 DOM，从而减少更新成本。',
        ],
        mistakes: ['虚拟 DOM 不是完全不操作真实 DOM，而是减少不必要操作。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'virtual-dom',
            title: 'Virtual DOM 更新流程模拟',
            description: '通过旧树、新树、diff 和 patch 面板，演示数据变化后 Vue 如何最小化更新 DOM。',
          },
        ],
      },
      {
        id: 'vue-cli',
        title: '安装、CLI、Vite 替代方案',
        intro: '本节覆盖 Node、npm、Vue CLI、vue create、npm run serve，以及 Vite 的替代创建方式。',
        knowledge: [
          '先安装 Node.js，再验证 node -v 与 npm -v。',
          'Vue CLI 可通过 npm install -g @vue/cli 安装。',
          '常用命令包括 vue --version、vue create、npm run serve、npm run build。',
          'Vite 替代方式是 npm create vue@latest。',
        ],
        mistakes: ['Vue CLI 与 Vite 都能创建 Vue 项目，但默认构建链路不同。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'cli',
            title: 'Vue CLI 与 Vite 创建流程',
            description: '切换 Vue CLI 和 Vite 两种脚手架流程，查看完整命令与执行步骤。',
          },
        ],
      },
      {
        id: 'vue-structure',
        title: '项目结构与 .vue 单文件组件',
        intro: '本节覆盖 node_modules、public、src、components、router、store、views、App.vue、main.js、package.json，以及 SFC 结构。',
        knowledge: [
          'src 是主要源码目录，components 存复用组件，views 存页面级组件。',
          'App.vue 是根组件，main.js 是入口文件。',
          '.vue 文件通常包含 template、script、style scoped。',
        ],
        mistakes: ['scoped 只限制当前组件样式作用域，不影响全局样式文件。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'structure',
            title: 'Vue 项目结构与 SFC 拆解',
            description: '通过目录切换和 SFC 三段式面板，直观看到 main.js、App.vue 与单文件组件的职责。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-vue-components',
    title: 'Chapter 13 Vue 组件',
    children: [
      {
        id: 'vue-simple-component',
        title: '简单组件与复用',
        intro: '本节对应 BasicComponent 多次复用的演示。',
        knowledge: [
          '组件是独立可复用的 UI 单元。',
          '一个组件可以在父组件中多次复用，每个实例彼此独立。',
          'scoped 样式只作用于当前组件。',
        ],
        mistakes: ['组件复用不等于共享状态，状态是否共享取决于数据声明方式。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'simple-component',
            title: '简单组件复用演示',
            description: '同一个组件被父组件复用两次，分别维护自己的状态，展示组件复用的真正效果。',
          },
        ],
      },
      {
        id: 'vue-data-function',
        title: 'data 必须是函数',
        intro: '本节是组件章节的高频面试点：data() 返回全新对象，保证组件实例状态隔离。',
        knowledge: [
          '正确写法是 data() { return { count: 0 } }。',
          '错误写法是 data: { count: 0 }，会导致共享引用或触发警告。',
        ],
        mistakes: ['组件中的 data 和根实例的 data 在写法要求上不同，最容易混淆。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'data-function',
            title: 'data 必须是函数的实例对比',
            description: '通过共享状态和独立状态两组组件，直观看到错误写法与正确写法的差异。',
          },
        ],
      },
      {
        id: 'vue-local-registration',
        title: '局部注册',
        intro: '本节对应 SpecialButton 在 ParentBox 中局部注册的案例。',
        knowledge: [
          '局部注册通过 import 后写在 components 选项里。',
          '局部注册的组件只能在当前组件内部使用。',
          '好处是作用域清晰、避免全局命名污染。',
        ],
        mistakes: ['局部注册后的子组件不能直接在别的未注册组件里使用。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'local-registration',
            title: '局部注册真实组件演示',
            description: '展示 import + components 写法，并直接运行 ParentBox 内部的局部注册组件。',
          },
        ],
      },
      {
        id: 'vue-global-registration',
        title: '全局注册',
        intro: '本节对应在 main.js 中使用 app.component() 注册 GlobalAlert。',
        knowledge: [
          'Vue 3 使用 app.component(name, Component) 做全局注册。',
          '注册后无需在每个页面单独 import。',
          '适合高频基础组件，如全局消息、图标、基础按钮等。',
        ],
        mistakes: ['全局注册方便但会扩大作用域，不应把所有业务组件都全局化。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'global-registration',
            title: '全局注册真实组件演示',
            description: '展示 main.js 中 app.component() 的写法，并直接渲染全局组件。',
          },
        ],
      },
      {
        id: 'vue-dynamic-components',
        title: '动态组件 <component :is>',
        intro: '本节对应 tab 切换不同组件的案例。',
        knowledge: [
          '动态组件通过 <component :is="currentComponent"> 实现。',
          '适合标签页、步骤条、多视图切换，无需路由。',
          'is 可以绑定组件对象，也可以是已注册组件名。',
        ],
        mistakes: ['动态组件切换的是组件本身，不是简单切换一段字符串 HTML。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'dynamic-components',
            title: '动态组件切换演示',
            description: '通过标签页切换不同子组件，真正运行 `<component :is>` 的动态渲染逻辑。',
          },
        ],
      },
      {
        id: 'vue-component-events',
        title: '组件事件与鼠标交互',
        intro: '本节对应 @mouseover / @mouseout 的组件交互案例。',
        knowledge: [
          '组件同样可以处理原生 DOM 事件。',
          '@mouseover / @mouseout 常用于 hover 态切换。',
          '配合 data() 和 methods，可为每个组件实例维护独立状态。',
        ],
        mistakes: ['hover 状态属于每个实例自己的数据，不应做成所有卡片共用的全局变量。'],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'component-events',
            title: '组件事件与鼠标交互演示',
            description: '直接运行 `@mouseover / @mouseout` 事件逻辑，并观察不同组件实例状态互不干扰。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-vue-events',
    title: 'Chapter 14 VueJS Events',
    children: [
      {
        id: 'vue-event-click',
        title: '基础点击事件：v-on:click 与 @click',
        intro: '本节对应 Chapter 14 的 Basic Click Event，讲解 Vue 如何通过 v-on 或 @ 监听 DOM 事件并执行方法。',
        knowledge: [
          '事件用于响应用户操作，如点击、鼠标移动、键盘输入等。',
          'v-on:click 和 @click 是同一套事件监听语法，@ 是简写。',
          '常见事件包括 submit、keyup、drag、scroll、error、abort、mouseover、mouseout、load。',
        ],
        mistakes: [
          '不要把 `@click` 当成普通 HTML 属性，它会绑定到 Vue 的方法或表达式。',
          '事件处理函数可以接收原生 event 对象，但不要和业务参数混在一起写乱。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'event-click',
            title: '基础点击事件演示',
            description: '点击按钮后执行方法，更新 total，并记录最近一次触发的事件类型。',
          },
        ],
      },
      {
        id: 'vue-event-modifiers',
        title: '事件修饰符：.once 与 .prevent',
        intro: '本节覆盖第 14 章中的 `.once` 与 `.prevent`，演示“只执行一次”和“阻止默认行为”两种高频写法。',
        knowledge: [
          '事件修饰符写在事件名后面，形式是 `.once`、`.prevent`、`.stop`、`.capture`、`.self`、`.passive`。',
          '`.once` 让事件只执行一次，第一次触发后再次点击不再生效。',
          '`.prevent` 会自动调用 `event.preventDefault()`，常用于阻止链接跳转或表单提交。',
        ],
        mistakes: [
          '`.once` 不是“延迟执行一次”，而是“最多只允许触发一次”。',
          '`.prevent` 只阻止默认行为，不等于阻止事件冒泡；阻止冒泡要用 `.stop`。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'event-modifiers',
            title: '`.once` / `.prevent` 对比实验',
            description: '同一个区域同时对比 `.once` 与普通点击，以及 `.prevent` 和默认跳转的差异。',
          },
        ],
      },
      {
        id: 'vue-key-modifiers',
        title: '键盘修饰符：.enter 与组合键',
        intro: '本节对应 Key Modifiers，演示 Enter 和 Ctrl+Enter 这类按键组合在 Vue 中的写法。',
        knowledge: [
          'Vue 内建键盘修饰符包括 `.enter`、`.tab`、`.delete`、`.esc`、`.space`、`.up`、`.down`、`.left`、`.right`。',
          '你可以写 `@keyup.enter` 只监听 Enter，也可以写 `@keyup.ctrl.enter` 监听组合键。',
          '键盘修饰符非常适合表单输入、快捷键提交和输入框确认等场景。',
        ],
        mistakes: [
          '输入框里打字不会立刻触发 `@keyup.enter` 的业务更新，只有按下对应按键才执行方法。',
          '组合键修饰符要求多个条件同时满足，`Ctrl+Enter` 和单独 `Enter` 是两种不同触发条件。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'event-key',
            title: '键盘修饰符实时演示',
            description: '输入后按 Enter 或 Ctrl+Enter，观察两种事件触发条件和结果区域的不同。',
          },
        ],
      },
      {
        id: 'vue-custom-events',
        title: '自定义事件：子传父通信',
        intro: '本节对应 Custom Events，演示子组件如何通过 `$emit` 把数据发送给父组件。',
        knowledge: [
          '自定义事件是 Vue 中标准的子传父通信方式。',
          '子组件通过 `$emit("event-name", data)` 向上发送事件和数据。',
          '父组件通过 `@event-name="handlerMethod"` 监听并处理数据。',
        ],
        mistakes: [
          '子组件触发的是自定义事件，不是直接修改父组件数据。',
          '事件名如果写错，父组件就收不到 `$emit` 发出的值。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'event-custom',
            title: '自定义事件 `$emit` 演示',
            description: '点击子组件按钮后，把语言名发送给父组件，并在父组件区域显示结果。',
          },
        ],
      },
      {
        id: 'vue-mouse-events',
        title: '完整事件处理：鼠标事件',
        intro: '本节对应 Complete Event Handling，演示 `@mouseover` 与 `@mouseout` 如何驱动组件状态变化。',
        knowledge: [
          'Vue 可以监听任何 DOM 事件，包括 `mouseover`、`mouseout`、`mousemove` 等鼠标事件。',
          '鼠标事件常与响应式状态一起使用，用来切换文本、颜色、提示和悬停状态。',
          '多个组件实例的鼠标状态应该彼此独立，各自维护自己的数据。',
        ],
        mistakes: [
          '鼠标事件处理逻辑不要写成所有实例共享同一状态，否则多个卡片会互相影响。',
          '`@mouseover` 和 `@mouseout` 是成对出现的，通常一个负责进入状态，一个负责恢复状态。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'event-mouse',
            title: '鼠标事件完整交互演示',
            description: '把资料中的鼠标移入/移出案例做成真正可运行的多实例组件实验。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-vue-rendering',
    title: 'Chapter 15 Rendering, Transition & Animation',
    children: [
      {
        id: 'vue-render-vif',
        title: 'v-if 指令：条件渲染',
        intro: '本节对应 Chapter 15 的 `v-if Directive`，演示条件为 true 时渲染节点，条件为 false 时直接从 DOM 中删除。',
        knowledge: [
          'v-if 用于条件渲染，表达式为 true 才会生成对应元素。',
          '当表达式为 false、0、空字符串、null 等时，元素会从 DOM 中被移除。',
          'v-else 和 v-else-if 常与 v-if 配套使用，构成条件分支。',
        ],
        mistakes: [
          'v-if 是真正的“创建/销毁”，不是简单隐藏。',
          '别把 `v-if` 和 `v-show` 混为一谈，它们对 DOM 的影响完全不同。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'render-vif',
            title: 'v-if 条件渲染演示',
            description: '点击按钮切换 show，观察 h1 是否真正被移出页面结构。',
          },
        ],
      },
      {
        id: 'vue-render-vif-else',
        title: 'v-if 与 v-else：二选一切换',
        intro: '本节覆盖 `v-if` 与 `v-else` 的互斥渲染逻辑，展示前后两块内容如何进行切换。',
        knowledge: [
          'v-else 必须紧跟在 v-if 或 v-else-if 后面使用。',
          '当前面的条件为 false 时，v-else 对应的内容才会渲染。',
          '这种写法适合“登录/未登录”“有数据/无数据”这类二选一场景。',
        ],
        mistakes: [
          'v-else 中间不能插其他元素或文本节点，否则不会被识别为同一组条件分支。',
          'v-if / v-else 切换时显示的是不同节点，不是同一节点改文字。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'render-vif-else',
            title: 'v-if / v-else 切换演示',
            description: '点击按钮后在 h1 和 h2 两个互斥节点之间切换。',
          },
        ],
      },
      {
        id: 'vue-render-vshow',
        title: 'v-show 指令：CSS 显隐切换',
        intro: '本节对应 `v-show Directive`，重点演示它和 v-if 的差异：元素始终存在于 DOM 中，只是通过 CSS 控制显示。',
        knowledge: [
          'v-show 与 v-if 类似，但它不会删除节点，而是切换 `display: none`。',
          '当条件为 false 时，节点仍然存在于 DOM，只是不可见。',
          'v-show 适合频繁切换显隐的场景。',
        ],
        mistakes: [
          '不要说 v-show “没有渲染”，它其实已经渲染，只是隐藏了。',
          'v-show 无法像 v-if 那样减少初始渲染成本，因为节点一开始就会创建。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'render-vshow',
            title: 'v-show 显隐演示',
            description: '同一个实验里同时对比 v-if / v-else 和 v-show 的显示行为。',
          },
        ],
      },
      {
        id: 'vue-render-vfor',
        title: 'v-for 指令：列表渲染',
        intro: '本节对应 `v-for Directive`，通过输入水果名并按 Enter 的方式，把数据追加到数组并实时渲染列表。',
        knowledge: [
          'v-for 根据数组或对象渲染列表，常见写法是 `item in items`。',
          'Vue 3 中列表渲染必须尽量提供稳定的 `:key`。',
          '数组变化后，Vue 会自动更新对应的 DOM 列表。',
        ],
        mistakes: [
          '不要忽略 `:key`，否则 Vue 更新列表时可能出现复用错误。',
          '向数组 push 新值后不需要手动刷新页面，响应式系统会自动更新。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'render-vfor',
            title: 'v-for 列表渲染演示',
            description: '输入水果名后按 Enter，动态把新元素渲染到列表中。',
          },
        ],
      },
      {
        id: 'vue-transition-fade',
        title: 'Fade Transition：淡入淡出过渡',
        intro: '本节对应 `Fade Transition`，使用 `<transition>` 和 CSS opacity 过渡实现文本淡入淡出。',
        knowledge: [
          'Vue 提供 `<transition>` 组件来包装进入和离开时需要过渡的元素。',
          'name 属性决定过渡类名前缀，例如 `fade-enter-active`、`fade-leave-active`。',
          'Fade 过渡通常基于 opacity 从 0 到 1 的变化实现。',
        ],
        mistakes: [
          '过渡效果不是自动出现的，必须配合对应的 CSS 过渡类。',
          '如果只写 `<transition>` 不写样式，视觉上不会看到明显动画。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'transition-fade',
            title: 'Fade Transition 演示',
            description: '点击按钮后，让文本以 3 秒透明度过渡方式淡入淡出。',
          },
        ],
      },
      {
        id: 'vue-transition-shiftx',
        title: 'ShiftX Transition：X 轴位移过渡',
        intro: '本节对应 `ShiftX Transition`，演示元素在进入和离开时沿 X 轴平移并伴随透明度变化。',
        knowledge: [
          '过渡不仅可以控制透明度，也可以控制 `transform` 等 CSS 属性。',
          'X 轴位移通常通过 `translateX(...)` 实现。',
          '进入和离开阶段都可以复用同一组过渡规则。',
        ],
        mistakes: [
          '位移动画的视觉关键是 `transform`，不是直接改 `left`。',
          '只改位移不配合透明度时，动画层次感通常不如同时处理 opacity。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'transition-shiftx',
            title: 'ShiftX Transition 演示',
            description: '点击按钮后，图片沿 X 轴移动 100px 并同步淡入淡出。',
          },
        ],
      },
      {
        id: 'vue-animation-rotate',
        title: 'Rotate Animation：关键帧旋转动画',
        intro: '本节对应 `Rotate Animation`，通过 `@keyframes` 实现 3D 旋转动画，并在离开时反向播放。',
        knowledge: [
          'Vue 过渡可以结合 CSS `@keyframes` 实现更复杂的多阶段动画。',
          '关键帧动画可以定义 0%、25%、50%、75%、100% 等多个状态。',
          '离开动画可以通过反向播放同一套动画形成回退效果。',
        ],
        mistakes: [
          '关键帧动画和普通 transition 不同，它是分阶段定义，不只是起点和终点。',
          '如果离开阶段不单独处理，进入和离开可能都会播放同一方向动画。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'animation-rotate',
            title: 'Rotate Animation 演示',
            description: '点击按钮后，让图片进行 3D 旋转，离开时反向恢复。',
          },
        ],
      },
      {
        id: 'vue-transition-custom',
        title: 'Custom Transition Classes：自定义过渡类',
        intro: '本节对应 `Custom Transition Classes`，演示如何通过 `enter-active-class` 和 `leave-active-class` 接入自定义动画类。',
        knowledge: [
          'Vue 支持通过 `enter-class`、`enter-active-class`、`leave-active-class` 等属性自定义过渡类名。',
          '这种方式适合接入外部动画库，如 Animate.css。',
          '使用自定义类后，不一定需要自己手写完整的过渡类前缀样式。',
        ],
        mistakes: [
          '自定义过渡类不是只写一个类名就够了，进入和离开通常要分别配置。',
          '接第三方动画库时，也要确认类名是否真的存在，否则不会有效果。',
        ],
        demos: [
          {
            type: 'vueAdvanced',
            mode: 'transition-custom',
            title: '自定义过渡类演示',
            description: '模拟 Animate.css 风格的 swing 和 bounceOut 过渡类，展示不写传统 fade 类也能做动画。',
          },
        ],
      },
    ],
  },
]

export const flattenTopics = (tree) =>
  tree.flatMap((chapter) =>
    chapter.children.map((topic) => ({
      ...topic,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
    })),
  )

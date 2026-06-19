const html = (title, initialLine, options = {}) => ({
  type: 'html',
  title,
  initialLine,
  description: options.description ?? '对应当前小点的最小实例，可直接修改观察变化。',
  height: options.height,
  wrapperBefore: options.wrapperBefore,
  wrapperAfter: options.wrapperAfter,
  previewStyles: options.previewStyles,
  tips: options.tips ?? [],
})

const css = (title, initialRule, htmlCode, options = {}) => ({
  type: 'css',
  title,
  initialRule,
  html: htmlCode,
  description: options.description ?? '修改这一条 CSS 规则，观察对应小点的视觉变化。',
  baseStyles: options.baseStyles,
  tips: options.tips ?? [],
})

const js = (title, initialCode, htmlCode, options = {}) => ({
  type: 'js',
  title,
  initialCode,
  html: htmlCode,
  description: options.description ?? '修改这一行 JavaScript，观察这个知识点的运行结果。',
  tips: options.tips ?? [],
})

const jquery = (title, initialCode, initialHtml, options = {}) => ({
  type: 'jquery',
  title,
  initialCode,
  initialHtml,
  description: options.description ?? '运行或改写这一行 jQuery，观察该方法的作用。',
  tips: options.tips ?? [],
})

const treeLink = '<a href="#rooms">Jump to rooms</a><div style="height:8px"></div><section id="rooms" style="padding:10px;border-radius:8px;background:#f5f7fa;">Rooms section</section>'

export const knowledgeExampleMap = {
  'html-structure': [
    html('DOCTYPE 放第一行', '<!DOCTYPE html><html><body><p>HTML5 document</p></body></html>', { height: '150px' }),
    html('head 与 body 分工', '<html><head><title>Hotel Demo</title></head><body><h2>Visible Body Content</h2></body></html>', { height: '160px' }),
    html('成对标签闭合', '<p>This paragraph uses an opening tag and a closing tag.</p>'),
    html('空标签示例', '<div>Line 1<br>Line 2<hr><img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2240%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%239ad0ff%22/%3E%3C/svg%3E" alt="small image"></div>'),
  ],
  'html-head': [
    html('title 标签', '<title>Book Your Hotel</title>', { wrapperBefore: '<pre>', wrapperAfter: '</pre>', height: '120px' }),
    html('meta 描述', '<meta name="description" content="Hotel booking website demo">', { height: '130px' }),
    html('link 样式表', '<link rel="stylesheet" href="site.css">', { height: '140px' }),
    html('script 外链', '<script src="app.js" defer></script>', { height: '140px' }),
    html('base 基准路径', '<base href="https://example.com/assets/">', { height: '150px' }),
    html('noscript 降级提示', '<noscript><div style="padding:10px;border-radius:8px;background:#fff1f0;">Please enable JavaScript.</div></noscript>'),
  ],
  'html-body-text': [
    html('标题与段落', '<div><h1>Main Title</h1><h3>Sub Title</h3><p>Paragraph text here.</p></div>'),
    html('行内格式化与分隔', '<p><b>Bold</b> <i>Italic</i> <u>Underline</u><br>Next line<hr>After hr</p>'),
    html('有序与无序列表', '<div><ol><li>Step 1</li><li>Step 2</li></ol><ul><li>Apple</li><li>Banana</li></ul></div>', { height: '180px' }),
    html('div 与 span', '<div style="background:#d9ecff;padding:8px;">Block div</div><span style="background:#fff1b8;padding:4px;">Inline span</span> follows text.'),
    html('details / summary', '<details open><summary>Open details</summary><p>Hidden content can be expanded.</p></details>'),
  ],
  'html-media': [
    html('img 图片属性', '<img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%2280%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23e6f4ff%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%231677ff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3Eroom.jpg%3C/text%3E%3C/svg%3E" alt="Deluxe room" width="220" height="80">'),
    html('audio / video', '<div><audio controls muted></audio><br><video controls muted width="220" poster=""></video></div>', { height: '190px' }),
    html('meter 标量值', '<meter min="0" max="100" value="78">78%</meter>'),
    html('progress 进度', '<progress value="45" max="100">45%</progress>'),
  ],
  'html-semantic': [
    html('header + nav', '<header style="padding:8px;background:#f5f7fa;border-radius:8px;">Header</header><nav style="margin-top:8px;padding:8px;background:#e6f4ff;border-radius:8px;">Home | Rooms | Contact</nav>'),
    html('article + aside', '<div><article style="padding:10px;background:#f6ffed;border-radius:8px;">Independent article</article><aside style="margin-top:8px;padding:10px;background:#fff7e6;border-radius:8px;">Side note</aside></div>'),
    html('footer 页脚', '<footer style="padding:10px;background:#f5f7fa;border-radius:8px;">Copyright 2026</footer>'),
    html('figure / figcaption', '<figure><img alt="room" src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%2270%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23d9f7be%22/%3E%3C/svg%3E"><figcaption>Room preview</figcaption></figure>'),
    html('a + target', '<a href="https://example.com" target="_blank">Open in new tab</a>'),
  ],
  'html-web-concepts': [
    html('静态页', '<div style="padding:12px;border-radius:10px;background:#f5f7fa;"><h3>Static Page</h3><p>Content stays fixed until the file is edited.</p></div>'),
    html('动态页', '<div style="padding:12px;border-radius:10px;background:#e6f4ff;"><h3>Dynamic Page</h3><p>Current time: <strong>12:30</strong></p><p>Content can change with data or user action.</p></div>'),
    html('Internet 与 WWW', '<div style="display:flex;gap:10px;"><div style="flex:1;padding:12px;border-radius:10px;background:#fff7e6;">Internet = network infrastructure</div><div style="flex:1;padding:12px;border-radius:10px;background:#f6ffed;">WWW = web pages & hyperlinks</div></div>', { height: '170px' }),
  ],
  'css-intro': [
    html('inline CSS', '<p style="color:#f56c6c;font-size:22px;">Inline style on element</p>'),
    css('CSS 规则语法', '.demo-box { color: #1677ff; font-size: 22px; }', '<div class="stage"><p class="demo-box">selector { property: value; }</p></div>'),
    html('内部样式表', '<style>.note{color:#722ed1;font-style:italic;}</style><p class="note">Internal style tag</p>', { height: '160px' }),
    html('外部样式表', '<link rel="stylesheet" href="externalstyle.css">', { height: '140px' }),
  ],
  'css-selectors-basic': [
    css('ID 选择器', '#banner { color: #52c41a; font-weight: bold; }', '<div class="stage"><p id="banner">Unique banner</p><p>Other text</p></div>'),
    css('Class 选择器', '.room { color: #f56c6c; font-size: 20px; }', '<div class="stage"><p class="room">Room A</p><p class="room">Room B</p></div>'),
    css('元素选择器', 'p { color: #1677ff; }', '<div class="stage"><p>Paragraph A</p><span>Span stays unchanged</span></div>'),
    css('分组选择器', 'h2, p { color: #722ed1; }', '<div class="stage"><h2>Heading</h2><p>Paragraph</p><div>Div</div></div>'),
    css('上下文选择器', 'div p { color: #fa8c16; }', '<div class="stage"><div><p>Inside div</p></div><p>Outside div</p></div>'),
  ],
  'css-selector-confusions': [
    css('div p', 'div p { color: #1677ff; font-weight: bold; }', '<div class="stage"><div><p>child p</p><section><p>descendant p</p></section></div><p>outside</p></div>'),
    css('div > p', 'div > p { color: #52c41a; font-weight: bold; }', '<div class="stage"><div><p>direct child</p><section><p>nested child</p></section></div></div>'),
    css('div + p', 'div + p { color: #f5222d; font-weight: bold; }', '<div class="stage"><div>DIV</div><p>adjacent p</p><p>second p</p></div>'),
    css('div ~ p', 'div ~ p { color: #722ed1; font-weight: bold; }', '<div class="stage"><div>DIV</div><p>first sibling p</p><p>second sibling p</p></div>'),
  ],
  'css-properties': [
    css('字体属性', '.demo-box { font-family: Georgia; font-size: 24px; font-style: italic; font-weight: 700; }', '<div class="stage"><p class="demo-box">Font demo</p></div>'),
    css('文本属性', '.demo-box { text-align: center; color: #f56c6c; text-decoration: underline; text-transform: uppercase; letter-spacing: 2px; }', '<div class="stage"><p class="demo-box">hotel booking</p></div>'),
    css('列表属性', 'ul { list-style-type: circle; list-style-position: inside; }', '<div class="stage"><ul><li>Breakfast</li><li>Pool</li></ul></div>'),
    css('背景属性', '.demo-box { background-color: #fff1b8; background-image: linear-gradient(90deg, #fff1b8, #ffd6e7); }', '<div class="stage"><div class="demo-box">Background demo</div></div>'),
  ],
  'css-layout': [
    css('display 控制显示方式', '.demo-box { display: inline-block; }', '<div class="stage"><div class="demo-box">Box A</div><div class="demo-box">Box B</div></div>'),
    css('visibility 占位隐藏', '.demo-box { visibility: hidden; }', '<div class="stage"><div class="demo-box">Hidden</div><div class="anchor">Still keeps space</div></div>'),
    css('position 定位', '.demo-box { position: absolute; top: 10px; right: 10px; } .stage { min-height: 120px; }', '<div class="stage"><div class="demo-box">ABS</div><div class="anchor">Reference area</div></div>'),
    css('float + clear', '.demo-box { float: left; width: 80px; } .anchor { clear: both; display:block; }', '<div class="stage"><div class="demo-box">IMG</div><p>Text wraps around floated box.</p><div class="anchor">Clear both</div></div>'),
    html('链接伪类思路', '<a href="#" style="color:#1677ff;text-decoration:none;">:link / :visited / :hover / :active 通常写在 CSS 里控制状态</a>'),
  ],
  'table-structure': [
    html('table 容器与 caption', '<table border="1"><caption>Student Scores</caption><tr><td>Cell</td></tr></table>', { height: '180px' }),
    html('thead / tbody / tfoot', '<table border="1"><thead><tr><th>Head</th></tr></thead><tbody><tr><td>Body</td></tr></tbody><tfoot><tr><td>Foot</td></tr></tfoot></table>', { height: '200px' }),
    html('tr / th / td', '<table border="1"><tr><th>Name</th><th>Score</th></tr><tr><td>Tom</td><td>98</td></tr></table>', { height: '180px' }),
  ],
  'table-merge': [
    html('colspan 横向跨列', '<table border="1"><tr><td colspan="2">Across two columns</td></tr><tr><td>A</td><td>B</td></tr></table>', { height: '170px' }),
    html('rowspan 纵向跨行', '<table border="1"><tr><td rowspan="2">Across two rows</td><td>A</td></tr><tr><td>B</td></tr></table>', { height: '170px' }),
  ],
  'table-style': [
    css('border 边框', 'table, th, td { border: 2px solid #1677ff; }', '<table><tr><th>Name</th><td>Tom</td></tr></table>'),
    css('border-collapse', 'table { border-collapse: collapse; } table, th, td { border: 1px solid #303133; }', '<table><tr><th>Name</th><td>Tom</td></tr></table>'),
    css('padding 内边距', 'th, td { padding: 12px; border: 1px solid #303133; }', '<table><tr><th>Name</th><td>Tom</td></tr></table>'),
    css('text-align 对齐', 'th, td { text-align: center; border: 1px solid #303133; }', '<table><tr><th>Name</th><td>Tom</td></tr></table>'),
    css('width / height', 'table { width: 100%; } td { height: 56px; border: 1px solid #303133; }', '<table><tr><td>Resizable cell</td></tr></table>'),
  ],
  iframe: [
    html('iframe 标签', '<iframe width="100%" height="110" srcdoc="<h3>Embedded page</h3><p>Inside iframe</p>"></iframe>', { height: '210px' }),
    html('src 与 srcdoc', '<iframe width="100%" height="110" srcdoc="<p>srcdoc directly writes HTML.</p>"></iframe>', { height: '210px' }),
    html('name + target', '<iframe name="roomFrame" width="100%" height="90" srcdoc="<p>Frame target area</p>"></iframe><div style="margin-top:8px;"><a href="data:text/html,&lt;h2&gt;Loaded in frame&lt;/h2&gt;" target="roomFrame">Open in named frame</a></div>', { height: '230px' }),
    html('iframe 样式属性', '<iframe style="border:4px solid #303133;padding:4px;" width="100%" height="90" srcdoc="<p>Styled frame</p>"></iframe>', { height: '210px' }),
  ],
  'form-attributes': [
    html('form name', '<form name="orderForm"><input placeholder="Name"><button>Submit</button></form>'),
    html('form id', '<form id="bookingForm"><input placeholder="Room"><button>Submit</button></form>'),
    html('action + method', '<form action="/submit" method="post"><input name="email" placeholder="Email"><button>Submit</button></form>'),
    html('autocomplete / novalidate', '<form autocomplete="on" novalidate><input type="email" required placeholder="name@example.com"><button>Submit</button></form>'),
    html('target 打开位置', '<form action="about:blank" target="_blank"><input placeholder="Open result in new tab"><button>Submit</button></form>'),
  ],
  'form-inputs': [
    html('不同 type', '<div><input type="text" placeholder="text"> <input type="email" placeholder="email"></div>'),
    html('email / url 校验', '<form><input type="email" required placeholder="name@example.com"> <input type="url" placeholder="https://site.com"></form>'),
    html('number / range', '<div><input type="number" min="1" max="10" value="3"> <input type="range" min="0" max="100" step="10" value="40"></div>'),
    html('radio / checkbox', '<div><input type="radio" name="meal" checked> Veg <input type="radio" name="meal"> Non-veg <br><input type="checkbox"> Breakfast</div>', { height: '170px' }),
    html('常见属性', '<input type="text" value="RuoYi" placeholder="Your name" required readonly maxlength="8" size="18">'),
  ],
  'form-select-group': [
    html('select 下拉', '<select><option>Standard</option><option>Deluxe</option></select>'),
    html('option / optgroup', '<select><optgroup label="Chinese"><option>Fried Rice</option></optgroup><optgroup label="Italian"><option>Pasta</option></optgroup></select>', { height: '170px' }),
    html('label 关联输入框', '<label for="emailField">Email:</label><input id="emailField" type="email">'),
    html('fieldset / legend', '<fieldset><legend>Guest Info</legend><input placeholder="Name"></fieldset>'),
  ],
  'form-other-elements': [
    html('textarea 多行文本', '<textarea rows="3" cols="22">Write your address</textarea>'),
    html('datalist 输入建议', '<input list="cityList" placeholder="City"><datalist id="cityList"><option value="Beijing"><option value="Shanghai"></datalist>'),
    html('output 计算结果', '<form oninput="res.value=parseInt(a.value||0)+parseInt(b.value||0)"><input id="a" type="number" value="1"> + <input id="b" type="number" value="2"> = <output name="res" for="a b">3</output></form>', { height: '170px' }),
    html('button 类型', '<div><button type="button">Button</button> <button type="submit">Submit</button> <button type="reset">Reset</button></div>'),
    html('keygen 已废弃', '<div style="padding:12px;border-radius:10px;background:#fff1f0;">&lt;keygen&gt; is obsolete and should not be used in modern projects.</div>', { height: '120px' }),
  ],
  'js-basics': [
    js('let / const / var', "let total = 5; document.getElementById('box').textContent = 'total = ' + total;", '<div id="box" class="box">value</div>'),
    js('运算符', "document.getElementById('box').textContent = '3 + 2 * 4 = ' + (3 + 2 * 4);", '<div id="box" class="box">result</div>'),
    js('函数返回值', "function greet(name){ return 'Hello ' + name } document.getElementById('box').textContent = greet('RuoYi');", '<div id="box" class="box">result</div>'),
  ],
  'js-validation': [
    js('getElementById', "document.getElementById('result').textContent = document.getElementById('username').value;", '<input id="username" value="Alice"><div id="result" class="box">result</div>'),
    js('form.elements 访问字段', "const form = document.getElementById('demoForm'); document.getElementById('msg').textContent = form.elements['fname'].value;", '<form id="demoForm"><input name="fname" value="Tom"></form><div id="msg" class="box">msg</div>'),
    js('onsubmit + preventDefault', "document.getElementById('demoForm').onsubmit=function(e){e.preventDefault();document.getElementById('msg').textContent='submit prevented'};", '<form id="demoForm"><input><button>Submit</button></form><div id="msg" class="box">wait</div>'),
  ],
  'jquery-intro': [
    html('jQuery 是 JS 库', '<div style="padding:12px;border-radius:10px;background:#e6f4ff;">$("selector").action() simplifies DOM operations.</div>'),
    jquery('$(selector).action()', '$root.find(".jq-box").text("Selected and changed");', '<div class="jq-box">Original text</div>'),
    jquery('document.ready 思想', '$root.find(".jq-message").text("DOM ready then run");', '<p class="jq-message">Waiting...</p>'),
  ],
  'jquery-selectors': [
    jquery('元素 / id / class', '$root.find(".product").css("color", "#1677ff");', '<h3 id="header">Header</h3><p class="product">Camera</p><p class="product">Laptop</p>'),
    jquery('属性选择器', '$root.find("[src]").css("border", "2px solid #52c41a");', '<img src="demo.png" alt="demo"><img alt="no src">'),
    jquery('层级选择器', '$root.find("#menu li a").css("color", "#f5222d");', '<div id="menu"><ul><li><a href="#">Home</a></li><li><a href="#">Rooms</a></li></ul></div>'),
  ],
  'jquery-content': [
    jquery('html()', '$root.find(".jq-box").html("<strong>New HTML</strong>");', '<div class="jq-box">Old text</div>'),
    jquery('append / prepend / after', '$root.find(".jq-message").prepend("[prepend] ");', '<p class="jq-message">Message</p><div class="jq-box">Box</div>'),
    jquery('remove / empty', '$root.find(".jq-box").empty();', '<div class="jq-box"><span>Child content</span></div>'),
  ],
  'jquery-events-effects': [
    jquery('click / hover 等事件思想', '$root.find(".jq-message").text("Bind click, dblclick, mouseenter, blur...");', '<p class="jq-message">Event methods summary</p>'),
    jquery('hide/show/toggle/slide/fade', '$root.find(".jq-box").slideToggle();', '<div class="jq-box">Effect box</div>'),
    jquery('animate()', '$root.find(".jq-box").animate({ left: "60px", opacity: 0.4 }, 300);', '<div class="jq-box">Animate me</div>'),
  ],
  'jquery-plugins': [
    jquery('菜单 slideToggle', '$root.find(".submenu").slideToggle("slow");', '<div><button class="jq-message">Menu</button><ul class="submenu" style="display:none;"><li>Item 1</li><li>Item 2</li></ul></div>'),
    html('Colorbox 初始化', '<script>$(document).ready(function(){ $("a").colorbox(); })</script>', { height: '140px' }),
    html('rel="gallery" 分组', '<a href="img1.jpg" rel="gallery">Image 1</a> <a href="img2.jpg" rel="gallery">Image 2</a>'),
    html('slideshow: true', '<script>$("a").colorbox({ rel:"gallery", slideshow:true })</script>', { height: '140px' }),
    html('Galleria 与 Colorbox 区别', '<div style="display:flex;gap:10px;"><div style="flex:1;padding:10px;background:#f5f7fa;border-radius:8px;">Galleria = in-page gallery</div><div style="flex:1;padding:10px;background:#fff7e6;border-radius:8px;">Colorbox = lightbox overlay</div></div>', { height: '160px' }),
  ],
  'bs-intro': [
    html('Bootstrap 是响应式框架', '<div class="row"><div class="col-md-6">Responsive column</div><div class="col-md-6">Responsive column</div></div>', { previewStyles: '.row{display:flex;gap:8px;}.col-md-6{flex:1;padding:12px;background:#1677ff;color:#fff;border-radius:8px;}', height: '150px' }),
    html('mobile-first', '<meta name="viewport" content="width=device-width, initial-scale=1">', { height: '140px' }),
    html('JS 依赖 jQuery 与 Popper', '<script src="jquery.js"></script><script src="popper.js"></script><script src="bootstrap.js"></script>', { height: '150px' }),
    html('viewport 关键标签', '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">', { height: '140px' }),
  ],
  'bs-grid': [
    html('.container / .container-fluid', '<div class="container">Fixed container</div><div class="container-fluid">Fluid container</div>', { previewStyles: '.container,.container-fluid{padding:10px;border-radius:8px;margin:6px 0;background:#f5f7fa;}.container{max-width:280px;}.container-fluid{width:100%;}', height: '160px' }),
    html('.row + .col-*', '<div class="row"><div class="col-md-4">4</div><div class="col-md-4">4</div><div class="col-md-4">4</div></div>', { previewStyles: '.row{display:flex;gap:8px;}.col-md-4{flex:1;padding:12px;background:#409eff;color:#fff;border-radius:8px;text-align:center;}', height: '140px' }),
    html('breakpoints', '<div class="row"><div class="col-sm-12 col-md-6 col-lg-4">col-sm-12 col-md-6 col-lg-4</div></div>', { previewStyles: '.row{display:flex;}.col-sm-12{width:100%;padding:12px;border-radius:8px;background:#67c23a;color:#fff;}', height: '140px' }),
    html('offset / order / no-gutters', '<div class="row"><div class="col-md-6 offset-md-3">offset-md-3</div></div>', { previewStyles: '.row{display:flex;}.col-md-6{width:50%;padding:12px;background:#722ed1;color:#fff;border-radius:8px;text-align:center;}.offset-md-3{margin-left:25%;}', height: '140px' }),
  ],
  'bs-typography': [
    html('.display-*', '<h1 class="display-4">Display Heading</h1>', { previewStyles: '.display-4{font-size:2.5rem;font-weight:300;}', height: '140px' }),
    html('.lead', '<p class="lead">This paragraph stands out.</p>', { previewStyles: '.lead{font-size:1.2rem;color:#606266;}', height: '140px' }),
    html('.text-* 颜色类', '<p class="text-danger">Danger text</p><p class="text-primary">Primary text</p>', { previewStyles: '.text-danger{color:#f56c6c;}.text-primary{color:#409eff;}', height: '150px' }),
    html('text-transform / font-weight', '<p class="text-uppercase font-weight-bold">important notice</p>', { previewStyles: '.text-uppercase{text-transform:uppercase;}.font-weight-bold{font-weight:700;}', height: '140px' }),
  ],
  'bs-forms': [
    html('.form-control', '<input class="form-control" placeholder="Email">', { previewStyles: '.form-control{width:100%;padding:10px 12px;border:1px solid #dcdfe6;border-radius:8px;}', height: '140px' }),
    html('.form-group', '<div class="form-group"><label>Name</label><input class="form-control" placeholder="Tom"></div>', { previewStyles: '.form-group{display:flex;flex-direction:column;gap:6px;}.form-control{padding:10px 12px;border:1px solid #dcdfe6;border-radius:8px;}', height: '160px' }),
    html('.form-check', '<div class="form-check"><input class="form-check-input" type="checkbox"><label class="form-check-label">Remember me</label></div>', { previewStyles: '.form-check{display:flex;gap:8px;align-items:center;}', height: '140px' }),
    html('.form-inline', '<form class="form-inline"><input class="form-control" placeholder="Username"><button class="btn btn-success">Login</button></form>', { previewStyles: '.form-inline{display:flex;gap:8px;}.form-control{padding:10px 12px;border:1px solid #dcdfe6;border-radius:8px;}.btn-success{border:none;background:#67c23a;color:#fff;padding:10px 14px;border-radius:8px;}', height: '160px' }),
  ],
  'bs-buttons-nav': [
    html('按钮类', '<button class="btn btn-primary">Primary</button><button class="btn btn-outline-danger">Outline</button>', { previewStyles: '.btn{padding:8px 12px;border-radius:8px;border:1px solid transparent;margin-right:8px;}.btn-primary{background:#409eff;color:#fff;}.btn-outline-danger{border-color:#f56c6c;color:#f56c6c;background:#fff;}', height: '150px' }),
    html('按钮组', '<div class="btn-group"><button class="btn">Left</button><button class="btn">Middle</button><button class="btn">Right</button></div>', { previewStyles: '.btn-group{display:inline-flex;border-radius:8px;overflow:hidden;border:1px solid #dcdfe6;}.btn{padding:8px 12px;border:none;background:#fff;}', height: '140px' }),
    html('badge 徽标', '<span class="badge badge-pill">8</span>', { previewStyles: '.badge{display:inline-block;padding:6px 10px;border-radius:999px;background:#e6a23c;color:#fff;}', height: '130px' }),
    html('dropdown 结构', '<div class="dropdown"><button class="dropdown-toggle">Menu</button><div class="dropdown-menu"><div class="dropdown-item">Profile</div><div class="dropdown-divider"></div><div class="dropdown-item">Logout</div></div></div>', { previewStyles: '.dropdown-toggle{padding:8px 12px;border-radius:8px;border:1px solid #dcdfe6;background:#fff;}.dropdown-menu{margin-top:8px;border:1px solid #ebeef5;border-radius:8px;overflow:hidden;}.dropdown-item,.dropdown-divider{padding:8px 12px;}.dropdown-divider{height:1px;padding:0;background:#ebeef5;}', height: '210px' }),
    html('list-group / input-group', '<ul class="list-group"><li class="list-group-item">Inbox</li></ul><div class="input-group"><span class="input-group-text">@</span><input class="form-control" placeholder="username"></div>', { previewStyles: '.list-group{border:1px solid #dcdfe6;border-radius:8px;overflow:hidden;}.list-group-item{padding:10px 12px;}.input-group{display:flex;margin-top:10px;}.input-group-text,.form-control{padding:10px 12px;border:1px solid #dcdfe6;}.input-group-text{border-right:none;border-radius:8px 0 0 8px;background:#f5f7fa;}.form-control{border-radius:0 8px 8px 0;}', height: '210px' }),
    html('navbar', '<nav class="navbar"><span class="navbar-brand">MyApp</span><span class="nav-link">Home</span><span class="nav-link">Docs</span></nav>', { previewStyles: '.navbar{display:flex;gap:16px;padding:12px;border-radius:8px;background:#303133;color:#fff;}.navbar-brand{font-weight:700;}', height: '140px' }),
  ],
  'bs-icons-spacing': [
    html('Font Awesome 图标', '<button class="btn btn-primary"><i class="fas fa-home"></i> Home</button>', { previewStyles: '.btn{padding:8px 12px;border:none;border-radius:8px;background:#409eff;color:#fff;}.fas{font-style:normal;margin-right:6px;}', height: '140px' }),
    html('spacing utilities', '<div class="p-4 mb-3 bg-light">p-4 mb-3</div>', { previewStyles: '.p-4{padding:24px;}.mb-3{margin-bottom:12px;}.bg-light{background:#f5f7fa;border-radius:8px;}', height: '150px' }),
    html('mx-auto / text-center', '<div class="mx-auto text-center bg-warning" style="max-width:220px;">Centered block</div>', { previewStyles: '.mx-auto{margin-left:auto;margin-right:auto;}.text-center{text-align:center;}.bg-warning{background:#faad14;padding:10px;border-radius:8px;}', height: '150px' }),
    html('d-flex / justify-content-center', '<div class="d-flex justify-content-center"><div class="box">Centered</div></div>', { previewStyles: '.d-flex{display:flex;}.justify-content-center{justify-content:center;}.box{padding:10px 14px;background:#e6f4ff;border-radius:8px;}', height: '150px' }),
  ],
  'vue-what': [
    html('渐进式框架', '<div style="padding:12px;border-radius:10px;background:#f6ffed;">Vue can be used for a small widget or a full SPA.</div>'),
    html('核心特性总览', '<ul><li>Virtual DOM</li><li>Data Binding</li><li>Components</li><li>CLI</li></ul>', { height: '180px' }),
    html('聚焦视图层', '<div style="display:flex;gap:10px;"><div style="flex:1;padding:10px;background:#e6f4ff;border-radius:8px;">View Layer</div><div style="flex:1;padding:10px;background:#fff7e6;border-radius:8px;">Works with other libs</div></div>', { height: '160px' }),
  ],
  'vue-directives': [
    html('v-bind', '<img :src="imageUrl" alt="v-bind example">', { wrapperBefore: '<pre>', wrapperAfter: '</pre>', height: '130px' }),
    html('v-on', '<button @click="count++">Add</button>', { wrapperBefore: '<pre>', wrapperAfter: '</pre>', height: '130px' }),
    { type: 'vueBinding' },
    html('v-for / v-if / v-show / v-once', '<ul><li>v-for="item in items"</li><li>v-if="isVisible"</li><li>v-show="isVisible"</li><li>v-once</li></ul>', { height: '190px' }),
  ],
  'vue-virtual-dom': [
    html('真实 DOM', '<div style="padding:10px;border-radius:8px;background:#fff7e6;">Real DOM tree with many nodes</div>'),
    html('VDOM + diff', '<ol><li>Old VDOM</li><li>New VDOM</li><li>Diff changed nodes</li></ol>', { height: '180px' }),
    html('Patch 到真实 DOM', '<div style="padding:10px;border-radius:8px;background:#f6ffed;">Only changed parts are patched to the real DOM.</div>'),
  ],
  'vue-cli': [
    html('Node 环境检查', '<pre>node -v\nnpm -v</pre>', { height: '160px' }),
    html('Vue CLI 安装', '<pre>npm install -g @vue/cli</pre>', { height: '140px' }),
    html('常用命令', '<pre>vue create my-vue-project\nnpm run serve\nnpm run build</pre>', { height: '190px' }),
    html('Vite 替代方案', '<pre>npm create vue@latest</pre>', { height: '140px' }),
  ],
  'vue-structure': [
    html('src / components / views', '<div style="display:flex;flex-direction:column;gap:8px;"><div>src/</div><div>&nbsp;&nbsp;components/</div><div>&nbsp;&nbsp;views/</div></div>', { height: '170px' }),
    html('App.vue 与 main.js', '<div style="display:flex;gap:10px;"><div style="flex:1;padding:10px;background:#e6f4ff;border-radius:8px;">App.vue = root component</div><div style="flex:1;padding:10px;background:#f5f7fa;border-radius:8px;">main.js = app entry</div></div>', { height: '170px' }),
    html('.vue 文件三段式', '<pre>&lt;template&gt;...&lt;/template&gt;\n&lt;script&gt;...&lt;/script&gt;\n&lt;style scoped&gt;...&lt;/style&gt;</pre>', { height: '200px' }),
  ],
  'vue-simple-component': [
    html('组件是复用 UI 单元', '<div class="card">Reusable Card Component</div>', { previewStyles: '.card{padding:12px;border-radius:10px;background:#f5f7fa;}', height: '130px' }),
    html('多次复用', '<div><div class="mini-card">Card 1</div><div class="mini-card">Card 2</div></div>', { previewStyles: '.mini-card{margin:6px 0;padding:10px;border-radius:8px;background:#e6f4ff;}', height: '150px' }),
    html('scoped 样式', '<pre>&lt;style scoped&gt;.card { color: green; }&lt;/style&gt;</pre>', { height: '140px' }),
  ],
  'vue-data-function': [
    html('正确 data() 写法', '<pre>data() {\n  return { count: 0 }\n}</pre>', { height: '170px' }),
    html('错误 data 对象写法', '<pre>data: {\n  count: 0\n}</pre>', { height: '160px' }),
  ],
  'vue-local-registration': [
    html('import 子组件', '<pre>import SpecialButton from "./SpecialButton.vue"</pre>', { height: '130px' }),
    html('components 选项注册', '<pre>export default {\n  components: { SpecialButton }\n}</pre>', { height: '170px' }),
    html('只能当前组件使用', '<div style="padding:12px;border-radius:10px;background:#fff7e6;">ParentBox -> uses SpecialButton only inside ParentBox</div>', { height: '120px' }),
  ],
  'vue-global-registration': [
    html('app.component(name, Component)', '<pre>app.component("GlobalAlert", GlobalAlert)</pre>', { height: '130px' }),
    html('无需每页 import', '<div style="padding:12px;border-radius:10px;background:#f6ffed;">After global registration, any page can use &lt;GlobalAlert /&gt;.</div>', { height: '130px' }),
    html('适合基础通用组件', '<div style="display:flex;gap:8px;"><div style="flex:1;padding:10px;background:#e6f4ff;border-radius:8px;">Icon</div><div style="flex:1;padding:10px;background:#e6f4ff;border-radius:8px;">Alert</div></div>', { height: '150px' }),
  ],
  'vue-dynamic-components': [
    html('<component :is>', '<pre>&lt;component :is="currentTab" /&gt;</pre>', { height: '130px' }),
    html('适合 tab 切换', '<div style="display:flex;gap:8px;"><button>Home</button><button>About</button></div><div style="margin-top:10px;padding:10px;background:#f5f7fa;border-radius:8px;">Current tab content</div>', { height: '180px' }),
    html('is 可绑定组件名', '<pre>currentTab = "HomePage"</pre>', { height: '130px' }),
  ],
  'vue-component-events': [
    html('组件可处理 DOM 事件', '<pre>&lt;button @click="handleClick"&gt;Click&lt;/button&gt;</pre>', { height: '130px' }),
    html('@mouseover / @mouseout', '<pre>&lt;div @mouseover="hover=true" @mouseout="hover=false"&gt;Hover me&lt;/div&gt;</pre>', { height: '140px' }),
    html('实例独立状态', '<div style="display:flex;gap:10px;"><div style="flex:1;padding:10px;background:#e6f4ff;border-radius:8px;">Card A hover = false</div><div style="flex:1;padding:10px;background:#fff1f0;border-radius:8px;">Card B hover = true</div></div>', { height: '170px' }),
  ],
  'vue-event-click': [
    { type: 'vueAdvanced', mode: 'event-click', title: '点击事件主实验', description: '用真实按钮点击和数值累加演示 `@click`。' },
    html('`v-on:click` 与 `@click`', '<pre>&lt;button v-on:click="displayNumbers"&gt;Click Me&lt;/button&gt;\n&lt;button @click="displayNumbers"&gt;Click Me&lt;/button&gt;</pre>', { height: '150px' }),
    html('常见事件类型', '<div style="display:flex;flex-wrap:wrap;gap:8px;"><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">submit</span><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">keyup</span><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">mouseover</span><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">mouseout</span><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">load</span></div>', { height: '160px' }),
  ],
  'vue-event-modifiers': [
    { type: 'vueAdvanced', mode: 'event-modifiers', title: '修饰符主实验', description: '同时演示 `.once` 和 `.prevent`。' },
    html('`.once` 只执行一次', '<pre>&lt;button @click.once="buttonClickedOnce"&gt;Just once clickable&lt;/button&gt;</pre>', { height: '140px' }),
    html('`.prevent` 阻止默认行为', '<pre>&lt;a href="https://google.com" @click.prevent="clickMe"&gt;Click Me&lt;/a&gt;</pre>', { height: '140px' }),
  ],
  'vue-key-modifiers': [
    { type: 'vueAdvanced', mode: 'event-key', title: '键盘修饰符主实验', description: '输入后按 Enter 或 Ctrl+Enter 观察差异。' },
    html('常见键盘修饰符', '<div style="display:flex;flex-wrap:wrap;gap:8px;"><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">.enter</span><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">.tab</span><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">.delete</span><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">.esc</span><span style="padding:6px 10px;background:#f5f7fa;border-radius:999px;">.space</span></div>', { height: '150px' }),
    html('组合键写法', '<pre>&lt;input @keyup.ctrl.enter="showInputValueCtrl"&gt;</pre>', { height: '120px' }),
  ],
  'vue-custom-events': [
    { type: 'vueAdvanced', mode: 'event-custom', title: '自定义事件主实验', description: '子组件点击后通过 `$emit` 把值发给父组件。' },
    html('子组件 `$emit`', '<pre>this.$emit("showLanguage", this.item)</pre>', { height: '120px' }),
    html('父组件监听事件', '<pre>&lt;LanguageButton @showLanguage="languageDisp" /&gt;</pre>', { height: '120px' }),
  ],
  'vue-mouse-events': [
    { type: 'vueAdvanced', mode: 'event-mouse', title: '鼠标事件主实验', description: '多实例卡片真实演示 `@mouseover / @mouseout`。' },
    html('鼠标事件写法', '<pre>&lt;div @mouseover="handleMouseOver" @mouseout="handleMouseOut"&gt;&lt;/div&gt;</pre>', { height: '130px' }),
    html('响应式状态切换', '<div style="display:flex;gap:10px;"><div style="flex:1;padding:10px;background:#e6f4ff;border-radius:8px;">hover = false</div><div style="flex:1;padding:10px;background:#fff1f0;border-radius:8px;">hover = true</div></div>', { height: '150px' }),
  ],
  'vue-render-vif': [
    { type: 'vueAdvanced', mode: 'render-vif', title: 'v-if 主实验', description: '点击切换 show，观察节点是否被真正移除。' },
    html('`v-if` 条件渲染', '<pre>&lt;h1 v-if="show"&gt;This is h1 tag&lt;/h1&gt;</pre>', { height: '120px' }),
    html('条件为 false 时移出 DOM', '<div style="padding:12px;border-radius:10px;background:#fff1f0;">show = false 时，对应节点不会继续留在页面结构里。</div>', { height: '120px' }),
  ],
  'vue-render-vif-else': [
    { type: 'vueAdvanced', mode: 'render-vif-else', title: 'v-if / v-else 主实验', description: '在两个互斥节点之间切换显示。' },
    html('`v-else` 紧跟 `v-if`', '<pre>&lt;h1 v-if="show"&gt;A&lt;/h1&gt;\n&lt;h2 v-else&gt;B&lt;/h2&gt;</pre>', { height: '130px' }),
    html('适合二选一场景', '<div style="display:flex;gap:10px;"><div style="flex:1;padding:10px;background:#e6f4ff;border-radius:8px;">Login</div><div style="flex:1;padding:10px;background:#f6ffed;border-radius:8px;">Logout</div></div>', { height: '140px' }),
  ],
  'vue-render-vshow': [
    { type: 'vueAdvanced', mode: 'render-vshow', title: 'v-show 主实验', description: '切换显隐但保留节点在 DOM 中。' },
    html('`v-show` 改的是 display', '<pre>&lt;div v-show="show"&gt;Visible Block&lt;/div&gt;</pre>', { height: '120px' }),
    html('适合频繁切换', '<div style="padding:12px;border-radius:10px;background:#f6ffed;">频繁显示 / 隐藏时，v-show 往往更合适。</div>', { height: '120px' }),
  ],
  'vue-render-vfor': [
    { type: 'vueAdvanced', mode: 'render-vfor', title: 'v-for 主实验', description: '输入新项后按 Enter，列表自动更新。' },
    html('列表渲染语法', '<pre>&lt;li v-for="(item, index) in items" :key="index"&gt;{{ item }}&lt;/li&gt;</pre>', { height: '130px' }),
    html('数组驱动视图', '<div style="padding:12px;border-radius:10px;background:#e6f4ff;">items.push("Apple") 后，页面列表会自动出现新项。</div>', { height: '120px' }),
  ],
  'vue-transition-fade': [
    { type: 'vueAdvanced', mode: 'transition-fade', title: 'Fade Transition 主实验', description: '使用 `<transition>` 和 opacity 做淡入淡出。' },
    html('过渡包装器', '<pre>&lt;transition name="fade"&gt;...&lt;/transition&gt;</pre>', { height: '120px' }),
    css('opacity 过渡', '.demo-box { opacity: 0.3; transition: opacity 1s; }', '<div class="stage"><div class="demo-box">fade</div></div>'),
  ],
  'vue-transition-shiftx': [
    { type: 'vueAdvanced', mode: 'transition-shiftx', title: 'ShiftX 主实验', description: '通过 translateX 和 opacity 做横向滑动过渡。' },
    html('ShiftX 语法', '<pre>.shiftx-enter-active { transition: all 2s ease-in-out; }</pre>', { height: '120px' }),
    css('translateX 位移', '.demo-box { transform: translateX(60px); opacity: 0.7; }', '<div class="stage"><div class="demo-box">shiftX</div></div>'),
  ],
  'vue-animation-rotate': [
    { type: 'vueAdvanced', mode: 'animation-rotate', title: 'Rotate Animation 主实验', description: '通过 `@keyframes` 演示多阶段 3D 旋转动画。' },
    html('关键帧动画', '<pre>@keyframes shift-in { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(360deg); } }</pre>', { height: '130px' }),
    html('进入 / 离开反向播放', '<div style="padding:12px;border-radius:10px;background:#fff7e6;">enter 正放，leave reverse 反放。</div>', { height: '110px' }),
  ],
  'vue-transition-custom': [
    { type: 'vueAdvanced', mode: 'transition-custom', title: '自定义过渡类主实验', description: '用自定义 enter / leave 类模拟 Animate.css 风格动画。' },
    html('自定义类名', '<pre>&lt;transition enter-active-class="animate__swing" leave-active-class="animate__bounceOut"&gt;</pre>', { height: '120px' }),
    html('第三方动画库思路', '<div style="padding:12px;border-radius:10px;background:#f9f0ff;">不一定手写 fade 类，也可以直接接入现成动画类。</div>', { height: '120px' }),
  ],
}

export const bilingualTopicContent = {
  'html-structure': {
    introOriginal:
      'This section covers the basic HTML5 document structure, including DOCTYPE, html, head, body, and the difference between container tags and empty tags.',
    knowledgeOriginal: [
      'DOCTYPE must be written on the first line to tell the browser to use HTML5 standard mode.',
      'The html element is the root of the page, head stores metadata, and body stores visible content.',
      'Container tags usually come in pairs and need closing tags, such as html, head, body, and p.',
      'Empty tags have no content and no closing tag, such as br, hr, and img.',
    ],
  },
  'html-head': {
    introOriginal:
      'This section covers the resource and metadata tags that can appear inside the head element.',
    knowledgeOriginal: [
      'The title tag sets the text shown on the browser tab and usually appears once per document.',
      'Meta tags describe information such as description, keywords, author, or refresh behavior.',
      'Link is commonly used to load external style sheets and describe relationships to resources.',
      'Script can contain inline JavaScript or load external files through src, async, and defer.',
      'Base sets the base URL used to resolve relative paths on the page.',
      'Noscript provides fallback content when JavaScript is unavailable.',
    ],
  },
  'html-body-text': {
    introOriginal:
      'This section covers headings, paragraphs, inline formatting, lists, the difference between div and span, and the native details and summary tags.',
    knowledgeOriginal: [
      'h1 to h6 represent heading levels, and p represents a paragraph.',
      'b, i, and u are used for bold, italic, and underline formatting, while br inserts a line break and hr inserts a divider.',
      'ol creates an ordered list, ul creates an unordered list, and li creates list items.',
      'Div is a block-level container, while span is an inline container.',
      'Details and summary create a native collapsible panel without JavaScript.',
    ],
  },
  'html-media': {
    introOriginal:
      'This section explains images, media elements, and the difference between meter and progress.',
    knowledgeOriginal: [
      'The img tag commonly uses formats such as GIF, JPEG, JPG, and PNG, with src, alt, width, and height as key attributes.',
      'Audio and video often use controls, autoplay, loop, and muted, while video can also use poster.',
      'Meter represents a scalar value within a known range, such as a rating or occupancy.',
      'Progress represents the completion state of a task, such as a loading process.',
    ],
  },
  'html-semantic': {
    introOriginal:
      'This section covers semantic layout tags, figure and figcaption, and hyperlinks with target.',
    knowledgeOriginal: [
      'Header represents the page header or section header, and nav stores navigation links.',
      'Article represents independent content, while aside represents side notes or supplementary content.',
      'Footer represents the bottom area of a page or a section.',
      'Figure and figcaption are used together to present media and its description.',
      'The href attribute points to the destination, and target controls where the result opens.',
    ],
  },
  'html-web-concepts': {
    introOriginal:
      'This section reviews conceptual topics such as static pages, dynamic pages, editors, the Internet, and the World Wide Web.',
    knowledgeOriginal: [
      'A static web page stays fixed until the file is edited.',
      'A dynamic web page can be generated or updated according to data, time, or user behavior.',
      'Text editors include tools such as Notepad and VS Code, while Dreamweaver is a visual editor.',
      'The Internet is the network infrastructure, while the WWW is the web page system built on top of it.',
    ],
  },
  'css-intro': {
    introOriginal:
      'This section introduces what CSS is, why it is needed, the basic rule syntax, and the three common ways to apply styles.',
    knowledgeOriginal: [
      'CSS controls the appearance, layout, and presentation of HTML elements.',
      'A standard CSS rule uses the syntax selector { property: value; }.',
      'The three common ways are inline styles, internal style sheets, and external CSS files.',
      'A simple classroom rule of precedence is inline > internal > external > browser default.',
    ],
  },
  'css-selectors-basic': {
    introOriginal:
      'This section covers basic selectors such as id, class, element, grouped selectors, and contextual selectors.',
    knowledgeOriginal: [
      'The id selector uses # and is meant for a unique element.',
      'The class selector uses . and is suitable for reusable styles.',
      'An element selector targets a tag name directly, such as p or h1.',
      'A grouped selector uses commas, such as h1, p.',
      'A contextual selector can target nested structures such as div p or li a.',
    ],
  },
  'css-selector-confusions': {
    introOriginal:
      'This section compares four selectors that are frequently confused in exams and practice: descendant, child, adjacent sibling, and general sibling.',
    knowledgeOriginal: [
      'div p matches all p elements that are descendants of a div.',
      'div > p matches only p elements that are direct children of a div.',
      'div + p matches the first p that comes immediately after a div at the same level.',
      'div ~ p matches all p elements that come after a div at the same level.',
    ],
  },
  'css-properties': {
    introOriginal:
      'This section reviews font properties, text properties, list properties, and background properties.',
    knowledgeOriginal: [
      'Font properties include font-family, font-size, font-style, font-weight, and font-variant.',
      'Text properties include text-align, text-indent, line-height, color, text-decoration, text-transform, and letter-spacing.',
      'List properties include list-style-type, list-style-position, and list-style-image.',
      'Background properties include background-color and background-image.',
    ],
  },
  'css-layout': {
    introOriginal:
      'This section covers layout and visibility topics such as display, visibility, position, float, clear, and common link pseudo-classes.',
    knowledgeOriginal: [
      'display: none hides an element and removes its layout space, while block and inline change the display mode.',
      'visibility: hidden hides an element but keeps its layout space.',
      'Position can be static, relative, absolute, or fixed, often combined with top, right, bottom, left, and z-index.',
      'Float moves an element to the left or right, and clear removes the effect of previous floats.',
      'Common link pseudo-classes include :link, :visited, :hover, and :active.',
    ],
  },
  'table-structure': {
    introOriginal:
      'This section explains the basic table structure and the meaning of thead, tbody, tfoot, caption, th, and td.',
    knowledgeOriginal: [
      'The table element is the main table container, and caption is the table title.',
      'Thead, tbody, and tfoot divide the table into header, body, and footer sections.',
      'Tr creates a row, th creates a header cell, and td creates a normal data cell.',
    ],
  },
  'table-merge': {
    introOriginal:
      'This section explains the two most important table merging attributes: colspan and rowspan.',
    knowledgeOriginal: [
      'Colspan merges cells across columns.',
      'Rowspan merges cells across rows.',
    ],
  },
  'table-style': {
    introOriginal:
      'This section reviews common table style properties such as border, border-collapse, padding, text-align, width, and height.',
    knowledgeOriginal: [
      'Border controls the border style of the table or cells.',
      'Border-collapse decides whether adjacent table borders are merged.',
      'Padding controls the space inside table cells.',
      'Text-align controls how text is aligned inside the cells.',
      'Width and height control the size of the table or its cells.',
    ],
  },
  iframe: {
    introOriginal:
      'This section explains iframe, src, srcdoc, name, target, and common iframe styles.',
    knowledgeOriginal: [
      'Iframe embeds another page or an HTML fragment inside the current page.',
      'Src loads an external page, while srcdoc writes inline HTML directly into the frame.',
      'The name attribute can work with a link target so the result opens inside a specific frame.',
      'Common iframe properties include width, height, border, margin, and padding.',
    ],
  },
  'form-attributes': {
    introOriginal:
      'This section covers the key attributes of the form tag, including name, id, action, method, autocomplete, novalidate, and target.',
    knowledgeOriginal: [
      'The name attribute helps scripts identify the form.',
      'The id attribute helps CSS and JavaScript select the form precisely.',
      'Action points to the submission URL, and method is usually get or post.',
      'Autocomplete controls browser autofill, and novalidate disables native browser validation.',
      'Target controls where the response is opened.',
    ],
  },
  'form-inputs': {
    introOriginal:
      'This section reviews common input types and useful attributes such as placeholder, required, pattern, and readonly.',
    knowledgeOriginal: [
      'Different input types change the input behavior and built-in validation features.',
      'Email and url provide basic format validation.',
      'Number often works with min and max, while range often works with min, max, and step.',
      'Radio buttons with the same name are mutually exclusive, while checkboxes allow multiple choices.',
      'Common attributes include value, placeholder, required, autofocus, pattern, disabled, readonly, maxlength, and size.',
    ],
  },
  'form-select-group': {
    introOriginal:
      'This section explains select, option, optgroup, label, fieldset, and legend for grouped form controls and accessibility.',
    knowledgeOriginal: [
      'Select creates a drop-down list or a list box.',
      'Option defines an item, and optgroup groups related items together.',
      'Label improves accessibility by connecting text to an input through for and id.',
      'Fieldset and legend are used to semantically group related form fields.',
    ],
  },
  'form-other-elements': {
    introOriginal:
      'This section covers other form elements such as textarea, datalist, output, button, and the obsolete keygen tag.',
    knowledgeOriginal: [
      'Textarea is used for multi-line text input.',
      'Datalist provides suggestions for an input element.',
      'Output is often used to display a calculated result.',
      'Button can be a submit button, reset button, or a normal button.',
      'Keygen is obsolete and should not be used in modern projects.',
    ],
  },
  'js-basics': {
    introOriginal:
      'This section reviews basic JavaScript syntax, including variables, operators, and functions.',
    knowledgeOriginal: [
      'Modern projects usually prefer let and const over var.',
      'Operators include arithmetic, assignment, comparison, and logical operators.',
      'A function can accept parameters and return a value.',
    ],
  },
  'js-validation': {
    introOriginal:
      'This section explains document.getElementById, onsubmit validation, form objects, and common form events.',
    knowledgeOriginal: [
      'It is recommended to give inputs an id and access them with document.getElementById().',
      'Form fields can also be accessed through form.elements[name].',
      'Common form-related events include submit, reset, click, focus, blur, change, select, and onsubmit.',
    ],
  },
  'jquery-intro': {
    introOriginal:
      'This section introduces jQuery, its basic syntax $(selector).action(), and the purpose of $(document).ready().',
    knowledgeOriginal: [
      'jQuery is a lightweight JavaScript library for DOM operations, events, and effects.',
      'The core idea is $(selector).action().',
      '$(document).ready() ensures that the DOM is loaded before the code runs.',
    ],
  },
  'jquery-selectors': {
    introOriginal:
      'This section covers element selectors, id selectors, class selectors, attribute selectors, and hierarchy selectors in jQuery.',
    knowledgeOriginal: [
      '$("h1") selects an element, $("#header") selects an id, and $(".product") selects a class.',
      '$("[src]") and $("[src=\'movie.jpg\']") are attribute selectors.',
      '$("#menu ul") and $("#menu li a") are hierarchy selectors.',
    ],
  },
  'jquery-content': {
    introOriginal:
      'This section reviews jQuery content methods such as html(), append(), prepend(), after(), remove(), and empty().',
    knowledgeOriginal: [
      'html() reads or writes HTML content.',
      'append() inserts at the end, prepend() inserts at the beginning, and after() inserts after the target.',
      'remove() deletes the selected element itself, while empty() removes only its children.',
    ],
  },
  'jquery-events-effects': {
    introOriginal:
      'This section covers common jQuery event methods and effect methods such as toggle, slide, fade, and animate.',
    knowledgeOriginal: [
      'Event methods include click, dblclick, mouseenter, mouseleave, keydown, submit, focus, and blur.',
      'Effect methods include hide, show, toggle, slideDown, slideUp, slideToggle, fadeIn, fadeOut, and animate.',
      'animate({ params }, speed, callback) changes animatable CSS properties smoothly.',
    ],
  },
  'jquery-plugins': {
    introOriginal:
      'This section explains a practical slide menu and the basic ideas of Colorbox and Galleria plugins.',
    knowledgeOriginal: [
      'A slide menu usually hides the submenu first and then expands it with click and slideToggle.',
      'Colorbox is a lightweight lightbox plugin commonly initialized with $("a").colorbox().',
      'rel="gallery" groups multiple images into one gallery.',
      'slideshow: true enables slide-show mode.',
      'Galleria is more like an in-page gallery, while Colorbox is more like an overlay lightbox.',
    ],
  },
  'bs-intro': {
    introOriginal:
      'This section introduces Bootstrap, its mobile-first idea, the grid system, CDN usage, and JavaScript dependencies.',
    knowledgeOriginal: [
      'Bootstrap is an open-source CSS framework that provides a responsive grid, UI components, and JS plugins.',
      'Its main ideas include mobile-first design, a 12-column grid, rich components, and customization.',
      'Bootstrap JavaScript depends on jQuery and Popper.',
      'The viewport meta tag is important for mobile adaptation.',
    ],
  },
  'bs-grid': {
    introOriginal:
      'This section explains the Bootstrap grid system, including container, row, col, offset, order, and breakpoints.',
    knowledgeOriginal: [
      '.container is a fixed-width container, and .container-fluid is a full-width container.',
      '.row creates a grid row, and .col-* creates columns.',
      'Breakpoints include col-, col-sm-, col-md-, col-lg-, and col-xl-.',
      'offset-* adds left offset, order-* changes visual order, and no-gutters removes spacing.',
    ],
  },
  'bs-typography': {
    introOriginal:
      'This section reviews Bootstrap typography and text utility classes such as display headings, lead text, and text color utilities.',
    knowledgeOriginal: [
      '.display-1 to .display-4 are used for large headings.',
      '.lead makes a paragraph stand out.',
      '.text-muted and text-primary, success, danger, or warning apply text colors.',
      '.text-uppercase, capitalize, and font-weight utilities are common helper classes.',
    ],
  },
  'bs-forms': {
    introOriginal:
      'This section covers common Bootstrap form classes such as form-control, form-group, form-check, and form-inline.',
    knowledgeOriginal: [
      '.form-control styles input, select, and textarea elements.',
      '.form-group provides spacing between form controls.',
      '.form-check, .form-check-input, and .form-check-label are used for checkboxes and radios.',
      '.form-inline is used for compact horizontal forms.',
    ],
  },
  'bs-buttons-nav': {
    introOriginal:
      'This section combines common Bootstrap UI classes for buttons, badges, dropdowns, list groups, input groups, and navigation bars.',
    knowledgeOriginal: [
      'Button classes include btn, btn-primary, btn-secondary, btn-success, btn-danger, btn-outline-*, btn-lg, btn-sm, and btn-block.',
      'Button groups use btn-group or btn-group-vertical.',
      'Badges use badge, badge-pill, and badge-* classes.',
      'Dropdown classes include dropdown, dropdown-toggle, dropdown-menu, dropdown-item, and dropdown-divider.',
      'List groups use list-group and list-group-item, while input groups use input-group and input-group-text.',
      'Navbar classes include navbar, navbar-brand, navbar-nav, nav-item, nav-link, navbar-toggler, and collapse navbar-collapse.',
    ],
  },
  'bs-icons-spacing': {
    introOriginal:
      'This section explains Font Awesome icons and Bootstrap spacing utility classes.',
    knowledgeOriginal: [
      'Bootstrap 4 does not include built-in icons, so it is often used with Font Awesome.',
      'A common icon syntax is <i class="fas fa-home"></i>.',
      'Spacing utilities use the pattern {property}{sides}-{size}, such as mt-3, px-4, mx-auto, and p-3.',
      'd-flex and justify-content-center are also common utility classes.',
    ],
  },
  'vue-what': {
    introOriginal:
      'This section introduces Vue as a progressive framework and reviews core ideas such as virtual DOM, data binding, components, event handling, directives, and CLI.',
    knowledgeOriginal: [
      'Vue is a progressive framework that is lightweight, approachable, and suitable for SPAs or gradual adoption.',
      'Core features include virtual DOM, data binding, components, event handling, transitions, computed properties, templates, directives, and CLI support.',
      'Vue focuses on the view layer and works well with other libraries.',
    ],
  },
  'vue-directives': {
    introOriginal:
      'This section reviews common Vue directives such as v-bind, v-on, v-model, v-for, v-if, v-show, and v-once.',
    knowledgeOriginal: [
      'v-bind binds attributes and is shortened as :.',
      'v-on binds events and is shortened as @.',
      'v-model creates two-way binding for form controls.',
      'v-for renders lists, v-if and related directives control conditional rendering, v-show controls CSS visibility, and v-once renders only once.',
    ],
  },
  'vue-virtual-dom': {
    introOriginal:
      'This section explains the workflow between the real DOM and the virtual DOM, including render, diff, and patch.',
    knowledgeOriginal: [
      'The real DOM is the actual browser node tree, and large updates can be costly.',
      'Vue creates virtual DOM trees and compares the new tree with the old tree when data changes.',
      'Only the necessary patches are then applied to the real DOM.',
    ],
  },
  'vue-cli': {
    introOriginal:
      'This section covers Node, npm, Vue CLI commands, and the Vite alternative for creating Vue projects.',
    knowledgeOriginal: [
      'Install Node.js first, then verify it with node -v and npm -v.',
      'Vue CLI can be installed with npm install -g @vue/cli.',
      'Common commands include vue --version, vue create, npm run serve, and npm run build.',
      'A common Vite-based alternative is npm create vue@latest.',
    ],
  },
  'vue-structure': {
    introOriginal:
      'This section reviews the Vue project structure and the Single File Component format.',
    knowledgeOriginal: [
      'src is the main source directory, components stores reusable components, and views stores page-level components.',
      'App.vue is the root component, and main.js is the application entry file.',
      '.vue files usually contain template, script, and style scoped sections.',
    ],
  },
  'vue-simple-component': {
    introOriginal:
      'This section explains what a simple reusable Vue component is and how the same component can be used multiple times.',
    knowledgeOriginal: [
      'A component is an independent and reusable UI unit.',
      'The same component can be used multiple times in a parent component, and each instance is separate.',
      'Scoped styles only affect the current component.',
    ],
  },
  'vue-data-function': {
    introOriginal:
      'This section explains why data in a Vue component must be a function that returns a fresh object.',
    knowledgeOriginal: [
      'The correct form is data() { return { count: 0 } }.',
      'The wrong form is data: { count: 0 }, which may cause shared state or warnings.',
    ],
  },
  'vue-local-registration': {
    introOriginal:
      'This section explains local component registration using import and the components option.',
    knowledgeOriginal: [
      'Local registration imports a component and adds it inside the components option.',
      'A locally registered component can only be used inside the current component.',
      'This keeps scope clear and avoids unnecessary global names.',
    ],
  },
  'vue-global-registration': {
    introOriginal:
      'This section explains global registration in Vue 3 with app.component(name, Component).',
    knowledgeOriginal: [
      'Vue 3 uses app.component(name, Component) for global registration.',
      'After registration, the component can be used without importing it in every page.',
      'It is suitable for high-frequency shared components such as alerts, icons, or base buttons.',
    ],
  },
  'vue-dynamic-components': {
    introOriginal:
      'This section explains dynamic components with <component :is="currentComponent"> for runtime component switching.',
    knowledgeOriginal: [
      'Dynamic components are created with <component :is="currentComponent">.',
      'They are useful for tabs, step panels, or multi-view switching without routing.',
      'The is value can be a component object or a registered component name.',
    ],
  },
  'vue-component-events': {
    introOriginal:
      'This section covers component-level interaction with DOM events such as mouseover and mouseout.',
    knowledgeOriginal: [
      'A component can handle native DOM events.',
      '@mouseover and @mouseout are often used for hover-state interaction.',
      'Combined with data() and methods, each component instance can keep its own state.',
    ],
  },
  'vue-event-click': {
    introOriginal:
      'This section covers the Basic Click Event topic from Chapter 14 and explains how Vue listens to DOM events with v-on or @.',
    knowledgeOriginal: [
      'Events are used to respond to user actions such as clicks, mouse movements, and keyboard input.',
      'v-on:click and @click use the same event listening syntax, and @ is the shorthand form.',
      'Common events include submit, keyup, drag, scroll, error, abort, mouseover, mouseout, and load.',
    ],
  },
  'vue-event-modifiers': {
    introOriginal:
      'This section explains two common Vue event modifiers: .once and .prevent.',
    knowledgeOriginal: [
      'Event modifiers are postfixes such as .once, .prevent, .stop, .capture, .self, and .passive.',
      'The .once modifier allows an event handler to run only one time.',
      'The .prevent modifier calls event.preventDefault() automatically and blocks default browser behavior.',
    ],
  },
  'vue-key-modifiers': {
    introOriginal:
      'This section explains key modifiers and how Vue handles specific keys and key combinations.',
    knowledgeOriginal: [
      'Vue provides built-in key modifiers such as .enter, .tab, .delete, .esc, .space, .up, .down, .left, and .right.',
      'You can listen to a single key with @keyup.enter or a combination such as @keyup.ctrl.enter.',
      'Key modifiers are useful for form submission, confirmation input, and keyboard shortcuts.',
    ],
  },
  'vue-custom-events': {
    introOriginal:
      'This section explains custom events and the standard child-to-parent communication pattern in Vue.',
    knowledgeOriginal: [
      'Custom events are the standard way for a child component to communicate with its parent.',
      'A child component sends data upward by calling $emit("event-name", data).',
      'The parent listens with @event-name="handlerMethod" and updates its own state.',
    ],
  },
  'vue-mouse-events': {
    introOriginal:
      'This section explains complete event handling with mouseover and mouseout to update component state dynamically.',
    knowledgeOriginal: [
      'Vue can listen to any DOM event, including mouseover, mouseout, and mousemove.',
      'Mouse events are often combined with reactive state to change text, color, and hover messages.',
      'Each component instance should keep its own mouse state independently.',
    ],
  },
  'vue-render-vif': {
    introOriginal:
      'This section explains the v-if directive and how Vue conditionally renders or removes an element from the DOM.',
    knowledgeOriginal: [
      'v-if conditionally renders a block only when its expression is true.',
      'If the expression becomes false, 0, null, or an empty string, the element is removed from the DOM.',
      'v-else and v-else-if are commonly used together with v-if to create conditional branches.',
    ],
  },
  'vue-render-vif-else': {
    introOriginal:
      'This section explains how v-if and v-else work together to toggle between mutually exclusive elements.',
    knowledgeOriginal: [
      'v-else must immediately follow a v-if or v-else-if block.',
      'When the previous condition is false, the v-else block is rendered.',
      'This pattern is useful for binary states such as logged in vs logged out or success vs failure.',
    ],
  },
  'vue-render-vshow': {
    introOriginal:
      'This section explains the v-show directive and how it toggles CSS display instead of adding or removing DOM nodes.',
    knowledgeOriginal: [
      'v-show does not remove the element from the DOM and only toggles display: none.',
      'The element always remains in the DOM even when the condition is false.',
      'v-show is often a better choice for frequently toggled visibility.',
    ],
  },
  'vue-render-vfor': {
    introOriginal:
      'This section explains the v-for directive and how Vue renders a list from an array.',
    knowledgeOriginal: [
      'v-for renders a list based on an array or object source.',
      'Vue 3 requires or strongly expects a stable :key for each rendered item.',
      'When the array changes, Vue updates the rendered list automatically.',
    ],
  },
  'vue-transition-fade': {
    introOriginal:
      'This section explains fade transitions using the transition wrapper and opacity-based CSS classes.',
    knowledgeOriginal: [
      'Vue provides a transition wrapper component for enter and leave effects.',
      'The name attribute defines the prefix for transition classes such as fade-enter-active and fade-leave-active.',
      'A fade transition usually changes opacity from 0 to 1 and back.',
    ],
  },
  'vue-transition-shiftx': {
    introOriginal:
      'This section explains a ShiftX transition where an element slides along the X-axis while fading.',
    knowledgeOriginal: [
      'Transitions can animate CSS properties such as transform and opacity.',
      'ShiftX effects commonly use translateX(...) for horizontal movement.',
      'The same transition rules can be reused for both entering and leaving.',
    ],
  },
  'vue-animation-rotate': {
    introOriginal:
      'This section explains rotate animation with CSS keyframes and reverse playback during leaving.',
    knowledgeOriginal: [
      'Vue transitions can be combined with CSS @keyframes for complex animations.',
      'Keyframes define multiple stages such as 0%, 25%, 50%, 75%, and 100%.',
      'The leaving phase can play the same animation in reverse to create a return effect.',
    ],
  },
  'vue-transition-custom': {
    introOriginal:
      'This section explains custom transition classes and how Vue can integrate with external animation-style class names.',
    knowledgeOriginal: [
      'Vue supports enter-class, enter-active-class, leave-active-class, and other custom transition class attributes.',
      'This pattern is useful when integrating external animation libraries such as Animate.css.',
      'With custom classes, you do not always need to write the standard transition-name-prefixed classes yourself.',
    ],
  },
}

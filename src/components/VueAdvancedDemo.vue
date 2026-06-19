<template>
  <el-card class="vue-advanced-card" shadow="hover">
    <template #header>
      <div class="vue-advanced-card__header">
        <div>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
        <el-tag type="primary">Vue 大型代码实现</el-tag>
      </div>
    </template>

    <div class="vue-advanced-card__body">
      <div v-if="mode === 'directives'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">核心代码</span>
          <pre class="vue-lab__code">{{ directiveCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">实时效果</span>
          <div class="directive-demo">
            <div class="directive-demo__toolbar">
              <button
                type="button"
                class="directive-demo__toggle"
                @click="directiveState.visible = !directiveState.visible"
              >
                {{ directiveState.visible ? '隐藏列表' : '显示列表' }}
              </button>
              <button
                type="button"
                class="directive-demo__toggle"
                @click="directiveState.ifMode = !directiveState.ifMode"
              >
                切换 `v-if` / `v-show`
              </button>
              <button
                type="button"
                class="directive-demo__toggle"
                @click="directiveState.count += 1"
              >
                事件计数 +1
              </button>
            </div>

            <div class="directive-demo__grid">
              <div class="directive-demo__panel">
                <h4>`v-model` + `v-bind`</h4>
                <input
                  v-model="directiveState.keyword"
                  class="directive-demo__input"
                  :placeholder="`搜索 ${directiveState.category}`"
                >
                <select v-model="directiveState.category" class="directive-demo__select">
                  <option value="Vue">Vue</option>
                  <option value="组件">组件</option>
                  <option value="指令">指令</option>
                </select>
                <p>当前输入：{{ directiveState.keyword || '未输入' }}</p>
              </div>

              <div class="directive-demo__panel">
                <h4>`v-on` + `v-once`</h4>
                <p>点击次数：{{ directiveState.count }}</p>
                <p class="directive-demo__once">首次渲染时间：{{ onceTimestamp }}</p>
              </div>
            </div>

            <div class="directive-demo__panel">
              <h4>`v-for` 列表渲染</h4>
              <ul class="directive-demo__list">
                <li
                  v-for="room in filteredRooms"
                  :key="room.id"
                  class="directive-demo__item"
                >
                  <span>{{ room.name }}</span>
                  <strong>{{ room.tag }}</strong>
                </li>
              </ul>
            </div>

            <div class="directive-demo__grid">
              <div class="directive-demo__panel">
                <h4>`v-if` 条件渲染</h4>
                <div v-if="directiveState.ifMode && directiveState.visible" class="directive-demo__badge">
                  这个区域会被真正创建 / 销毁
                </div>
                <div v-else class="directive-demo__badge directive-demo__badge--ghost">
                  当前 `v-if` 条件为 false
                </div>
              </div>

              <div class="directive-demo__panel">
                <h4>`v-show` 显隐控制</h4>
                <div v-show="directiveState.visible" class="directive-demo__badge directive-demo__badge--success">
                  这个区域始终在 DOM 中，只是通过 CSS 显隐
                </div>
                <p v-if="!directiveState.visible" class="directive-demo__hint">你隐藏后，`v-show` 只是不显示。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'virtual-dom'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">核心代码流程</span>
          <pre class="vue-lab__code">{{ virtualDomCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">Virtual DOM 模拟</span>
          <div class="vdom-demo">
            <div class="vdom-demo__actions">
              <button type="button" @click="toggleVirtualDom">
                {{ virtualDomUpdated ? '恢复初始状态' : '模拟数据更新' }}
              </button>
            </div>
            <div class="vdom-demo__steps">
              <div
                v-for="(step, index) in virtualDomSteps"
                :key="step"
                class="vdom-demo__step"
                :class="{ active: index <= currentVdomStep }"
              >
                {{ step }}
              </div>
            </div>

            <div class="vdom-demo__compare">
              <div class="vdom-demo__tree">
                <h4>旧 VDOM</h4>
                <ul>
                  <li v-for="node in oldVdomTree" :key="node.key">{{ node.key }} - {{ node.text }}</li>
                </ul>
              </div>
              <div class="vdom-demo__tree">
                <h4>新 VDOM</h4>
                <ul>
                  <li
                    v-for="node in newVdomTree"
                    :key="node.key"
                    :class="{ changed: node.changed }"
                  >
                    {{ node.key }} - {{ node.text }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="vdom-demo__patch">
              <h4>Patch 结果</h4>
              <ul>
                <li v-for="patch in vdomPatchList" :key="patch">{{ patch }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'cli'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">安装命令</span>
          <pre class="vue-lab__code">{{ cliMode === 'vite' ? viteCode : vueCliCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">流程面板</span>
          <div class="cli-demo">
            <div class="cli-demo__switch">
              <button type="button" :class="{ active: cliMode === 'cli' }" @click="cliMode = 'cli'">Vue CLI</button>
              <button type="button" :class="{ active: cliMode === 'vite' }" @click="cliMode = 'vite'">Vite</button>
            </div>
            <div class="cli-demo__terminal">
              <div v-for="line in currentCliLines" :key="line">
                <span class="cli-demo__prompt">$</span> {{ line }}
              </div>
            </div>
            <div class="cli-demo__flow">
              <div
                v-for="step in currentCliSteps"
                :key="step.title"
                class="cli-demo__flow-item"
              >
                <strong>{{ step.title }}</strong>
                <p>{{ step.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'structure'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">项目结构与单文件组件</span>
          <div class="structure-demo">
            <div class="structure-demo__sidebar">
              <button
                v-for="item in structureTabs"
                :key="item.id"
                type="button"
                :class="{ active: structureTab === item.id }"
                @click="structureTab = item.id"
              >
                {{ item.label }}
              </button>
            </div>
            <div class="structure-demo__content">
              <pre class="vue-lab__code">{{ currentStructureCode }}</pre>
              <div v-if="structureTab === 'sfc'" class="structure-demo__sfc">
                <div class="structure-demo__block structure-demo__block--template">template: 结构</div>
                <div class="structure-demo__block structure-demo__block--script">script: 数据与逻辑</div>
                <div class="structure-demo__block structure-demo__block--style">style scoped: 当前组件样式</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'simple-component'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">组件复用代码</span>
          <pre class="vue-lab__code">{{ simpleComponentCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">组件复用效果</span>
          <div class="component-grid">
            <ClickCounter />
            <ClickCounter />
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'data-function'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">正确与错误写法</span>
          <div class="data-demo__code-grid">
            <pre class="vue-lab__code">{{ badDataCode }}</pre>
            <pre class="vue-lab__code">{{ goodDataCode }}</pre>
          </div>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">实例隔离对比</span>
          <div class="data-demo">
            <div>
              <h4>错误示例：共享同一份状态</h4>
              <div class="component-grid">
                <SharedStateCounter />
                <SharedStateCounter />
              </div>
            </div>
            <div>
              <h4>正确示例：每个组件返回自己的数据</h4>
              <div class="component-grid">
                <ClickCounter />
                <ClickCounter />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'local-registration'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">局部注册代码</span>
          <pre class="vue-lab__code">{{ localRegistrationCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">运行效果</span>
          <ParentBox />
        </div>
      </div>

      <div v-else-if="mode === 'global-registration'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">全局注册代码</span>
          <pre class="vue-lab__code">{{ globalRegistrationCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">运行效果</span>
          <div class="global-demo">
            <GlobalInfoAlert title="GlobalAlert" message="这里直接使用全局组件，无需在当前文件 import。" />
            <p>这个组件能直接出现在这里，是因为它在 `main.js` 中被 `app.component()` 全局注册了。</p>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'dynamic-components'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">动态组件代码</span>
          <pre class="vue-lab__code">{{ dynamicComponentCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">切换效果</span>
          <DynamicTabs />
        </div>
      </div>

      <div v-else-if="mode === 'component-events'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">组件事件代码</span>
          <pre class="vue-lab__code">{{ componentEventsCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">鼠标交互效果</span>
          <div class="component-grid">
            <InteractiveCityCard city="南宁" />
            <InteractiveCityCard city="广州" />
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'event-click'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">点击事件代码</span>
          <pre class="vue-lab__code">{{ clickEventCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">实时效果</span>
          <div class="event-demo">
            <button type="button" class="event-demo__primary" @click="displayNumbers">
              Click Me to Add No.
            </button>
            <h3>Add Number {{ clickDemo.num1 }} + {{ clickDemo.num2 }} = {{ clickDemo.total }}</h3>
            <p>最近事件类型：{{ clickDemo.lastEventType || '尚未触发' }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'event-modifiers'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">修饰符代码</span>
          <pre class="vue-lab__code">{{ eventModifiersCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">`.once` 与 `.prevent` 对比</span>
          <div class="event-demo event-demo__stack">
            <div class="event-demo__row">
              <button type="button" class="event-demo__primary" @click.once="onceCount += 1">
                Just once clickable
              </button>
              <button type="button" class="event-demo__secondary" @click="normalCount += 1">
                Click Me anytime
              </button>
            </div>
            <p>`.once` 结果：{{ onceCount }}</p>
            <p>普通 `@click` 结果：{{ normalCount }}</p>
            <div class="event-demo__row">
              <a href="https://www.google.com" target="_blank" class="event-demo__link" @click.prevent="preventClicks += 1">
                Click Me (With .prevent)
              </a>
              <a href="https://www.google.com" target="_blank" class="event-demo__link">
                Click Me (Without .prevent)
              </a>
            </div>
            <p>阻止默认跳转次数：{{ preventClicks }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'event-key'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">键盘修饰符代码</span>
          <pre class="vue-lab__code">{{ keyModifiersCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">键盘事件效果</span>
          <div class="event-demo">
            <h4>Press ENTER after typing</h4>
            <input
              v-model="keyDemo.tempName"
              class="directive-demo__input"
              placeholder="Type your name here and press Enter"
              @keyup.enter="showInputValue"
            >
            <p>Your name: {{ keyDemo.name || '未提交' }}</p>

            <h4>Press Ctrl + Enter</h4>
            <input
              v-model="keyDemo.tempMessage"
              class="directive-demo__input"
              placeholder="Type something and press Ctrl+Enter"
              @keyup.ctrl.enter="showInputValueCtrl"
            >
            <p>Message: {{ keyDemo.message || '未提交' }}</p>

            <div class="key-badge-list">
              <span v-for="badge in keyBadges" :key="badge" class="key-badge">{{ badge }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'event-custom'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">自定义事件代码</span>
          <pre class="vue-lab__code">{{ customEventsCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">子传父通信效果</span>
          <div class="event-demo">
            <p class="event-demo__selected">
              Language displayed: <strong>{{ selectedLanguage || '尚未选择' }}</strong>
            </p>
            <div class="language-grid">
              <LanguageButton
                v-for="item in languages"
                :key="item"
                :item="item"
                @showLanguage="languageDisp"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'event-mouse'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">鼠标事件代码</span>
          <pre class="vue-lab__code">{{ mouseEventsCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">鼠标事件效果</span>
          <div class="component-grid">
            <InteractiveCityCard city="Shanghai" />
            <InteractiveCityCard city="Guangzhou" />
            <InteractiveCityCard city="Shenzhen" />
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'render-vif'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">`v-if` 代码</span>
          <pre class="vue-lab__code">{{ renderVIfCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">条件渲染效果</span>
          <div class="render-demo">
            <button type="button" class="event-demo__primary" @click="renderingState.show = !renderingState.show">Click Me</button>
            <span class="render-demo__flag"><b>{{ renderingState.show }}</b></span>
            <h1 v-if="renderingState.show">This is h1 tag</h1>
            <h2>This is h2 tag (always visible)</h2>
            <p class="render-demo__hint">`v-if` 为 false 时，h1 会被直接移出 DOM。</p>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'render-vif-else'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">`v-if` + `v-else` 代码</span>
          <pre class="vue-lab__code">{{ renderVIfElseCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">切换效果</span>
          <div class="render-demo">
            <button type="button" class="event-demo__primary" @click="renderingState.ifElseShow = !renderingState.ifElseShow">Click Me</button>
            <span class="render-demo__flag"><b>{{ renderingState.ifElseShow }}</b></span>
            <h1 v-if="renderingState.ifElseShow">This is h1 tag</h1>
            <h2 v-else>This is h2 tag</h2>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'render-vshow'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">`v-show` 代码</span>
          <pre class="vue-lab__code">{{ renderVShowCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">`v-if` 与 `v-show` 对比</span>
          <div class="render-demo">
            <button type="button" class="event-demo__primary" @click="renderingState.showWithDisplay = !renderingState.showWithDisplay">Click Me</button>
            <span class="render-demo__flag"><b>{{ renderingState.showWithDisplay }}</b></span>
            <h1 v-if="renderingState.showWithDisplay">This is h1 tag (v-if)</h1>
            <h2 v-else>This is h2 tag (v-else)</h2>
            <div v-show="renderingState.showWithDisplay" class="render-demo__media">
              <b>V-Show:</b>
              <img src="https://picsum.photos/id/10/100/100" width="100" height="100" alt="demo">
            </div>
            <p class="render-demo__hint">图片一直在 DOM 中，只是 `display: none` 被切换。</p>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'render-vfor'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">`v-for` 代码</span>
          <pre class="vue-lab__code">{{ renderVForCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">列表渲染效果</span>
          <div class="render-demo">
            <input
              v-model="renderingState.newFruit"
              class="directive-demo__input"
              placeholder="Enter Fruits Names"
              @keyup.enter="addFruit"
            >
            <h3 v-if="renderingState.fruits.length > 0">Display Fruits Name</h3>
            <ul class="directive-demo__list">
              <li v-for="(fruit, index) in renderingState.fruits" :key="`${fruit}-${index}`" class="directive-demo__item">
                <span>{{ fruit }}</span>
                <strong>#{{ index + 1 }}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'transition-fade'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">Fade Transition 代码</span>
          <pre class="vue-lab__code">{{ fadeTransitionCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">淡入淡出效果</span>
          <div class="transition-demo">
            <button type="button" class="event-demo__primary" @click="transitionState.fadeShow = !transitionState.fadeShow">Click Here</button>
            <transition name="fade-lab">
              <p v-show="transitionState.fadeShow" class="transition-demo__text transition-demo__text--danger">
                This is a Fade Transition Example
              </p>
            </transition>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'transition-shiftx'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">ShiftX Transition 代码</span>
          <pre class="vue-lab__code">{{ shiftXTransitionCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">横向位移效果</span>
          <div class="transition-demo">
            <button type="button" class="event-demo__primary" @click="transitionState.shiftShow = !transitionState.shiftShow">Click Here</button>
            <transition name="shiftx-lab">
              <div v-show="transitionState.shiftShow">
                <img class="transition-demo__image" src="https://picsum.photos/id/20/100/100" alt="shiftx demo">
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'animation-rotate'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">Rotate Animation 代码</span>
          <pre class="vue-lab__code">{{ rotateAnimationCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">3D 旋转效果</span>
          <div class="transition-demo">
            <button type="button" class="event-demo__primary" @click="transitionState.rotateShow = !transitionState.rotateShow">Click Here</button>
            <transition name="rotate-lab">
              <div v-show="transitionState.rotateShow">
                <img class="transition-demo__image" src="https://picsum.photos/id/26/100/100" alt="rotate demo">
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div v-else-if="mode === 'transition-custom'" class="vue-lab">
        <div class="vue-lab__section">
          <span class="vue-lab__label">自定义过渡类代码</span>
          <pre class="vue-lab__code">{{ customTransitionClassCode }}</pre>
        </div>

        <div class="vue-lab__section">
          <span class="vue-lab__label">自定义过渡类效果</span>
          <div class="transition-demo transition-demo--center">
            <button type="button" class="event-demo__primary" @click="transitionState.customShow = !transitionState.customShow">
              <span style="font-size: 20px;">Click Here</span>
            </button>
            <transition
              enter-active-class="animate__animated animate__swing"
              leave-active-class="animate__animated animate__bounceOut"
            >
              <p v-if="transitionState.customShow" class="transition-demo__custom-text">
                <span style="font-size: 25px;">See the animation effect</span>
              </p>
            </transition>
          </div>
        </div>
      </div>

      <div class="vue-lab__tips">
        <span class="vue-lab__label">易错点 / 易混点</span>
        <ul>
          <li v-for="tip in currentTips" :key="tip">{{ tip }}</li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import ClickCounter from './ClickCounter.vue'
import DynamicTabs from './DynamicTabs.vue'
import InteractiveCityCard from './InteractiveCityCard.vue'
import LanguageButton from './LanguageButton.vue'
import ParentBox from './ParentBox.vue'
import SharedStateCounter from './SharedStateCounter.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    required: true,
  },
})

const directiveState = reactive({
  keyword: 'vue',
  category: 'Vue',
  visible: true,
  ifMode: true,
  count: 1,
})

const onceTimestamp = new Date().toLocaleTimeString()

const rooms = [
  { id: 1, name: 'Vue Router', tag: '基础' },
  { id: 2, name: 'Component Props', tag: '常考' },
  { id: 3, name: 'Virtual DOM', tag: '高频' },
]

const filteredRooms = computed(() =>
  rooms.filter((room) =>
    room.name.toLowerCase().includes(directiveState.keyword.toLowerCase()) ||
    room.tag.includes(directiveState.keyword),
  ),
)

const virtualDomUpdated = ref(false)
const currentVdomStep = computed(() => (virtualDomUpdated.value ? 5 : 2))
const virtualDomSteps = [
  'Initial Render',
  'Data Changes',
  'Create New VDOM',
  'Diffing',
  'Patch',
  'DOM in Sync',
]

const oldVdomTree = [
  { key: 'header', text: 'Header' },
  { key: 'list', text: 'Room A, Room B' },
  { key: 'footer', text: 'Footer' },
]

const newVdomTree = computed(() =>
  virtualDomUpdated.value
    ? [
        { key: 'header', text: 'Header', changed: false },
        { key: 'list', text: 'Room A, Room B, Room C', changed: true },
        { key: 'footer', text: 'Updated Footer', changed: true },
      ]
    : oldVdomTree.map((node) => ({ ...node, changed: false })),
)

const vdomPatchList = computed(() =>
  virtualDomUpdated.value
    ? [
        '列表节点新增了 Room C',
        'Footer 文本从 Footer 更新为 Updated Footer',
        'Header 节点未变化，因此无需重新创建',
      ]
    : ['当前是初始渲染状态，还没有产生 patch 更新。'],
)

const toggleVirtualDom = () => {
  virtualDomUpdated.value = !virtualDomUpdated.value
}

const cliMode = ref('cli')
const cliData = {
  cli: {
    lines: [
      'node -v',
      'npm -v',
      'npm install -g @vue/cli',
      'vue create my-vue-project',
      'npm run serve',
      'npm run build',
    ],
    steps: [
      { title: '检查环境', text: '先确认 Node.js 与 npm 已安装。' },
      { title: '全局安装 CLI', text: '通过 @vue/cli 创建传统 Vue CLI 工程。' },
      { title: '创建项目', text: '执行 vue create 并选择预设。' },
      { title: '启动服务', text: '使用 npm run serve 启动开发环境。' },
    ],
  },
  vite: {
    lines: [
      'npm create vue@latest',
      'cd my-vue-project',
      'npm install',
      'npm run dev',
      'npm run build',
    ],
    steps: [
      { title: '创建项目', text: '通过 create-vue 快速生成 Vue 3 + Vite 项目。' },
      { title: '安装依赖', text: '根据模板安装必要包。' },
      { title: '开发运行', text: 'npm run dev 使用 Vite 启动开发服务器。' },
      { title: '生产构建', text: 'npm run build 输出 dist 目录。' },
    ],
  },
}

const currentCliLines = computed(() => cliData[cliMode.value].lines)
const currentCliSteps = computed(() => cliData[cliMode.value].steps)

const structureTab = ref('tree')
const structureTabs = [
  { id: 'tree', label: '项目目录' },
  { id: 'main', label: 'main.js' },
  { id: 'app', label: 'App.vue' },
  { id: 'sfc', label: 'SFC 结构' },
]

const structureCodeMap = {
  tree: `src/
  components/
  views/
  router/
  store/
  App.vue
  main.js
package.json`,
  main: `import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')`,
  app: `&lt;template&gt;
  &lt;router-view /&gt;
&lt;/template&gt;

&lt;script setup&gt;
// 根组件负责承载页面
&lt;/script&gt;`,
  sfc: `&lt;template&gt;
  &lt;div&gt;UI structure&lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
const count = ref(0)
&lt;/script&gt;

&lt;style scoped&gt;
div { color: #1677ff; }
&lt;/style&gt;`,
}

const currentStructureCode = computed(() => structureCodeMap[structureTab.value])

const clickDemo = reactive({
  num1: 50,
  num2: 100,
  total: '',
  lastEventType: '',
})

const displayNumbers = (event) => {
  clickDemo.total = clickDemo.num1 + clickDemo.num2
  clickDemo.lastEventType = event.type
}

const onceCount = ref(0)
const normalCount = ref(0)
const preventClicks = ref(0)

const keyDemo = reactive({
  name: '',
  tempName: '',
  message: '',
  tempMessage: '',
})

const showInputValue = (event) => {
  keyDemo.name = event.target.value
}

const showInputValueCtrl = (event) => {
  keyDemo.message = event.target.value
}

const keyBadges = ['.enter', '.tab', '.delete', '.esc', '.space', '.up', '.down', '.left', '.right']

const languages = ['Java', 'C', 'C++', 'Python', 'JavaScript', 'Angular', 'Data Structure', 'jQuery']
const selectedLanguage = ref('')

const languageDisp = (language) => {
  selectedLanguage.value = language
}

const renderingState = reactive({
  show: true,
  ifElseShow: true,
  showWithDisplay: true,
  fruits: ['Apple', 'Banana'],
  newFruit: '',
})

const addFruit = () => {
  const value = renderingState.newFruit.trim()
  if (!value) return
  renderingState.fruits.push(value)
  renderingState.newFruit = ''
}

const transitionState = reactive({
  fadeShow: true,
  shiftShow: true,
  rotateShow: true,
  customShow: true,
})

const directiveCode = `<input v-model="keyword" :placeholder="searchPlaceholder">
<button @click="count += 1">点击 {{ count }}</button>
<li v-for="room in filteredRooms" :key="room.id">{{ room.name }}</li>
<div v-if="visible">v-if 区域</div>
<div v-show="visible">v-show 区域</div>
<p v-once>首次渲染时间：{{ onceTimestamp }}</p>`

const virtualDomCode = `const oldTree = render(state)
state.rooms.push('Room C')
const newTree = render(state)
const patches = diff(oldTree, newTree)
patch(realDom, patches)`

const vueCliCode = `node -v
npm -v
npm install -g @vue/cli
vue create my-vue-project
npm run serve
npm run build`

const viteCode = `npm create vue@latest
cd my-vue-project
npm install
npm run dev
npm run build`

const simpleComponentCode = `&lt;template&gt;
  &lt;ClickCounter /&gt;
  &lt;ClickCounter /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import ClickCounter from './ClickCounter.vue'
&lt;/script&gt;`

const badDataCode = `// 错误：多个组件实例共享同一个对象
data: {
  count: 0
}`

const goodDataCode = `// 正确：每个组件实例返回新对象
data() {
  return {
    count: 0,
  }
}`

const localRegistrationCode = `import SpecialButton from './SpecialButton.vue'

export default {
  components: {
    SpecialButton,
  },
}`

const globalRegistrationCode = `import { createApp } from 'vue'
import App from './App.vue'
import GlobalInfoAlert from './components/GlobalInfoAlert.vue'

const app = createApp(App)
app.component('GlobalInfoAlert', GlobalInfoAlert)
app.mount('#app')`

const dynamicComponentCode = `import HomePane from './HomePane.vue'
import AboutPane from './AboutPane.vue'
import ContactPane from './ContactPane.vue'

const currentTab = shallowRef(HomePane)

<button @click="currentTab = AboutPane">About</button>
<component :is="currentTab" />`

const componentEventsCode = `&lt;template&gt;
  &lt;div @mouseover="hovered = true" @mouseout="hovered = false"&gt;
    &lt;span :style="{ color: hovered ? '#f5222d' : '#1677ff' }"&gt;
      {{ city }}
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;`

const clickEventCode = `<button @click="displayNumbers">Click Me to Add No.</button>
<h2>Add Number {{ num1 }} + {{ num2 }} = {{ total }}</h2>

methods: {
  displayNumbers(event) {
    this.total = this.num1 + this.num2
    console.log(event)
  }
}`

const eventModifiersCode = `<button @click.once="buttonClickedOnce">Just once clickable</button>
<button @click="buttonClicked">Click Me anytime</button>
<a href="https://google.com" @click.prevent="clickMe">Click Me (With .prevent)</a>`

const keyModifiersCode = `<input @keyup.enter="showInputValue" v-model="tempName">
<input @keyup.ctrl.enter="showInputValueCtrl" v-model="tempMessage">

// 常见键盘修饰符
.enter .tab .delete .esc .space .up .down .left .right`

const customEventsCode = `// Child
<button @click="$emit('showLanguage', item)">{{ item }}</button>

// Parent
<LanguageButton
  v-for="item in languages"
  :key="item"
  :item="item"
  @showLanguage="languageDisp"
/>`

const mouseEventsCode = `<div @mouseover="handleMouseOver" @mouseout="handleMouseOut">
  <span :style="{ color: textColor }">{{ cityName }}</span>
  <p v-if="isHovered">Mouse is over me!</p>
</div>`

const renderVIfCode = `<button @click="show = !show">Click Me</button>
<h1 v-if="show">This is h1 tag</h1>
<h2>This is h2 tag (always visible)</h2>`

const renderVIfElseCode = `<button @click="show = !show">Click Me</button>
<h1 v-if="show">This is h1 tag</h1>
<h2 v-else>This is h2 tag</h2>`

const renderVShowCode = `<button @click="show = !show">Click Me</button>
<h1 v-if="show">This is h1 tag (v-if)</h1>
<h2 v-else>This is h2 tag (v-else)</h2>
<div v-show="show">
  <img src="demo.jpg" width="100" height="100">
</div>`

const renderVForCode = `<input @keyup.enter="showinputvalue" v-model="newFruit">
<ul>
  <li v-for="(item, index) in items" :key="index">{{ item }}</li>
</ul>`

const fadeTransitionCode = `<transition name="fade">
  <p v-show="show">This is a Fade Transition Example</p>
</transition>

.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}`

const shiftXTransitionCode = `<transition name="shiftx">
  <div v-show="show">
    <img src="demo.jpg">
  </div>
</transition>

.shiftx-enter-active, .shiftx-leave-active {
  transition: all 2s ease-in-out;
}`

const rotateAnimationCode = `<transition name="shiftx">
  <div v-show="show">
    <img src="demo.jpg">
  </div>
</transition>

@keyframes shift-in {
  0% { transform: rotateX(0deg); opacity: 0; }
  100% { transform: rotateX(360deg); opacity: 1; }
}`

const customTransitionClassCode = `<transition
  enter-active-class="animate__animated animate__swing"
  leave-active-class="animate__animated animate__bounceOut"
>
  <p v-if="show">See the animation effect</p>
</transition>`

const tipsMap = {
  directives: [
    '`v-if` 会真正创建和销毁节点，`v-show` 只控制 CSS 显隐。',
    '`v-for` 必须配合稳定的 `:key`，不要随手用索引应付所有场景。',
    '`v-once` 只渲染一次，后续数据更新不会再同步。',
  ],
  'virtual-dom': [
    'Virtual DOM 不是不操作真实 DOM，而是先比较再最小化更新。',
    'Diff 发生在新旧 VDOM 之间，Patch 才真正作用到真实 DOM。',
  ],
  cli: [
    'Vue CLI 和 Vite 都能创建 Vue 项目，但默认构建链路不同。',
    'Vite 开发体验通常更轻更快，CLI 在老教程里仍很常见。',
  ],
  structure: [
    '`App.vue` 是根组件，`main.js` 是入口文件，两者职责不要混淆。',
    '`scoped` 只限制当前组件样式作用域，不会隔离全局样式文件。',
  ],
  'simple-component': [
    '同一个组件被多次复用时，每个实例通常维护自己的状态。',
    '复用组件的关键是可重复、可组合，而不是复制粘贴模板。',
  ],
  'data-function': [
    '组件里 `data` 必须是函数，避免多个实例共享同一对象引用。',
    '根实例和组件实例在 `data` 写法要求上最容易混淆。',
  ],
  'local-registration': [
    '局部注册后只能在当前组件内使用，别的页面不能直接拿来用。',
    '局部注册适合业务组件，能避免全局命名污染。',
  ],
  'global-registration': [
    '全局注册省去重复 import，但也会扩大组件作用域。',
    '不要把所有业务组件都全局注册，基础通用组件更适合这样做。',
  ],
  'dynamic-components': [
    '`<component :is>`` 切换的是组件本身，不是简单切换字符串 HTML。',
    '动态组件很适合标签页、步骤条和无路由的多视图切换。',
  ],
  'component-events': [
    '每个组件实例的 hover 状态都应独立，不要共用全局变量。',
    '`@mouseover` 和 `@mouseout` 常配合响应式数据切换视觉状态。',
  ],
  'event-click': [
    '`v-on:click` 和 `@click` 完全等价，后者只是简写。',
    '事件方法可以接收原生 DOM event 对象，不要和业务参数混淆。',
  ],
  'event-modifiers': [
    '`.once` 只执行一次，后续点击不会再触发同一个处理函数。',
    '`.prevent` 会自动调用 `event.preventDefault()`，常用于链接和表单。',
  ],
  'event-key': [
    '键盘修饰符只在对应按键组合触发时才执行方法。',
    '`@keyup.ctrl.enter` 是组合修饰符，不等于单独按 Enter。',
  ],
  'event-custom': [
    '子组件通过 `$emit` 向父组件发事件，这是标准的子传父通信方式。',
    '事件名和父组件监听名必须对应，否则父组件收不到数据。',
  ],
  'event-mouse': [
    'Vue 可以监听任意 DOM 事件，鼠标事件只是其中一类。',
    '鼠标移入移出常配合响应式状态切换文字、颜色和提示内容。',
  ],
  'render-vif': [
    '`v-if` 条件为 false 时，节点会从 DOM 中被真正移除。',
    '`v-if` 适合切换频率不高、创建销毁成本可接受的场景。',
  ],
  'render-vif-else': [
    '`v-else` 必须紧跟在 `v-if` 或 `v-else-if` 后面，中间不能插别的节点。',
    '这类写法适合在两个互斥内容之间切换显示。',
  ],
  'render-vshow': [
    '`v-show` 不移除 DOM，只切换 `display`。',
    '频繁切换显示状态时，`v-show` 通常比 `v-if` 更合适。',
  ],
  'render-vfor': [
    '`v-for` 渲染列表时应提供稳定的 `:key`，方便 Vue 跟踪节点。',
    '往数组里 push 新值后，列表会自动响应式更新。',
  ],
  'transition-fade': [
    '`<transition>` 需要配合 CSS 过渡类名一起使用。',
    '淡入淡出通常通过 `opacity` 从 0 到 1 的变化实现。',
  ],
  'transition-shiftx': [
    '位移动画常结合 `transform: translateX(...)` 和 `opacity` 一起使用。',
    '进入和离开阶段都可以应用同一组过渡规则。',
  ],
  'animation-rotate': [
    '复杂动画可以通过 `@keyframes` 定义多阶段关键帧。',
    '进入正放、离开反放是一种很常见的动画设计思路。',
  ],
  'transition-custom': [
    'Vue 支持 `enter-active-class` 和 `leave-active-class` 这类自定义过渡类。',
    '接第三方动画库时，不一定要自己写完整动画 CSS。',
  ],
}

const currentTips = computed(() => tipsMap[props.mode] ?? [])
</script>

<style scoped>
.vue-advanced-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.vue-advanced-card__header h3 {
  margin: 0;
  font-size: 20px;
}

.vue-advanced-card__header p {
  margin: 6px 0 0;
  font-size: 14px;
  color: #606266;
}

.vue-advanced-card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.vue-lab {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.vue-lab__section,
.vue-lab__tips {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #d9ecff;
  background: #fbfdff;
}

.vue-lab__tips {
  border-color: #ffd591;
  background: #fff7e6;
}

.vue-lab__label {
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e6f4ff;
  color: #1677ff;
  font-size: 13px;
  font-weight: 700;
}

.vue-lab__tips .vue-lab__label {
  background: #ffe7ba;
  color: #ad6800;
}

.vue-lab__code {
  margin: 0;
  padding: 14px;
  border-radius: 12px;
  background: #0f172a;
  color: #e2e8f0;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.7;
  font-family: Consolas, monospace;
  white-space: pre-wrap;
}

.directive-demo,
.vdom-demo,
.cli-demo,
.structure-demo,
.data-demo,
.global-demo,
.event-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.directive-demo__toolbar,
.cli-demo__switch {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.directive-demo__toggle,
.vdom-demo__actions button,
.cli-demo__switch button,
.structure-demo__sidebar button {
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background: #fff;
  padding: 8px 14px;
  cursor: pointer;
}

.cli-demo__switch button.active,
.structure-demo__sidebar button.active {
  background: #1677ff;
  color: #fff;
  border-color: #1677ff;
}

.directive-demo__grid,
.vdom-demo__compare,
.data-demo__code-grid,
.component-grid,
.structure-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.directive-demo__panel,
.vdom-demo__tree,
.vdom-demo__patch,
.cli-demo__flow-item,
.global-demo,
.structure-demo__content {
  padding: 14px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5f3ff;
}

.directive-demo__panel h4,
.vdom-demo__tree h4,
.vdom-demo__patch h4,
.data-demo h4 {
  margin: 0 0 10px;
}

.directive-demo__input,
.directive-demo__select {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  margin-bottom: 10px;
}

.directive-demo__list,
.vdom-demo__tree ul,
.vdom-demo__patch ul,
.vue-lab__tips ul {
  margin: 0;
  padding-left: 18px;
}

.directive-demo__item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 8px;
  background: #f5f7fa;
}

.directive-demo__item + .directive-demo__item {
  margin-top: 8px;
}

.directive-demo__badge {
  padding: 12px;
  border-radius: 10px;
  background: #e6f4ff;
  color: #1677ff;
}

.directive-demo__badge--success {
  background: #f6ffed;
  color: #389e0d;
}

.directive-demo__badge--ghost {
  background: #f5f5f5;
  color: #8c8c8c;
}

.directive-demo__once,
.directive-demo__hint {
  color: #8c8c8c;
  font-size: 13px;
}

.vdom-demo__steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.vdom-demo__step {
  padding: 10px 12px;
  border-radius: 10px;
  background: #f5f7fa;
  color: #8c8c8c;
  text-align: center;
  font-weight: 600;
}

.vdom-demo__step.active {
  background: #1677ff;
  color: #fff;
}

.vdom-demo__tree li.changed {
  color: #cf1322;
  font-weight: 700;
}

.cli-demo__terminal {
  padding: 14px;
  border-radius: 12px;
  background: #111827;
  color: #e5e7eb;
  font-family: Consolas, monospace;
  line-height: 1.8;
}

.cli-demo__prompt {
  color: #95de64;
}

.cli-demo__flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.cli-demo__flow-item p,
.global-demo p {
  margin: 8px 0 0;
  color: #606266;
}

.structure-demo__sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.structure-demo__sfc {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.structure-demo__block {
  padding: 12px 14px;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
}

.structure-demo__block--template {
  background: #1677ff;
}

.structure-demo__block--script {
  background: #722ed1;
}

.structure-demo__block--style {
  background: #52c41a;
}

.data-demo {
  gap: 20px;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.event-demo__primary,
.event-demo__secondary {
  border: 0;
  border-radius: 8px;
  color: #fff;
  padding: 10px 16px;
  cursor: pointer;
}

.event-demo__primary {
  background: #2196f3;
}

.event-demo__secondary {
  background: #67c23a;
}

.event-demo__stack {
  gap: 18px;
}

.event-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.event-demo__link {
  color: #4caf50;
  font-size: 18px;
  text-decoration: none;
}

.key-badge-list,
.language-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.key-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #f5f7fa;
  color: #606266;
  font-size: 13px;
  font-weight: 700;
}

.event-demo__selected {
  font-size: 20px;
  color: #303133;
}

.render-demo,
.transition-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.render-demo__flag {
  font-size: 24px;
  color: #1677ff;
}

.render-demo__hint {
  color: #8c8c8c;
  font-size: 13px;
}

.render-demo__media {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f6ffed;
}

.transition-demo__text {
  display: inline-block;
  padding: 16px 18px;
  border-radius: 12px;
  background: #fff1f0;
}

.transition-demo__text--danger {
  color: #f5222d;
  font-size: 28px;
}

.transition-demo__image {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
}

.transition-demo--center {
  align-items: center;
  text-align: center;
}

.transition-demo__custom-text {
  display: inline-block;
  margin-top: 20px;
  padding: 20px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.fade-lab-enter-active,
.fade-lab-leave-active {
  transition: opacity 3s;
}

.fade-lab-enter-from,
.fade-lab-leave-to {
  opacity: 0;
}

.shiftx-lab-enter-active,
.shiftx-lab-leave-active {
  transition: all 2s ease-in-out;
}

.shiftx-lab-enter-from,
.shiftx-lab-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.rotate-lab-enter-active {
  animation: rotate-lab-in 2s;
}

.rotate-lab-leave-active {
  animation: rotate-lab-in 2s reverse;
}

@keyframes rotate-lab-in {
  0% {
    transform: rotateX(0deg);
    opacity: 0;
  }

  25% {
    transform: rotateX(90deg);
    opacity: 0.25;
  }

  50% {
    transform: rotateX(120deg);
    opacity: 0.5;
  }

  75% {
    transform: rotateX(180deg);
    opacity: 0.75;
  }

  100% {
    transform: rotateX(360deg);
    opacity: 1;
  }
}

.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animate__swing {
  transform-origin: top center;
  animation-name: swing-lab;
}

.animate__bounceOut {
  animation-name: bounce-out-lab;
}

@keyframes swing-lab {
  20% { transform: rotate3d(0, 0, 1, 12deg); }
  40% { transform: rotate3d(0, 0, 1, -10deg); }
  60% { transform: rotate3d(0, 0, 1, 5deg); }
  80% { transform: rotate3d(0, 0, 1, -5deg); }
  100% { transform: rotate3d(0, 0, 1, 0deg); }
}

@keyframes bounce-out-lab {
  20% { transform: scale3d(0.9, 0.9, 0.9); }
  50%, 55% { opacity: 1; transform: scale3d(1.1, 1.1, 1.1); }
  100% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
}

@media (max-width: 768px) {
  .vue-advanced-card__header {
    flex-direction: column;
  }
}
</style>

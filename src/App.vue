<script setup>
import { computed, nextTick, ref } from 'vue'
import { bilingualTopicContent } from './bilingualTopicContent'
import { buildChapterPracticeMap, buildChapterQuestionBankMap } from './chapterPractice'
import CodePlayground from './components/CodePlayground.vue'
import DemoRenderer from './components/DemoRenderer.vue'
import PracticeGame from './components/PracticeGame.vue'
import QuestionBank from './components/QuestionBank.vue'
import { knowledgeExampleMap } from './knowledgeExamples'
import { flattenTopics, reviewTree } from './reviewTreeData'

const flatTopics = flattenTopics(reviewTree)
const chapterPracticeMap = buildChapterPracticeMap(reviewTree)
const chapterQuestionBankMap = buildChapterQuestionBankMap(reviewTree)
const selectedTopicId = ref(flatTopics[0].id)
const currentView = ref('topic')
const selectedChapterId = ref(flatTopics[0].chapterId)
const openChapterIds = reviewTree.map((chapter) => chapter.id)
const searchKeyword = ref('')

const selectedTopic = computed(
  () => flatTopics.find((topic) => topic.id === selectedTopicId.value) ?? flatTopics[0],
)

const selectedPractice = computed(
  () => chapterPracticeMap[selectedChapterId.value] ?? chapterPracticeMap[reviewTree[0].id],
)

const selectedQuestionBank = computed(
  () => chapterQuestionBankMap[selectedChapterId.value] ?? chapterQuestionBankMap[reviewTree[0].id],
)

const activeMenuIndex = computed(() =>
  currentView.value === 'practice'
    ? `practice:${selectedChapterId.value}`
    : currentView.value === 'bank'
      ? `bank:${selectedChapterId.value}`
      : currentView.value === 'playground'
        ? 'playground'
      : selectedTopicId.value,
)

const selectedTopicBilingual = computed(
  () => bilingualTopicContent[selectedTopic.value.id] ?? { introOriginal: '', knowledgeOriginal: [] },
)

const selectedKnowledgeItems = computed(() =>
  selectedTopic.value.knowledge.map((text, index) => ({
    original: selectedTopicBilingual.value.knowledgeOriginal[index] ?? '',
    translation: text,
    text,
    example: knowledgeExampleMap[selectedTopic.value.id]?.[index] ?? {
      type: 'html',
      title: `知识点 ${index + 1} 示例`,
      description: '该小点暂未单独配置专用组件，先用最小实例帮助记忆。',
      initialLine: `<pre>${text}</pre>`,
      height: '140px',
    },
  })),
)

const normalizeText = (value) => String(value || '').toLowerCase()

const topicMatchesKeyword = (topic, keyword) => {
  const normalizedKeyword = normalizeText(keyword).trim()
  if (!normalizedKeyword) return true

  const searchFields = [
    topic.title,
    topic.intro,
    ...(topic.knowledge ?? []),
    ...(topic.mistakes ?? []),
    ...(topic.demos ?? []).flatMap((demo) => [demo.title, demo.description, demo.initialLine, demo.initialCode, demo.initialRule, demo.initialHtml]),
    ...(bilingualTopicContent[topic.id]?.knowledgeOriginal ?? []),
    bilingualTopicContent[topic.id]?.introOriginal,
  ]

  return searchFields.some((field) => normalizeText(field).includes(normalizedKeyword))
}

const filteredReviewTree = computed(() => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) return reviewTree

  return reviewTree
    .map((chapter) => {
      const matchedChildren = chapter.children.filter((topic) => {
        const chapterHit = normalizeText(chapter.title).includes(normalizeText(keyword))
        return chapterHit || topicMatchesKeyword(topic, keyword)
      })

      return {
        ...chapter,
        children: matchedChildren,
      }
    })
    .filter((chapter) => chapter.children.length > 0)
})

const searchMatchCount = computed(() =>
  filteredReviewTree.value.reduce((count, chapter) => count + chapter.children.length, 0),
)

const selectTopic = async (id) => {
  currentView.value = 'topic'
  selectedTopicId.value = id
  selectedChapterId.value = flatTopics.find((topic) => topic.id === id)?.chapterId ?? selectedChapterId.value
  await nextTick()
  document.querySelector('.doc-main')?.scrollTo({ top: 0, behavior: 'smooth' })
}

const openPractice = async (chapterId) => {
  currentView.value = 'practice'
  selectedChapterId.value = chapterId
  await nextTick()
  document.querySelector('.doc-main')?.scrollTo({ top: 0, behavior: 'smooth' })
}

const openQuestionBank = async (chapterId) => {
  currentView.value = 'bank'
  selectedChapterId.value = chapterId
  await nextTick()
  document.querySelector('.doc-main')?.scrollTo({ top: 0, behavior: 'smooth' })
}

const openCodePlayground = async () => {
  currentView.value = 'playground'
  await nextTick()
  document.querySelector('.doc-main')?.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToDemo = async (index) => {
  await nextTick()
  document.getElementById(`demo-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="doc-shell">
    <aside class="doc-sidebar">
      <div class="doc-sidebar__brand">
        <div class="doc-sidebar__title">Final Review Notes</div>
        <p>按 PDF 完整拆解的前端复习导航</p>
      </div>

      <div class="doc-sidebar__link">
        <a href="https://www.programmercarl.com/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E9%80%92%E5%BD%92%E9%81%8D%E5%8E%86.html#%E6%80%9D%E8%B7%AF" target="_blank" rel="noreferrer">
          参考目录风格
        </a>
      </div>

      <button type="button" class="doc-sidebar__playground-entry" @click="openCodePlayground">
        新增功能：代码练习板
      </button>

      <div class="doc-sidebar__search">
        <el-input
          v-model="searchKeyword"
          clearable
          placeholder="搜索标签/关键字，如 div、meta、iframe、v-model"
        />
        <p v-if="searchKeyword.trim()" class="doc-sidebar__search-tip">
          共找到 {{ searchMatchCount }} 个匹配小节
        </p>
      </div>

      <el-menu
        :default-openeds="openChapterIds"
        :default-active="activeMenuIndex"
        class="doc-menu"
      >
        <el-sub-menu
          v-for="chapter in filteredReviewTree"
          :key="chapter.id"
          :index="chapter.id"
        >
          <template #title>
            <span>{{ chapter.title }}</span>
          </template>
          <el-menu-item
            v-for="topic in chapter.children"
            :key="topic.id"
            :index="topic.id"
            @click="selectTopic(topic.id)"
          >
            {{ topic.title }}
          </el-menu-item>
          <el-menu-item
            :index="`practice:${chapter.id}`"
            class="doc-menu__practice"
            @click="openPractice(chapter.id)"
          >
            练一练
          </el-menu-item>
          <el-menu-item
            :index="`bank:${chapter.id}`"
            class="doc-menu__practice"
            @click="openQuestionBank(chapter.id)"
          >
            章节题库
          </el-menu-item>
        </el-sub-menu>
      </el-menu>

      <div v-if="searchKeyword.trim() && !searchMatchCount" class="doc-sidebar__empty">
        <strong>没有找到匹配内容</strong>
        <p>可以试试搜索 `div`、`img`、`meta`、`table`、`iframe`、`v-model`。</p>
      </div>
    </aside>

    <main class="doc-main">
      <transition name="fade-slide" mode="out-in">
        <PracticeGame
          v-if="currentView === 'practice'"
          :key="`practice-${selectedPractice?.chapterId}`"
          :practice="selectedPractice"
        />

        <QuestionBank
          v-else-if="currentView === 'bank'"
          :key="`bank-${selectedQuestionBank?.chapterId}`"
          :question-bank="selectedQuestionBank"
        />

        <CodePlayground
          v-else-if="currentView === 'playground'"
          key="code-playground"
        />

        <div v-else :key="`topic-${selectedTopic.id}`" class="doc-topic-wrapper">
          <header class="doc-header">
        <div>
          <h1>{{ selectedTopic.title }}</h1>
          <div class="doc-header__intro">
            <div class="doc-bilingual">
              <span class="doc-bilingual__label">Original</span>
              <p>{{ selectedTopicBilingual.introOriginal }}</p>
            </div>
            <div class="doc-bilingual doc-bilingual--translation">
              <span class="doc-bilingual__label">翻译</span>
              <p>{{ selectedTopic.intro }}</p>
            </div>
          </div>
        </div>
        <div class="doc-header__meta">
          <el-tag type="primary">{{ selectedTopic.chapterTitle }}</el-tag>
          <el-tag type="success">{{ selectedTopic.demos.length }} 个演示</el-tag>
        </div>
      </header>

      <section class="doc-section">
        <el-card shadow="hover">
          <template #header>
            <div class="doc-section__header">
              <span>知识点逐条实例</span>
            </div>
          </template>
          <div class="knowledge-point-list">
            <div
              v-for="(item, index) in selectedKnowledgeItems"
              :key="`${selectedTopic.id}-knowledge-${index}`"
              class="knowledge-point"
            >
              <div class="knowledge-point__meta">
                <el-tag type="success">小点 {{ index + 1 }}</el-tag>
                <div class="knowledge-point__text">
                  <div v-if="item.original" class="doc-bilingual doc-bilingual--light">
                    <span class="doc-bilingual__label">Original</span>
                    <p>{{ item.original }}</p>
                  </div>
                  <div class="doc-bilingual doc-bilingual--translation doc-bilingual--light">
                    <span class="doc-bilingual__label">翻译</span>
                    <p>{{ item.translation }}</p>
                  </div>
                </div>
              </div>
              <DemoRenderer :demo="item.example" />
            </div>
          </div>
        </el-card>
      </section>

      <section class="doc-section">
        <el-card shadow="hover">
          <template #header>
            <div class="doc-section__header">
              <span>易错点与易混淆点</span>
            </div>
          </template>
          <ul class="doc-list doc-list--warning">
            <li v-for="item in selectedTopic.mistakes" :key="item">{{ item }}</li>
          </ul>
        </el-card>
      </section>

      <section v-if="selectedTopic.demos.length" class="doc-section">
        <el-card shadow="hover">
          <template #header>
            <div class="doc-section__header">
              <span>演示目录</span>
            </div>
          </template>
          <div class="demo-anchor-list">
            <button
              v-for="(demo, index) in selectedTopic.demos"
              :key="`${selectedTopic.id}-${index}`"
              type="button"
              @click="scrollToDemo(index)"
            >
              {{ demo.title || `演示 ${index + 1}` }}
            </button>
          </div>
        </el-card>
      </section>

      <section class="doc-demo-list">
        <div
          v-for="(demo, index) in selectedTopic.demos"
          :id="`demo-${index}`"
          :key="`${selectedTopic.id}-${index}`"
          class="doc-demo-item"
        >
          <DemoRenderer :demo="demo" />
        </div>
      </section>
        </div>
      </transition>
    </main>
  </div>
</template>

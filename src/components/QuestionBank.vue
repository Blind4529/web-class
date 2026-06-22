<template>
  <div class="bank-page">
    <section class="bank-hero">
      <div>
        <p class="bank-hero__eyebrow">章节题库</p>
        <h1>{{ questionBank.chapterTitle }}</h1>
        <p class="bank-hero__desc">
          按章节整理本章全部题目，不再以小游戏闯关方式展示。你可以切换选择、填空、代码补全和简答题模式，逐题练习并对照参考答案复习。
        </p>
      </div>
      <div class="bank-hero__meta">
        <span>{{ activeQuestionCount }} 题</span>
        <span>{{ difficultyLabel }}</span>
      </div>
    </section>

    <section class="bank-layout">
      <aside class="bank-sidebar">
        <div class="bank-card">
          <div class="bank-card__header">
            <h2>题库模式</h2>
          </div>
          <div class="bank-mode-switch">
            <button
              v-for="mode in difficultyList"
              :key="mode.value"
              type="button"
              :class="{ active: difficulty === mode.value }"
              @click="changeDifficulty(mode.value)"
            >
              {{ mode.label }}
            </button>
          </div>
          <p class="bank-mode-desc">{{ modeDescription }}</p>
        </div>

        <div class="bank-card">
          <div class="bank-card__header">
            <h2>当前进度</h2>
          </div>
          <div class="bank-stat-list">
            <div class="bank-stat">
              <span>{{ primaryStatLabel }}</span>
              <strong>{{ submittedCount }}/{{ activeQuestionCount }}</strong>
            </div>
            <div class="bank-stat">
              <span>{{ secondaryStatLabel }}</span>
              <strong>{{ correctCount }}/{{ activeQuestionCount }}</strong>
            </div>
            <div class="bank-stat">
              <span>{{ percentStatLabel }}</span>
              <strong>{{ accuracyPercent }}%</strong>
            </div>
          </div>
          <div class="bank-progress">
            <div class="bank-progress__bar">
              <div class="bank-progress__fill" :style="{ width: `${accuracyPercent}%` }"></div>
            </div>
          </div>
        </div>

        <div class="bank-card">
          <div class="bank-card__header">
            <h2>题库操作</h2>
          </div>
          <div class="bank-actions">
            <button type="button" class="bank-primary" @click="toggleRevealAll">
              {{ revealAll ? '收起全部答案' : '展开全部答案' }}
            </button>
            <button type="button" class="bank-ghost" @click="resetCurrentDifficulty">
              清空当前模式作答
            </button>
          </div>
        </div>

        <div class="bank-card">
          <div class="bank-card__header">
            <h2>快速定位</h2>
          </div>
          <div class="bank-jump-list">
            <button
              v-for="(question, index) in activeQuestions"
              :key="question.id"
              type="button"
              class="bank-jump"
              :class="{ 'bank-jump--ok': currentDifficultySubmissions[question.id]?.correct }"
              @click="scrollToQuestion(question.id)"
            >
              {{ index + 1 }}. {{ question.shortTopicTitle }}
            </button>
          </div>
        </div>
      </aside>

      <section class="bank-main">
        <article
          v-for="(question, index) in activeQuestions"
          :id="`bank-question-${question.id}`"
          :key="question.id"
          class="bank-question"
        >
          <div class="bank-question__top">
            <div>
              <div class="bank-question__index-row">
                <span class="bank-question__index">{{ question.originalNumber || index + 1 }}</span>
                <span v-if="question.sourceLabel" class="bank-chip bank-chip--reference">{{ question.sourceLabel }}</span>
                <span v-if="Number.isInteger(question.knowledgeIndex)" class="bank-chip bank-chip--soft">知识点 {{ question.knowledgeIndex + 1 }}</span>
              </div>
              <h3>{{ question.prompt || getPrompt(question, index) }}</h3>
            </div>
            <div
              v-if="currentDifficultySubmissions[question.id]"
              class="bank-result"
              :class="{
                'bank-result--ok': currentDifficultySubmissions[question.id]?.correct,
                'bank-result--bad': !currentDifficultySubmissions[question.id]?.correct,
              }"
            >
              {{ currentDifficultySubmissions[question.id]?.correct ? '正确' : '错误' }}
            </div>
          </div>

          <template v-if="difficulty === 'easy'">
            <div class="bank-option-list">
              <button
                v-for="option in question.options"
                :key="option"
                type="button"
                class="bank-option"
                :class="easyOptionClass(question, option)"
                @click="submitEasy(question, option)"
              >
                {{ option }}
              </button>
            </div>
          </template>

          <template v-else-if="difficulty === 'medium'">
            <div class="bank-input-group">
              <input
                v-model="mediumInputs[question.id]"
                class="bank-input"
                placeholder="请输入本题核心关键词"
                @keyup.enter="submitMedium(question)"
              >
              <button type="button" class="bank-primary" @click="submitMedium(question)">提交</button>
            </div>
          </template>

          <template v-else-if="difficulty === 'short'">
            <textarea
              v-model="shortInputs[question.id]"
              class="bank-textarea"
              placeholder="请用自己的话作答，尽量写出作用、用法和一个简单示例"
            ></textarea>
            <div class="bank-actions bank-actions--inline">
              <button type="button" class="bank-primary" @click="submitShort(question)">提交简答</button>
              <button type="button" class="bank-ghost" @click="toggleReveal(question.id)">
                {{ isRevealed(question.id) ? '收起参考答案' : '查看参考答案' }}
              </button>
            </div>
          </template>

          <template v-else>
            <div class="bank-code">
              <span class="bank-code__label">前提代码</span>
              <pre>{{ question.starterCode }}</pre>
            </div>
            <textarea
              v-model="hardInputs[question.id]"
              class="bank-textarea"
              placeholder="请输入你补全后的代码"
            ></textarea>
            <div class="bank-actions bank-actions--inline">
              <button type="button" class="bank-primary" @click="submitHard(question)">检查答案</button>
              <button type="button" class="bank-ghost" @click="toggleReveal(question.id)">
                {{ isRevealed(question.id) ? '收起答案' : '查看答案' }}
              </button>
            </div>
          </template>

          <div
            v-if="currentDifficultySubmissions[question.id]"
            class="bank-feedback"
            :class="{
              'bank-feedback--ok': currentDifficultySubmissions[question.id]?.correct,
              'bank-feedback--bad': !currentDifficultySubmissions[question.id]?.correct,
            }"
          >
            <strong>{{ currentDifficultySubmissions[question.id]?.correct ? '回答正确' : '还可以再想想' }}</strong>
            <p>{{ currentDifficultySubmissions[question.id]?.message }}</p>
          </div>

          <div v-if="isRevealed(question.id)" class="bank-answer">
            <div class="bank-answer__header">
              <h4>答案与参考</h4>
            </div>
            <p><strong>知识点标签：</strong><span class="bank-chip">{{ question.shortTopicTitle }}</span></p>
            <p class="bank-question__knowledge"><strong>知识点说明：</strong>{{ question.knowledgeText }}</p>
            <div v-if="difficulty === 'short' && question.originalPrompt" class="bank-source-note">
              <strong>对应原题：</strong>{{ question.originalPrompt }}
            </div>
            <template v-if="difficulty === 'short'">
              <div class="bank-code">
                <span class="bank-code__label">参考作答</span>
                <pre>{{ question.sampleAnswer || question.answer }}</pre>
              </div>
            </template>
            <template v-else>
              <p><strong>标准答案：</strong>{{ question.answer }}</p>
              <p><strong>示例标题：</strong>{{ question.exampleTitle }}</p>
            </template>
            <div class="bank-code">
              <span class="bank-code__label">参考代码</span>
              <pre>{{ question.referenceCode || '该题暂无代码示例' }}</pre>
            </div>
          </div>
        </article>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { validateHardAnswer } from '../chapterPractice'

const props = defineProps({
  questionBank: {
    type: Object,
    required: true,
  },
})

const difficultyList = [
  { value: 'easy', label: '简单题库' },
  { value: 'medium', label: '中等题库' },
  { value: 'hard', label: '困难题库' },
  { value: 'short', label: '简答题库' },
]

const difficulty = ref('easy')
const revealAll = ref(false)

const submissions = reactive({
  easy: {},
  medium: {},
  hard: {},
  short: {},
})

const mediumInputs = reactive({})
const hardInputs = reactive({})
const shortInputs = reactive({})
const revealedAnswers = reactive({})

const currentDifficultySubmissions = computed(() => submissions[difficulty.value])
const activeQuestions = computed(() =>
  difficulty.value === 'short'
    ? props.questionBank.shortAnswerQuestions ?? []
    : props.questionBank.questions ?? [],
)
const activeQuestionCount = computed(() => activeQuestions.value.length)

const difficultyLabel = computed(
  () => difficultyList.find((item) => item.value === difficulty.value)?.label ?? '简单题库',
)

const modeDescription = computed(() => {
  if (difficulty.value === 'easy') return '简单模式按选择题展示，适合快速扫知识点。'
  if (difficulty.value === 'medium') return '中等模式按填空题展示，适合记忆关键词和语法。'
  if (difficulty.value === 'short') return '简答模式按章节自动整理 20 道简答题，适合系统复述知识点。'
  return '困难模式按代码补全展示，适合结合示例进行应用训练。'
})

const primaryStatLabel = computed(() => (difficulty.value === 'short' ? '已提交' : '已作答'))
const secondaryStatLabel = computed(() => (difficulty.value === 'short' ? '已完成' : '答对'))
const percentStatLabel = computed(() => (difficulty.value === 'short' ? '完成率' : '正确率'))

const submittedCount = computed(
  () => Object.keys(currentDifficultySubmissions.value).length,
)

const correctCount = computed(
  () => Object.values(currentDifficultySubmissions.value).filter((item) => item?.correct).length,
)

const accuracyPercent = computed(() => {
  if (activeQuestionCount.value === 0) return 0
  return Math.round((correctCount.value / activeQuestionCount.value) * 100)
})

const getPrompt = (question, index) => {
  if (difficulty.value === 'easy') {
    return `${index + 1}. 以下哪个关键词或语法最适合实现该功能？`
  }
  if (difficulty.value === 'medium') {
    return `${index + 1}. 请填写实现该功能最关键的核心词。`
  }
  if (difficulty.value === 'short') {
    return `${index + 1}. 请围绕本题知识点做简答说明。`
  }
  return `${index + 1}. 请根据知识点补全下面这段程序。`
}

const setFeedback = (mode, questionId, correct, message, value) => {
  submissions[mode][questionId] = { correct, message, value }
}

const submitEasy = (question, option) => {
  const correct = option === question.answer
  setFeedback(
    'easy',
    question.id,
    correct,
    correct ? `已选中正确答案：${option}` : `你选择的是 ${option}，正确答案应与该知识点的核心语法一致。`,
    option,
  )
}

const submitMedium = (question) => {
  const value = String(mediumInputs[question.id] || '').trim()
  const correct = value.toLowerCase() === question.answer.toLowerCase()
  setFeedback(
    'medium',
    question.id,
    correct,
    correct ? `填写正确：${value}` : `你填写的是 ${value || '空答案'}，建议回忆本题对应的核心关键词。`,
    value,
  )
}

const submitHard = (question) => {
  const value = String(hardInputs[question.id] || '').trim()
  const correct = validateHardAnswer(value, question)
  setFeedback(
    'hard',
    question.id,
    correct,
    correct ? '代码已覆盖本题关键点。' : '当前代码还没有完整体现本题需要的关键实现。',
    value,
  )
}

const submitShort = (question) => {
  const value = String(shortInputs[question.id] || '').trim()
  const completed = Boolean(value)
  setFeedback(
    'short',
    question.id,
    completed,
    completed ? '已记录你的简答，请结合参考作答检查是否覆盖了核心要点。' : '请先输入你的简答内容再提交。',
    value,
  )
}

const easyOptionClass = (question, option) => {
  const feedback = submissions.easy[question.id]
  if (!feedback) return ''
  if (option === question.answer && feedback.correct) return 'bank-option--ok'
  if (option === feedback.value && !feedback.correct) return 'bank-option--bad'
  return ''
}

const toggleRevealAll = () => {
  revealAll.value = !revealAll.value
}

const toggleReveal = (questionId) => {
  revealedAnswers[questionId] = !revealedAnswers[questionId]
}

const isRevealed = (questionId) => revealAll.value || Boolean(revealedAnswers[questionId])

const resetCurrentDifficulty = () => {
  submissions[difficulty.value] = {}

  if (difficulty.value === 'medium') {
    Object.keys(mediumInputs).forEach((key) => {
      delete mediumInputs[key]
    })
  }

  if (difficulty.value === 'hard') {
    Object.keys(hardInputs).forEach((key) => {
      delete hardInputs[key]
    })
  }

  if (difficulty.value === 'short') {
    Object.keys(shortInputs).forEach((key) => {
      delete shortInputs[key]
    })
  }
}

const changeDifficulty = (mode) => {
  difficulty.value = mode
}

const scrollToQuestion = (questionId) => {
  document
    .getElementById(`bank-question-${questionId}`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(
  () => props.questionBank.chapterId,
  () => {
    difficulty.value = 'easy'
    revealAll.value = false
  },
  { immediate: true },
)
</script>

<style scoped>
.bank-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.bank-hero {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 24px 28px;
  border-radius: 24px;
  background: linear-gradient(135deg, #0f172a, #1d4ed8 58%, #60a5fa);
  color: #fff;
  box-shadow: 0 18px 48px rgba(29, 78, 216, 0.18);
}

.bank-hero__eyebrow {
  margin: 0 0 8px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
  letter-spacing: 1px;
}

.bank-hero h1 {
  margin: 0;
  font-size: 38px;
}

.bank-hero__desc {
  margin: 12px 0 0;
  max-width: 900px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.8;
}

.bank-hero__meta {
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bank-hero__meta span {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  font-weight: 700;
  text-align: center;
}

.bank-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 18px;
}

.bank-sidebar,
.bank-main {
  min-width: 0;
}

.bank-sidebar {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bank-card,
.bank-question {
  padding: 18px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #e5eefc;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.bank-card__header,
.bank-answer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.bank-card__header h2,
.bank-answer__header h4,
.bank-question h3 {
  margin: 0;
}

.bank-mode-switch {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.bank-mode-switch button,
.bank-primary,
.bank-ghost,
.bank-jump,
.bank-option {
  border: 1px solid #dbeafe;
  border-radius: 12px;
  padding: 10px 14px;
  background: #f8fbff;
  color: #1d4ed8;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s ease;
}

.bank-mode-switch button.active,
.bank-primary {
  background: linear-gradient(135deg, #1677ff, #69b1ff);
  color: #fff;
  border-color: transparent;
}

.bank-ghost {
  background: #fff;
  color: #4b5563;
  border-color: #d1d5db;
}

.bank-mode-desc {
  margin: 12px 0 0;
  color: #4b5563;
  line-height: 1.7;
}

.bank-stat-list {
  display: grid;
  gap: 10px;
}

.bank-stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: #f8fbff;
}

.bank-stat span {
  color: #6b7280;
}

.bank-stat strong {
  color: #111827;
  font-size: 18px;
}

.bank-progress {
  margin-top: 14px;
}

.bank-progress__bar {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: #e5eefc;
  overflow: hidden;
}

.bank-progress__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #1677ff, #60a5fa);
}

.bank-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bank-actions--inline {
  flex-direction: row;
  flex-wrap: wrap;
}

.bank-jump-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 420px;
  overflow: auto;
}

.bank-jump {
  text-align: left;
  color: #1f2937;
  background: #fff;
}

.bank-jump--ok {
  background: #f6ffed;
  border-color: #b7eb8f;
  color: #237804;
}

.bank-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bank-question__top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.bank-question__index-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  align-items: center;
}

.bank-question__index,
.bank-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e6f4ff;
  color: #1677ff;
  font-size: 13px;
  font-weight: 700;
}

.bank-question__index {
  min-width: 30px;
}

.bank-chip--soft {
  background: #f3f4f6;
  color: #4b5563;
}

.bank-chip--reference {
  background: #f3e8ff;
  color: #7c3aed;
}

.bank-result {
  height: fit-content;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 700;
  white-space: nowrap;
}

.bank-result--ok {
  background: #f6ffed;
  color: #389e0d;
}

.bank-result--bad {
  background: #fff1f0;
  color: #cf1322;
}

.bank-question__knowledge {
  margin: 14px 0 16px;
  color: #4b5563;
  line-height: 1.8;
}

.bank-source-note {
  margin: -4px 0 16px;
  padding: 12px 14px;
  border-radius: 14px;
  background: #f8fbff;
  color: #4b5563;
  line-height: 1.7;
}

.bank-option-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.bank-option {
  text-align: left;
  color: #1f2937;
}

.bank-option--ok {
  background: #f6ffed;
  border-color: #95de64;
  color: #389e0d;
}

.bank-option--bad {
  background: #fff1f0;
  border-color: #ffb3b3;
  color: #cf1322;
}

.bank-input-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.bank-input,
.bank-textarea {
  width: 100%;
  border: 1px solid #dbeafe;
  border-radius: 14px;
  padding: 12px 14px;
  outline: none;
  background: #fff;
  font: inherit;
}

.bank-input {
  flex: 1 1 280px;
}

.bank-textarea {
  min-height: 170px;
  resize: vertical;
  line-height: 1.7;
  margin-bottom: 12px;
}

.bank-feedback {
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 14px;
}

.bank-feedback strong {
  display: block;
  margin-bottom: 6px;
}

.bank-feedback--ok {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}

.bank-feedback--bad {
  background: #fff1f0;
  border: 1px solid #ffccc7;
}

.bank-feedback p {
  margin: 0;
  color: #4b5563;
}

.bank-answer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eef2ff;
}

.bank-answer p {
  margin: 0 0 10px;
  color: #1f2937;
}

.bank-code__label {
  display: inline-block;
  margin-bottom: 8px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 700;
}

.bank-code pre {
  margin: 0;
  padding: 14px;
  border-radius: 14px;
  background: #0f172a;
  color: #e2e8f0;
  overflow-x: auto;
  white-space: pre-wrap;
  line-height: 1.7;
  font-size: 14px;
}

@media (max-width: 1200px) {
  .bank-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 960px) {
  .bank-hero {
    flex-direction: column;
    padding: 20px;
  }

  .bank-hero h1 {
    font-size: 32px;
  }

  .bank-option-list {
    grid-template-columns: 1fr;
  }
}
</style>

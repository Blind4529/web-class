<template>
  <div class="practice-page">
    <section class="practice-hero">
      <div>
        <p class="practice-hero__eyebrow">章节练一练</p>
        <h1>{{ practice.chapterTitle }}</h1>
        <p class="practice-hero__desc">
          把本章全部知识点做成搭积木练习。左边是目标蓝图，右边是当前关卡，答对后积木会被点亮。
        </p>
      </div>
      <div class="practice-hero__meta">
        <span>{{ practice.totalQuestions }} 个知识点</span>
        <span>{{ solvedCount }}/{{ practice.totalQuestions }} 已完成</span>
      </div>
    </section>

    <section class="practice-layout">
      <aside class="practice-blueprint">
        <div class="practice-panel__header">
          <h2>目标蓝图</h2>
          <span>{{ difficultyLabel }}</span>
        </div>

        <div class="practice-mode-switch">
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

        <div class="practice-progress">
          <div class="practice-progress__bar">
            <div class="practice-progress__fill" :style="{ width: `${progressPercent}%` }"></div>
          </div>
          <p>{{ progressPercent }}% 完成</p>
        </div>

        <div class="practice-blocks">
          <button
            v-for="(question, index) in practice.questions"
            :key="question.id"
            type="button"
            class="practice-block"
            :class="{
              'practice-block--done': isSolved(question.id),
              'practice-block--active': currentQuestion.id === question.id,
            }"
            @click="goToQuestion(index)"
          >
            <span class="practice-block__index">{{ index + 1 }}</span>
            <strong>{{ question.shortTopicTitle }}</strong>
            <p>{{ isSolved(question.id) ? question.answer : '待点亮' }}</p>
          </button>
        </div>
      </aside>

      <section class="practice-stage">
        <div class="practice-panel__header">
          <div>
            <h2>{{ currentQuestion.topicTitle }}</h2>
            <p>第 {{ currentIndex + 1 }} 题 / 共 {{ practice.totalQuestions }} 题</p>
          </div>
          <div class="practice-stage__actions">
            <button type="button" @click="goPrev" :disabled="currentIndex === 0">上一题</button>
            <button type="button" @click="goNext" :disabled="currentIndex === practice.questions.length - 1">下一题</button>
          </div>
        </div>

        <div class="practice-card practice-card--prompt">
          <div class="practice-chip-row">
            <span class="practice-chip">{{ currentQuestion.exampleTitle }}</span>
            <span class="practice-chip practice-chip--soft">难度：{{ difficultyLabel }}</span>
          </div>
          <h3>题目要求</h3>
          <p>{{ currentQuestion.knowledgeText }}</p>
        </div>

        <div class="practice-stage__grid">
          <div class="practice-card">
            <h3>目标效果图</h3>
            <div class="practice-target">
              <div class="practice-target__screen">
                <div class="practice-target__toolbar"></div>
                <div class="practice-target__canvas">
                  <div class="practice-target__stack">
                    <div
                      v-for="n in 4"
                      :key="n"
                      class="practice-target__brick"
                      :class="{ 'practice-target__brick--active': n <= Math.min(4, currentIndex + 1) }"
                    ></div>
                  </div>
                  <div class="practice-target__desc">
                    <strong>{{ currentQuestion.answer }}</strong>
                    <p>把这个关键知识点拼进当前功能里。</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="practice-code">
              <span class="practice-code__label">参考代码轮廓</span>
              <pre>{{ currentQuestion.maskedCode || currentQuestion.referenceCode }}</pre>
            </div>
          </div>

          <div class="practice-card">
            <h3>开始作答</h3>

            <template v-if="difficulty === 'easy'">
              <p class="practice-mode-desc">简单模式：从 4 个候选项里选择最合适的关键词或语法。</p>
              <div class="practice-option-list">
                <button
                  v-for="option in currentQuestion.options"
                  :key="option"
                  type="button"
                  class="practice-option"
                  :class="easyOptionClass(option)"
                  @click="submitEasy(option)"
                >
                  {{ option }}
                </button>
              </div>
            </template>

            <template v-else-if="difficulty === 'medium'">
              <p class="practice-mode-desc">中等模式：根据功能要求填写缺失的核心关键词。</p>
              <div class="practice-fill">
                <div class="practice-fill__sentence">
                  使用 <span class="practice-fill__blank">{{ mediumValue || '____' }}</span> 来实现：
                  {{ currentQuestion.knowledgeText }}
                </div>
                <input
                  v-model="mediumValue"
                  class="practice-input"
                  placeholder="请输入关键词，如 v-if / img / href"
                  @keyup.enter="submitMedium"
                >
                <button type="button" class="practice-submit" @click="submitMedium">提交答案</button>
              </div>
            </template>

            <template v-else>
              <p class="practice-mode-desc">困难模式：根据给定前提代码，自己写出缺失的程序片段。</p>
              <div class="practice-code">
                <span class="practice-code__label">前提代码</span>
                <pre>{{ currentQuestion.starterCode }}</pre>
              </div>
              <textarea
                v-model="hardValue"
                class="practice-textarea"
                placeholder="在这里写出你认为正确的代码片段"
              ></textarea>
              <div class="practice-hard-actions">
                <button type="button" class="practice-submit" @click="submitHard">检查答案</button>
                <button type="button" class="practice-ghost" @click="toggleReference">
                  {{ showReference ? '隐藏参考答案' : '查看参考答案' }}
                </button>
              </div>
              <div v-if="showReference" class="practice-reference">
                <span class="practice-code__label">参考答案</span>
                <pre>{{ currentQuestion.referenceCode }}</pre>
              </div>
            </template>

            <div
              v-if="currentFeedback"
              class="practice-feedback"
              :class="{ 'practice-feedback--ok': currentFeedback.correct, 'practice-feedback--bad': !currentFeedback.correct }"
            >
              <strong>{{ currentFeedback.correct ? '回答正确' : '再试一次' }}</strong>
              <p>{{ currentFeedback.message }}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { validateHardAnswer } from '../chapterPractice'

const props = defineProps({
  practice: {
    type: Object,
    required: true,
  },
})

const difficultyList = [
  { value: 'easy', label: '简单' },
  { value: 'medium', label: '中等' },
  { value: 'hard', label: '困难' },
]

const difficulty = ref('easy')
const currentIndex = ref(0)
const showReference = ref(false)

const submissions = reactive({
  easy: {},
  medium: {},
  hard: {},
})

const mediumValue = ref('')
const hardValue = ref('')

const currentQuestion = computed(() => props.practice.questions[currentIndex.value] ?? props.practice.questions[0])

const currentDifficultySubmissions = computed(() => submissions[difficulty.value])

const currentFeedback = computed(() => currentDifficultySubmissions.value[currentQuestion.value.id] ?? null)

const solvedCount = computed(() =>
  props.practice.questions.filter((question) =>
    ['easy', 'medium', 'hard'].some((mode) => submissions[mode][question.id]?.correct),
  ).length,
)

const progressPercent = computed(() =>
  props.practice.totalQuestions === 0 ? 0 : Math.round((solvedCount.value / props.practice.totalQuestions) * 100),
)

const difficultyLabel = computed(
  () => difficultyList.find((item) => item.value === difficulty.value)?.label ?? '简单',
)

const resetInputsForCurrentQuestion = () => {
  mediumValue.value = ''
  hardValue.value = ''
  showReference.value = false
}

const changeDifficulty = (mode) => {
  difficulty.value = mode
  resetInputsForCurrentQuestion()
}

const goToQuestion = (index) => {
  currentIndex.value = index
}

const goPrev = () => {
  if (currentIndex.value > 0) currentIndex.value -= 1
}

const goNext = () => {
  if (currentIndex.value < props.practice.questions.length - 1) currentIndex.value += 1
}

const goToNextUnsolved = () => {
  const nextIndex = props.practice.questions.findIndex((question) => !isSolved(question.id))
  if (nextIndex >= 0) {
    currentIndex.value = nextIndex
  }
}

const isSolved = (questionId) =>
  ['easy', 'medium', 'hard'].some((mode) => submissions[mode][questionId]?.correct)

const setFeedback = (mode, questionId, correct, message, value) => {
  submissions[mode][questionId] = { correct, message, value }
}

const submitEasy = (option) => {
  const isCorrect = option === currentQuestion.value.answer
  setFeedback(
    'easy',
    currentQuestion.value.id,
    isCorrect,
    isCorrect ? `你已经把积木 ${option} 拼进目标功能。` : `当前选择是 ${option}，再想想本题真正需要的关键词。`,
    option,
  )
  if (isCorrect) goToNextUnsolved()
}

const submitMedium = () => {
  const value = mediumValue.value.trim()
  const isCorrect = value.toLowerCase() === currentQuestion.value.answer.toLowerCase()
  setFeedback(
    'medium',
    currentQuestion.value.id,
    isCorrect,
    isCorrect ? `填写正确：${value}` : `你填写的是 ${value || '空答案'}，请根据题意再试一次。`,
    value,
  )
  if (isCorrect) {
    mediumValue.value = ''
    goToNextUnsolved()
  }
}

const submitHard = () => {
  const value = hardValue.value.trim()
  const isCorrect = validateHardAnswer(value, currentQuestion.value)
  setFeedback(
    'hard',
    currentQuestion.value.id,
    isCorrect,
    isCorrect ? '代码通过本题关键词检查，可以进入下一块积木。' : '代码里还没有体现本题核心知识点，继续补全。',
    value,
  )
  if (isCorrect) {
    hardValue.value = ''
    goToNextUnsolved()
  }
}

const easyOptionClass = (option) => {
  const feedback = submissions.easy[currentQuestion.value.id]
  if (!feedback) return ''
  if (option === currentQuestion.value.answer && feedback.correct) return 'practice-option--ok'
  if (option === feedback.value && !feedback.correct) return 'practice-option--bad'
  return ''
}

const toggleReference = () => {
  showReference.value = !showReference.value
}

watch(
  () => props.practice.chapterId,
  () => {
    currentIndex.value = 0
    difficulty.value = 'easy'
    resetInputsForCurrentQuestion()
  },
  { immediate: true },
)

watch(currentQuestion, () => {
  resetInputsForCurrentQuestion()
})
</script>

import { knowledgeExampleMap } from './knowledgeExamples'
import { chapterQuestionBankExtras } from './chapterQuestionBankExtras'

const MODE_TOKEN_MAP = {
  directives: 'v-model',
  'virtual-dom': 'diff',
  cli: 'npm run dev',
  structure: 'App.vue',
  'simple-component': 'component',
  'data-function': 'data()',
  'local-registration': 'components',
  'global-registration': 'app.component',
  'dynamic-components': ':is',
  'component-events': '@mouseover',
  'event-click': '@click',
  'event-modifiers': '.prevent',
  'event-key': '.enter',
  'event-custom': '$emit',
  'event-mouse': '@mouseout',
  'render-vif': 'v-if',
  'render-vif-else': 'v-else',
  'render-vshow': 'v-show',
  'render-vfor': 'v-for',
  'transition-fade': '<transition>',
  'transition-shiftx': 'translateX',
  'animation-rotate': '@keyframes',
  'transition-custom': 'enter-active-class',
}

const GLOBAL_DISTRACTORS = [
  'div',
  'span',
  'href',
  'src',
  'v-if',
  'v-show',
  'v-for',
  '@click',
  '$emit',
  'progress',
  'rowspan',
  'colspan',
  'border-collapse',
  'position',
]

const SHORT_ANSWER_TARGET_COUNT = 20

const SHORT_ANSWER_PROMPT_BUILDERS = [
  (question) =>
    `请简述 ${question.answer} 的主要作用，并结合“${question.shortTopicTitle}”说明它为什么适合本知识点。`,
  (question) =>
    `围绕“${question.shortTopicTitle}”这一小节，说明 ${question.answer} 的用途、常见写法和一个典型使用场景。`,
  (question) =>
    `请根据知识点“${question.knowledgeText}”，用自己的话解释 ${question.answer} 在前端中的作用。`,
  (question) =>
    `这道题原本考查“${question.prompt || question.knowledgeText}”。请改用简答题方式说明为什么答案是 ${question.answer}。`,
  (question) =>
    `请写出与 ${question.answer} 相关的核心语法或标签，并简要说明使用时机。`,
]

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const normalize = (text) => text.replace(/\s+/g, ' ').trim().toLowerCase()

const uniqueBy = (items, getKey) => {
  const seen = new Set()
  return items.filter((item) => {
    const key = getKey(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const trimTopicTitle = (title) =>
  title
    .replace(/^Chapter\s+\d+\s+/i, '')
    .split('：')[0]
    .split(':')[0]
    .trim()

const sanitizeCodeForPractice = (code) =>
  (code || '')
    .replace(/data:image\/[^"]+/g, 'demo.svg')
    .replace(/https?:\/\/[^\s"']+/g, 'https://example.com/demo')
    .replace(/\s{2,}/g, ' ')
    .trim()

const extractBacktickToken = (text) => {
  const match = text?.match(/`([^`]+)`/)
  return match?.[1]?.trim() ?? ''
}

const extractHtmlToken = (code) => {
  const tagMatch = code.match(/<\s*([a-zA-Z][\w-]*)/)
  return tagMatch?.[1] ?? ''
}

const extractCssToken = (rule) => {
  const selectorMatch = rule.match(/^\s*([#.:\w\-\s>,+~[\]="']+)\s*\{/)
  if (selectorMatch?.[1]) {
    const selector = selectorMatch[1].trim()
    const propertyMatch = rule.match(/\{\s*([a-z-]+)\s*:/)
    if (propertyMatch?.[1]) return propertyMatch[1]
    return selector
  }
  return ''
}

const firstWordFromTitle = (title) => {
  const cleaned = String(title || '').replace(/[()]/g, ' ').trim()
  return cleaned.split(/\s+/)[0] ?? ''
}

const codeFromExample = (example) => {
  if (!example) return ''

  switch (example.type) {
    case 'html':
      return sanitizeCodeForPractice(example.initialLine)
    case 'css':
      return sanitizeCodeForPractice(example.initialRule)
    case 'js':
      return sanitizeCodeForPractice(example.initialCode)
    case 'jquery':
      return sanitizeCodeForPractice(example.initialCode)
    case 'vueAdvanced':
      return sanitizeCodeForPractice(example.title || example.description || '')
    default:
      return ''
  }
}

const answerFromExample = (example, fallbackText = '') => {
  if (!example) return extractBacktickToken(fallbackText) || 'demo'

  if (example.type === 'vueAdvanced') {
    return MODE_TOKEN_MAP[example.mode] || extractBacktickToken(example.title) || firstWordFromTitle(example.title)
  }

  const titleToken = extractBacktickToken(example.title) || firstWordFromTitle(example.title)
  if (titleToken && titleToken !== '知识点') return titleToken

  if (example.type === 'html') {
    return extractHtmlToken(example.initialLine) || extractBacktickToken(fallbackText) || 'tag'
  }

  if (example.type === 'css') {
    return extractCssToken(example.initialRule) || extractBacktickToken(fallbackText) || 'property'
  }

  if (example.type === 'js' || example.type === 'jquery') {
    const methodMatch = codeFromExample(example).match(/([$\w.]+)\s*\(/)
    return methodMatch?.[1] || extractBacktickToken(fallbackText) || 'method'
  }

  return extractBacktickToken(fallbackText) || 'keyword'
}

const maskCode = (code, answer) => {
  if (!code) return `/* TODO: write ${answer} */`

  const pattern = new RegExp(escapeRegExp(answer), 'i')
  if (pattern.test(code)) {
    return code.replace(pattern, '____')
  }

  return `${code}\n/* TODO: add ${answer} */`
}

const createStarterCode = (code, answer) => {
  if (!code) return `// TODO: use ${answer} to complete the feature`

  const masked = maskCode(code, answer)
  return `// 补全下面缺失的关键实现\n${masked}`
}

const createOptions = (answer, chapterAnswers, questionIndex) => {
  const uniqueChapterAnswers = [...new Set(chapterAnswers.filter(Boolean))]
  const wrong = uniqueChapterAnswers.filter((item) => item !== answer)
  const pool = [...wrong, ...GLOBAL_DISTRACTORS.filter((item) => item !== answer)]
  const picks = []

  for (let i = 0; i < pool.length && picks.length < 3; i += 1) {
    const candidate = pool[(questionIndex + i) % pool.length]
    if (candidate && candidate !== answer && !picks.includes(candidate)) {
      picks.push(candidate)
    }
  }

  const options = [answer, ...picks].slice(0, 4)
  return options.sort((a, b) => `${a}${questionIndex}`.localeCompare(`${b}${questionIndex}`))
}

const createQuestion = (chapter, topic, knowledgeText, knowledgeIndex, example, chapterAnswers, questionIndex) => {
  const answer = answerFromExample(example, knowledgeText)
  const referenceCode = codeFromExample(example)
  const maskedCode = maskCode(referenceCode, answer)
  const starterCode = createStarterCode(referenceCode, answer)

  return {
    id: `${topic.id}-practice-${knowledgeIndex + 1}`,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    topicId: topic.id,
    topicTitle: topic.title,
    shortTopicTitle: trimTopicTitle(topic.title),
    knowledgeIndex,
    knowledgeText,
    answer,
    referenceCode,
    maskedCode,
    starterCode,
    options: createOptions(answer, chapterAnswers, questionIndex),
    exampleTitle: example?.title ?? `知识点 ${knowledgeIndex + 1}`,
  }
}

const buildShortAnswerReference = (question) => {
  const parts = [
    `核心答案：${question.answer}`,
    `知识点说明：${question.knowledgeText}`,
  ]

  if (question.prompt) {
    parts.push(`原题考点：${question.prompt}`)
  }

  if (question.referenceCode) {
    parts.push(`示例代码：${sanitizeCodeForPractice(question.referenceCode)}`)
  }

  return parts.join('\n')
}

const buildShortAnswerQuestions = (questions) => {
  const dedupedQuestions = uniqueBy(
    questions.filter((question) => question?.answer && question?.knowledgeText),
    (question) => normalize(`${question.prompt || question.knowledgeText}|${question.answer}`),
  )

  if (dedupedQuestions.length === 0) return []

  return Array.from({ length: SHORT_ANSWER_TARGET_COUNT }, (_, index) => {
    const sourceQuestion = dedupedQuestions[index % dedupedQuestions.length]
    const promptBuilder = SHORT_ANSWER_PROMPT_BUILDERS[index % SHORT_ANSWER_PROMPT_BUILDERS.length]

    return {
      ...sourceQuestion,
      id: `${sourceQuestion.id}-short-${index + 1}`,
      originalQuestionId: sourceQuestion.id,
      originalPrompt: sourceQuestion.prompt || '',
      prompt: promptBuilder(sourceQuestion),
      sampleAnswer: buildShortAnswerReference(sourceQuestion),
    }
  })
}

const buildBaseChapterQuestionMap = (reviewTree) => {
  const map = {}

  reviewTree.forEach((chapter) => {
    const answerSeeds = chapter.children.flatMap((topic) =>
      topic.knowledge.map((knowledgeText, index) => {
        const example = knowledgeExampleMap[topic.id]?.[index]
        return answerFromExample(example, knowledgeText)
      }),
    )

    const questions = chapter.children.flatMap((topic) =>
      topic.knowledge.map((knowledgeText, index) => {
        const example = knowledgeExampleMap[topic.id]?.[index]
        return createQuestion(
          chapter,
          topic,
          knowledgeText,
          index,
          example,
          answerSeeds,
          index,
        )
      }),
    )

    map[chapter.id] = {
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      chapterShortTitle: trimTopicTitle(chapter.title),
      totalQuestions: questions.length,
      questions,
      shortAnswerQuestions: buildShortAnswerQuestions(questions),
    }
  })

  return map
}

export const buildChapterPracticeMap = (reviewTree) => buildBaseChapterQuestionMap(reviewTree)

export const buildChapterQuestionBankMap = (reviewTree) => {
  const baseMap = buildBaseChapterQuestionMap(reviewTree)

  Object.keys(baseMap).forEach((chapterId) => {
    const extraQuestions = chapterQuestionBankExtras[chapterId] ?? []
    const finalQuestions = extraQuestions.length ? extraQuestions : baseMap[chapterId].questions

    baseMap[chapterId] = {
      ...baseMap[chapterId],
      totalQuestions: finalQuestions.length,
      questions: finalQuestions,
      shortAnswerQuestions: buildShortAnswerQuestions(finalQuestions),
    }
  })

  return baseMap
}

export const validateHardAnswer = (userInput, question) => {
  const normalizedInput = normalize(userInput)
  const normalizedAnswer = normalize(question.answer)
  const normalizedReference = normalize(question.referenceCode)

  if (!normalizedInput) return false
  if (normalizedInput.includes(normalizedReference) && normalizedReference) return true
  if (normalizedInput.includes(normalizedAnswer)) return true
  return false
}

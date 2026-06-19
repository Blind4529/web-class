<template>
  <SelectorComparison v-if="demo.type === 'selectorComparison'" />
  <VueBindingCard v-else-if="demo.type === 'vueBinding'" />
  <VueAdvancedDemo
    v-else-if="demo.type === 'vueAdvanced'"
    :title="demo.title"
    :description="demo.description"
    :mode="demo.mode"
  />
  <EditableHtmlCard
    v-else-if="demo.type === 'html'"
    :title="demo.title"
    :description="demo.description"
    :initial-line="demo.initialLine"
    :wrapper-before="demo.wrapperBefore"
    :wrapper-after="demo.wrapperAfter"
    :preview-styles="demo.previewStyles"
    :height="demo.height"
    :tips="demo.tips"
  />
  <EditableCssRuleCard
    v-else-if="demo.type === 'css'"
    :title="demo.title"
    :description="demo.description"
    :initial-rule="demo.initialRule"
    :html="demo.html"
    :base-styles="demo.baseStyles"
    :tips="demo.tips"
  />
  <EditableJsCard
    v-else-if="demo.type === 'js'"
    :title="demo.title"
    :description="demo.description"
    :initial-code="demo.initialCode"
    :html="demo.html"
    :tips="demo.tips"
  />
  <EditableJQueryCard
    v-else-if="demo.type === 'jquery'"
    :title="demo.title"
    :description="demo.description"
    :initial-code="demo.initialCode"
    :initial-html="demo.initialHtml"
    :tips="demo.tips"
  />
</template>

<script setup>
import EditableCssRuleCard from './EditableCssRuleCard.vue'
import EditableHtmlCard from './EditableHtmlCard.vue'
import EditableJQueryCard from './EditableJQueryCard.vue'
import EditableJsCard from './EditableJsCard.vue'
import SelectorComparison from './SelectorComparison.vue'
import VueAdvancedDemo from './VueAdvancedDemo.vue'
import VueBindingCard from './VueBindingCard.vue'

defineProps({
  demo: {
    type: Object,
    required: true,
  },
})
</script>

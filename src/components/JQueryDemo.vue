<template>
  <div class="jq-demo">
    <div class="jq-demo__actions">
      <el-button size="small" @click="run('prepend')">prepend()</el-button>
      <el-button size="small" @click="run('append')">append()</el-button>
      <el-button size="small" @click="run('toggle')">toggle()</el-button>
      <el-button size="small" @click="run('slide')">slideToggle()</el-button>
      <el-button size="small" @click="run('fade')">fadeToggle()</el-button>
      <el-button size="small" @click="run('animate')">animate()</el-button>
      <el-button size="small" type="danger" plain @click="run('remove')">remove()</el-button>
      <el-button size="small" type="primary" plain @click="resetDemo">reset</el-button>
    </div>

    <div ref="wrapRef" class="jq-demo__stage">
      <h4 class="jq-title">jQuery Demo Header</h4>
      <p id="jq-message" class="jq-message">
        这里用于演示 `click()`、`hide()`、`show()`、`slideToggle()`、`fade` 和 `animate()`。
      </p>
      <div class="jq-panel">选择上方按钮查看 DOM 变化效果</div>
    </div>
  </div>
</template>

<script setup>
import $ from 'jquery'
import { nextTick, ref } from 'vue'

const wrapRef = ref(null)

const initialMarkup = `
  <h4 class="jq-title">jQuery Demo Header</h4>
  <p id="jq-message" class="jq-message">
    这里用于演示 \`click()\`、\`hide()\`、\`show()\`、\`slideToggle()\`、\`fade\` 和 \`animate()\`。
  </p>
  <div class="jq-panel">选择上方按钮查看 DOM 变化效果</div>
`

const resetDemo = async () => {
  wrapRef.value.innerHTML = initialMarkup
  await nextTick()
  $(wrapRef.value).find('.jq-panel').css({
    left: '0px',
    opacity: '1',
    width: '180px',
  })
}

const run = (type) => {
  const $root = $(wrapRef.value)
  const $message = $root.find('#jq-message')
  const $panel = $root.find('.jq-panel')

  if (type === 'prepend') {
    $message.prepend('<strong>[prepend]</strong> ')
  }

  if (type === 'append') {
    $message.append(' <strong>[append]</strong>')
  }

  if (type === 'toggle') {
    $message.toggle('fast')
  }

  if (type === 'slide') {
    $message.slideToggle('fast')
  }

  if (type === 'fade') {
    $message.fadeToggle(300)
  }

  if (type === 'animate') {
    $panel.animate(
      {
        left: $panel.css('left') === '0px' ? '80px' : '0px',
        opacity: $panel.css('opacity') === '1' ? 0.45 : 1,
        width: $panel.width() > 180 ? '180px' : '240px',
      },
      350,
    )
  }

  if (type === 'remove') {
    $root.find('.jq-title').remove()
  }
}
</script>

<style scoped>
.jq-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.jq-demo__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.jq-demo__stage {
  padding: 16px;
  border: 1px dashed #91caff;
  border-radius: 12px;
  background: #f7fbff;
}

.jq-message {
  margin: 10px 0;
}

.jq-panel {
  position: relative;
  width: 180px;
  padding: 12px;
  border-radius: 10px;
  background: #1677ff;
  color: #fff;
}
</style>

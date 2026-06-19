<template>
  <div class="dynamic-tabs">
    <div class="dynamic-tabs__nav">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        type="button"
        :class="{ active: currentTab === tab.component }"
        @click="currentTab = tab.component"
      >
        {{ tab.name }}
      </button>
    </div>
    <component :is="currentTab" />
  </div>
</template>

<script setup>
import { shallowRef } from 'vue'
import HomePane from './HomePane.vue'
import AboutPane from './AboutPane.vue'
import ContactPane from './ContactPane.vue'

const tabs = [
  { name: 'Home', component: HomePane },
  { name: 'About', component: AboutPane },
  { name: 'Contact', component: ContactPane },
]

const currentTab = shallowRef(HomePane)
</script>

<style scoped>
.dynamic-tabs {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dynamic-tabs__nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.dynamic-tabs__nav button {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
  padding: 8px 16px;
  cursor: pointer;
}

.dynamic-tabs__nav button.active {
  color: #fff;
  background: #409eff;
  border-color: #409eff;
}
</style>

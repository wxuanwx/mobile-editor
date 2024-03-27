# rich-text-editor-vue3

> Vue3's mobile rich text editor

## Installation

```bash
npm i rich-text-editor-vue3
pnpm i rich-text-editor-vue3
yarn add rich-text-editor-vue3
```

## Usage

main.ts

```
// script
import { createApp } from 'vue';
import App from './App.vue';
import customEditor from "rich-text-editor-vue3"
const app = createApp(App);
app.use(customEditor); //全局注册
app.mount('#app');
```

App.vue

```
<template>
  <div class="app-container">
    <customEditor ref="editor" :style="{ height: '100px' }" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const editor = ref()
const html = ref('')
const getContent = () => {
  html.value = editor.value.getHTML()
}
</script>
```

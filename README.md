# mobile-editor

> Vue3's mobile rich text editor

## Installation

```bash
npm i mobile-editor
pnpm i mobile-editor
yarn add mobile-editor
```

## Usage

main.ts

```
// script
import { createApp } from 'vue';
import App from './App.vue';
import customEditor from "mobile-editor"
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

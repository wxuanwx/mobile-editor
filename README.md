# mobile-editor

> Vue3's mobile rich text editor

## Installation

```bash
npm i mobile-editor
pnpm i mobile-editor
yarn add mobile-editor
```

## Installs a plugin

```
// 1. global
// main.ts
import { createApp } from 'vue';
import Editor from 'mobile-editor';
import App from './App.vue';
const app = createApp(App);
app.use(Editor );
app.mount('#app');

// 2. local
// index.vue
<script setup lang="ts">
import { Editor } from 'mobile-editor';
</script>
```

## Usage

```
// index.vue
<template>
  <div class="app-container">
    <Editor ref="editor" :style="{ height: '100px' }" />
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

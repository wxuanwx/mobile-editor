# mobile-editor

Vue3 Mobile Rich Text Editor

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
import App from './App.vue';

import Editor from 'mobile-editor';
import 'mobile-editor/lib/style.css';

const app = createApp(App);
app.use(Editor );
app.mount('#app');

// 2. local
// index.vue
<script setup lang="ts">
import { Editor } from 'mobile-editor';
import 'mobile-editor/lib/style.css';
</script>
```

## Usage

```
// index.vue
getHTML：get content
menu-size：set the size of the menu buttons below
<template>
  <div class="app-container">
    <Editor ref="editor" :style="{ height: '100px' }" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const editor = ref();
const html = ref('');
const getContent = () => {
  html.value = editor.value.getHTML();
};
</script>
```

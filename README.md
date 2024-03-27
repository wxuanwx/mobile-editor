# mobile-editor

vue3移动端富文本编辑器

[English](./README_en.md)

## 安装

    npm i mobile-editor
    pnpm i mobile-editor
    yarn add mobile-editor

## 注册组件

    // 1. 全局
    // main.ts
    import { createApp } from 'vue';
    import App from './App.vue';

    import Editor from 'mobile-editor';
    // 引入组件样式
    import 'mobile-editor/lib/style.css'

    const app = createApp(App);
    app.use(Editor );
    app.mount('#app');

    // 2. 局部
    // index.vue
    <script setup lang="ts">
    import { Editor } from 'mobile-editor';
    // 引入组件样式
    import "mobile-editor/lib/style.css";
    </script>

## 使用

```
// index.vue
// 使用组件的getHTML方法获取富文本内容
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

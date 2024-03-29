# mobile-editor

vue3移动端富文本编辑器

[English](https://github.com/wxuanwx/mobile-editor/blob/master/README_en.md)

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
    import 'mobile-editor/lib/style.css';
    
    const app = createApp(App);
    app.use(Editor );
    app.mount('#app');
    
    // 2. 局部
    // index.vue
    <script setup lang="ts">
    import { Editor } from 'mobile-editor';
    // 引入组件样式
    import 'mobile-editor/lib/style.css';
    </script>

## 使用

```
// index.vue
// getHTML：获取富文本内容
// menu-size：设置下方菜单按钮大小
// font-size：设置字体大小
<template>
  <div class="app-container">
    <Editor ref="editor" :style="{ height: '100px' }" :menu-size="20" :font-size="14" />
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

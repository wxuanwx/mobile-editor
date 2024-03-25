# vue3-video-h

> A HTML5 video player component for Vue3

## Installation

```bash
npm i vue3-video-h --save
```

## Usage

main.ts

```
// script
import { createApp } from 'vue';
import App from './App.vue';
import customVideo from "vue3-video-h"
import "vue3-video-h/lib/style.css";//引入样式
const app = createApp(App);
app.use(customVideo); //全局注册
app.mount('#app');
```

App.vue

```
<template>
  <div class="app-container">
    <customVideo :config="config" />
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
let config = ref({
  src:"", //视频
  poster: "", // 初始化占位图片
  volume: 20,//声音
  themeColor:"#19accc",//主体颜色
  activeColor:"red",//选中颜色
  width:"500px",//宽度
  height:"300px",//高度
})
</script>
```

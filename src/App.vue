<template>
  <Editor ref="editor" :style="{ height: '100px' }" :menu-size="40" :font-size="14" />
  <button class="button" type="button" title="输出" @click="getContent">
    输出富文本显示
  </button>
  <div v-html="html" class="html"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { Editor } from 'mobile-editor'
// import 'mobile-editor/lib/style.css';

// import { Editor } from 'mobile-editor'
import { Editor } from '../package/index'

const editor = ref()
const html = ref('')
const getContent = () => {
  html.value = editor.value.getHTML()
}
</script>

<style scoped>
.button {
  box-sizing: border-box;
  border: 1px solid #ccc;
  background: none;
  padding: 6px 16px;
  border-radius: 4px;
  margin-top: 10px;
}

.html {
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #ccc;
  min-height: 100px;
  border-radius: 4px;
  margin-top: 10px;
}
</style>

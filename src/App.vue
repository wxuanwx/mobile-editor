<template>
  <Editor ref="editor" />
  <button type="button" title="输出" @click="getContent">
    输出
  </button>
  <div v-html="html"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Editor from '../package/Editor/src/Editor.vue'
const editor = ref()
const html = ref('')
const getContent = () => {
  html.value = editor.value.getHTML()
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

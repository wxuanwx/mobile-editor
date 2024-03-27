<template>
  <div class="editor" @click="focus">
    <div class="editor__menu">
      <button type="button" :class="editor?.isActive('bold') ? 'is-active' : ''" title="加粗" @click="toggleBold"
        :disabled="!editor?.can().chain().focus().toggleBold().run()">
        <div class="iconfont icon-left">粗</div>
      </button>
      <button type="button" :class="editor?.isActive('italic') ? 'is-active' : ''" title="斜体"
        @click="editor?.chain().focus().toggleItalic().run()"
        :disabled="!editor?.can().chain().focus().toggleItalic().run()">
        斜
      </button>
      <div class="divider"></div>
      <button type="button" :class="editor?.isActive('strike') ? 'is-active' : ''" title="中横线"
        @click="() => editor?.chain().focus().toggleStrike().run()"
        :disabled="!editor?.can().chain().focus().toggleStrike().run()">
        中
      </button>
      <button type="button" title="分割线" @click="() => editor?.chain().focus().setHorizontalRule().run()">
        分
      </button>
      <button type="button" :class="editor?.isActive('bulletList') ? 'is-active' : ''" title="无序列表"
        @click="() => editor?.chain().focus().toggleBulletList().run()">
        无
      </button>
      <button type="button" :class="editor?.isActive('orderedList') ? 'is-active' : ''" title="有序列表"
        @click="() => editor?.chain().focus().toggleOrderedList().run()">
        有
      </button>
      <button type="button" @click="() => editor?.chain().focus().toggleTaskList().run()"
        :class="editor?.isActive('taskList') ? 'is-active' : ''" title="任务列表">
        任
      </button>
      <div class="divider"></div>
      <button type="button" :class="editor?.isActive('code') ? 'is-active' : ''" title="代码"
        @click="() => editor?.chain().focus().toggleCode().run()"
        :disabled="!editor?.can().chain().focus().toggleCode().run()">
        代
      </button>
      <button type="button" :class="editor?.isActive('codeBlock') ? 'is-active' : ''" title="代码块"
        :onClick="() => editor?.chain().focus().toggleCodeBlock().run()">
        块
      </button>
      <button type="button" title="撤回" @click="() => editor?.chain().focus().undo().run()"
        :disabled="!editor?.can().chain().focus().undo().run()">
        撤
      </button>
    </div>
    <editor-content :editor="editor" class="editor__content" />
  </div>
</template>

<script lang="ts" setup>

import {
  type Editor,
  useEditor,
  EditorContent,
} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { lowlight } from 'lowlight';
import { nextTick, ref } from 'vue';
// 代码
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

const color = ref('#000');
const setColor = (val: any) => {
  console.log(val)
}

const limit = 800;
const extensions = [
  FontFamily,
  TaskList,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),

  Highlight.configure({
    multicolor: true,
    HTMLAttributes: {
      class: 'high-light',
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Placeholder.configure({
    placeholder: '请输入内容...',
  }),
  TaskItem.configure({
    nested: true,
  }),
  StarterKit.configure({
    codeBlock: false,
    paragraph: {
      HTMLAttributes: {
        class: 'paragraph',
      },
    },
  }),
  CharacterCount.configure({ limit }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
];

const content = ``;

const editor = useEditor({
  content,
  extensions,
})

const focus = () => editor.value?.chain().focus()

nextTick(focus)

const toggleBold = () => {
  editor.value?.commands.toggleBold()
  console.log('加粗')
}


</script>
<style lang="scss">
@import "../assets/css/global.scss";
</style>
<style lang="scss" scoped>
@import "../assets/css/iconfont.css";
:root {
  --editor-primary: #409eff;
  --editor-success: #67c23a;
  --editor-warning: #e6a23c;
  --editor-error: #f56c6c;
  --editor-info: #909399;
  --editor-text: #303133;
  --editor-font-size: 14px;
  --editor-border-radius: 4px;
}

$primary: var(--editor-primary);
$success: var(--editor-success);
$warning: var(--editor-warning);
$error: var(--editor-error);
$info: var(--editor-info);
$text: var(--editor-text);

.editor {
  border-radius: 4px;
  color: #0d0d0d;
  display: flex;
  flex-direction: column;
  border: 1px solid #0d0d0d;

  &__menu {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
  }

  &__content {
    width: 100%;
    height: 200px;
    overflow-y: auto;
    padding: 12px;
  }

  button {
    accent-color: black;
    border: none;
    cursor: pointer;
    margin: 0 4px;
    padding: 4px;
    border-radius: 2px;
    // background: #fff;
  }

  button:hover,
  button.is-active {
    background-color: #e0e0e0;
  }

  .divider {
    background-color: #ccc;
    height: 14px;
    width: 1px;
    margin: 0 4px;
  }

}
</style>
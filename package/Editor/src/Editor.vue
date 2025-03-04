<template>
  <div class="editor__container" @click="focus" :style="style">
    <div class="editor__menu"
      :style="{ fontSize: `${menuSize}px`, height: !isOpen ? `${editorMenuHeight}px` : undefined, opacity: editorMenuHeight === 0 ? 0 : 1 }"
      ref="editorMenuRef">
      <button type="button" data-position="top" class="editor__menu__button"
        :class="{ 'editor__menu__button--reversal': isOpen }" title="展开" @click="open" v-show="isMore">
        <div class="iconfont icon-launch"></div>
      </button>
      <button style="" type="button" class="editor__menu__button" title="清除"
        @click="() => editor?.commands.clearContent(true)">
        <div class="iconfont icon-empty"></div>
      </button>
      <button type="button" class="editor__menu__button editor__menu__button--divider" title="撤回"
        @click="() => editor?.chain().focus().undo().run()" :disabled="!editor?.can().chain().focus().undo().run()">
        <div class="iconfont icon-undo"></div>
      </button>
      <button type="button" class="editor__menu__button" :class="editor?.isActive('bold') ? 'is-active' : ''" title="加粗"
        @click="editor?.chain().focus().toggleBold().run()">
        <div class="iconfont icon-bold"></div>
      </button>
      <button type="button" class="editor__menu__button" :class="editor?.isActive('italic') ? 'is-active' : ''"
        title="斜体" @click="editor?.chain().focus().toggleItalic().run()">
        <div class="iconfont icon-italic"></div>
      </button>
      <button type="button" class="editor__menu__button" :class="editor?.isActive('heading') ? 'is-active' : ''"
        title="标题" @click="() => editor?.chain().focus().setHeading({ level: 1 }).run()">
        <div class="iconfont icon-title"></div>
      </button>
      <button type="button" class="editor__menu__button"
        :class="editor?.isActive({ textAlign: 'left' }) ? 'is-active' : ''" title="左对齐"
        @click="() => editor?.chain().focus().setTextAlign('left').run()">
        <div class="iconfont icon-alignLeft"></div>
      </button>
      <button type="button" class="editor__menu__button"
        :class="editor?.isActive({ textAlign: 'center' }) ? 'is-active' : ''" title="居中对齐"
        @click="() => editor?.chain().focus().setTextAlign('center').run()">
        <div class="iconfont icon-center"></div>
      </button>
      <button type="button" class="editor__menu__button"
        :class="editor?.isActive({ textAlign: 'right' }) ? 'is-active' : ''" title="右对齐"
        @click="() => editor?.chain().focus().setTextAlign('right').run()">
        <div class="iconfont icon-alignRight"></div>
      </button>

      <button type="button" class="editor__menu__button" title="中横线"
        @click="() => editor?.chain().focus().toggleStrike().run()">
        <div class="iconfont icon-strikethrough"></div>
      </button>
      <button type="button" class="editor__menu__button" title="分割线"
        @click="() => editor?.chain().focus().setHorizontalRule().run()">
        <div class="iconfont icon-hr"></div>
      </button>
      <button type="button" class="editor__menu__button" :class="editor?.isActive('bulletList') ? 'is-active' : ''"
        title="无序列表" @click="() => editor?.chain().focus().toggleBulletList().run()">
        <div class="iconfont icon-unorderedList"></div>
      </button>
      <button type="button" class="editor__menu__button" :class="editor?.isActive('orderedList') ? 'is-active' : ''"
        title="有序列表" @click="() => editor?.chain().focus().toggleOrderedList().run()">
        <div class="iconfont icon-orderedList"></div>
      </button>
    </div>
    <editor-content :editor="editor" class="editor__content" :style="{ fontSize: `${fontSize}px` }" />
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
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import HTML from 'html-parse-stringify';
import { nextTick, ref, watch, type StyleValue } from 'vue';
import styleNames from '../assets/json/styleNames.json';

interface EditorProps {
  style?: Partial<StyleValue>
  placeholder?: string
  menuSize?: number
  fontSize?: number
}

const { style, placeholder, menuSize } = withDefaults(defineProps<EditorProps>(), {
  placeholder: '请输入内容...',
  menuSize: 14,
  fontSize: 16
})

const color = ref('#000');
const setColor = (val: any) => {
  console.log(val)
}
const list = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const limit = 800;
const extensions = [
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
    placeholder,
  }),
  StarterKit.configure({
    codeBlock: false,
    paragraph: {
      HTMLAttributes: {
        class: 'paragraph',
      },
    },
  }),
  CharacterCount.configure({ limit })
];
const content = '';
const editor = useEditor({
  content,
  extensions,
})

const focus = () => editor.value?.chain().focus()
const defaultStyles = ['none', 'normal', 'auto', '0', '0%', '0px', 'rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)', 'visible']
const handleStyle = (div?: HTMLElement) => {
  if (!div) {
    return {}
  }
  const style = window.getComputedStyle(div, null)
  const newStyle: Record<string, string> = {}
  for (let i = 0; i < styleNames.length; i++) {
    const name: any = styleNames[i];
    const value = style[name]
    if (value && !defaultStyles.includes(value)) {
      if (value.includes('none')) {
        continue
      }
      newStyle[name] = value;
    }
  }
  return newStyle
}

const camelToKebabCase = (str: string) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
const handleHtml = (ast?: Tag[], parentSelector: string = '', map: Record<string, number> = {}) => {
  if (!ast?.length) {
    return
  }
  for (let i = 0; i < ast.length; i++) {
    const element = ast[i];
    const className = element.attrs?.class
    const type = element.type
    const name = element.name
    // hr这种标签不处理
    if (name && ['hr'].includes(name)) {
      continue
    }
    let selector = ''
    if (className) {
      selector += `${parentSelector} > .${className}`
    } else if (name) {
      selector += `${parentSelector} > ${name}`
    } else {
      selector = parentSelector
    }
    map[selector] = (map[selector] || 0) + 1
    if (className || name) {
      selector = `${selector}:nth-of-type(${map[selector]})`
    }
    const div = document.querySelector(selector) as HTMLElement
    if (div) {
      const styleObj = handleStyle(div)
      let styleStr = ''
      for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
          const value = styleObj[key];
          styleStr += `${camelToKebabCase(key)}: ${value};`
        }
      }
      element.attrs = { style: styleStr }

    }
    handleHtml(element.children, selector, map)
  }
}
const getHTML = () => {
  const content = editor.value?.getText() || ''
  if (!content) {
    return ''
  }
  let htmlString = editor.value?.getHTML() || ''
  if (htmlString) {
    const ast = HTML.parse(htmlString)
    handleHtml(ast, '.editor > .editor__content > .tiptap.ProseMirror')
    htmlString = HTML.stringify(ast);
  }
  return htmlString
}
const editorMenuRef = ref<HTMLElement>()
const editorMenuHeight = ref(0)
const margin = 4
const padding = 4
const isOpen = ref(false)
const isMore = ref(true)
const open = () => {
  isOpen.value = !isOpen.value
}

watch(() => editorMenuRef.value, () => {
  if (editorMenuRef.value) {
    setTimeout(() => {
      const nodes = editorMenuRef.value?.querySelectorAll('button[type="button"]') as NodeListOf<HTMLElement>
      const len = nodes.length
      const [btn1, btn2] = [...nodes]
      const btnWidth = btn1?.offsetWidth
      const btnLeft1 = btn1?.offsetLeft
      const btnLeft2 = btn2?.offsetLeft
      const menuWidth = (editorMenuRef.value?.clientWidth)
      editorMenuHeight.value = btn1.clientHeight + margin
      if (btnWidth && menuWidth) {
        // 有margin和padding
        const contentWidth = menuWidth - padding * 2
        const num = Math.floor(contentWidth / (btnWidth + padding * 2))
        isMore.value = num < len
        const marginRight = btnLeft2 - btnLeft1 - btnWidth - margin
        for (let i = num; i < len - 1; i++) {
          const node = nodes[i];
          node.style.marginRight = `${marginRight}px`
        }
      }
    }, 500);
  }
})

nextTick(() => {
  focus()
})

defineExpose({
  getHTML
})

const menuSizePx = `${menuSize}px`
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
  --editor-small-menu-icon-size: v-bind(menuSizePx);
  --editor-border-radius: 4px;
}

$small-menu-icon-size: var(--editor-small-menu-icon-size);

$size: var(--editor-font-size);
$primary: var(--editor-primary);
$success: var(--editor-success);
$warning: var(--editor-warning);
$error: var(--editor-error);
$info: var(--editor-info);
$text: var(--editor-text);

@media (max-width: 480px) {
  .editor {
    &__menu {
      justify-content: space-between;

      &__button {
        font-size: $small-menu-icon-size;
      }
    }
  }
}

@media (min-width: 480px) {
  .editor {
    &__menu {
      &__button {
        font-size: $small-menu-icon-size;
      }
    }
  }
}

@media (min-width: 640px) {
  .editor {
    &__menu {
      &__button {
        font-size: 20px;
      }
    }
  }
}

@media (min-width: 768px) {
  .editor {
    &__menu {
      &__button {
        font-size: 22px;
      }
    }
  }
}

.editor {
  &__container {
    box-sizing: border-box;
    border-radius: 4px;
    color: #0d0d0d;
    display: flex;
    flex-direction: column;
    border: 1px solid #0d0d0d;
  }

  &__menu {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
    transition: opacity,height 0.1s;

    &__button {
      position: relative;
      outline: none;
      accent-color: black;
      border: none;
      cursor: pointer;
      margin: 0 4px;
      padding: 4px;
      border-radius: 2px;
      background: #fff;
      transition: transform 0.3s;

      &--reversal {
        transform: rotate(180deg);
      }

      &--divider::after {
        content: '';
        position: absolute;
        top: 26%;
        right: -8px;
        height: 48%;
        width: 1px;
        background-color: #363636;
      }

      &:last-child {
        margin-right: auto;
      }

      // &[data-position="top"]:after {
      //   content: '展开更多功能按钮';
      //   position: absolute;
      //   font-size: 12px;
      //   color: #909399;
      //   margin-top: -5px;
      //   margin-left: -5px;
      //   border-width: 5px;
      //   border-style: solid;
      //   border-color: #333 transparent transparent transparent;
      //   top: -100%;
      //   left: 50%;
      //   border-color: transparent transparent #333;
      //   border-top-width: 0;
      //   border-bottom-color: #333;
      // }
    }

    // &__button:hover,
    &__button.is-active {
      background-color: #e0e0e0;
    }

    &__button:active {
      background-color: transparent;
      border-color: transparent;
    }

  }

  &__content {
    box-sizing: border-box;
    width: 100%;
    height: 200px;
    overflow-y: auto;
    padding: 12px;
  }
}
</style>
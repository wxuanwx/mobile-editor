<template>
  <div class="editor">
    <h4>自定义富文本编辑器</h4>
  </div>
</template>

<script setup>
// 代码
</script>
<script>
export default {
  name: 'Editor'
}
</script>

<style lang="scss">
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
  font-size: var(--editor-font-size);
  border: 0;
  border-radius: var(--editor-border-radius);
  white-space: nowrap;
  background: none;
  outline: none;
  cursor: pointer;
}
</style>
<template>
  <div class="editor-container">
    <!-- 顶部工具栏 -->
    <Toolbar />

    <div class="editor-main">
      <!-- 左侧节点面板 -->
      <NodePanel />

      <!-- 中间画布 -->
      <Canvas />

      <!-- 右侧属性面板 -->
      <PropertyPanel />
    </div>

    <!-- 底部日志 -->
    <Logger />
  </div>
</template>

<script setup>
import Toolbar from './components/Toolbar.vue'
import NodePanel from './components/NodePanel.vue'
import Canvas from './components/Canvas.vue'
import PropertyPanel from './components/PropertyPanel.vue'
import Logger from './components/Logger.vue'

// Initialize editor
import { onMounted } from 'vue'
import { useWorkflowStore } from './stores/workflowStore.js'

const workflowStore = useWorkflowStore()

onMounted(() => {
  // Load saved workflow
  workflowStore.loadWorkflow()
})
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #f5f5f5;
}

.editor-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>

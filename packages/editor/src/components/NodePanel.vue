<template>
  <div class="node-panel">
    <div class="panel-header">
      <h3>节点库</h3>
      <el-input
        v-model="searchQuery"
        placeholder="搜索节点..."
        clearable
        style="width: 100%"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <div class="panel-content">
      <div v-if="filteredNodes.length === 0" class="empty-state">
        <p>暂无节点</p>
      </div>

      <div v-for="node in filteredNodes" :key="node.type" class="node-item" draggable="true" @dragstart="onDragStart($event, node)">
        <div class="node-icon">
          <el-icon>{{ getIcon(node.icon) }}</el-icon>
        </div>
        <div class="node-info">
          <div class="node-label">{{ node.label }}</div>
          <div class="node-desc">{{ node.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAllNodeTypes } from '@workflow-editor/core'
import { Search } from '@element-plus/icons-vue'

const searchQuery = ref('')
const allNodes = getAllNodeTypes()

const filteredNodes = computed(() => {
  if (!searchQuery.value) return allNodes
  return allNodes.filter(
    node =>
      node.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const onDragStart = (event, node) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('application/node', JSON.stringify({
    type: node.type,
    label: node.label
  }))
}

const getIcon = (iconName) => {
  // Placeholder for icon mapping
  return ''
}
</script>

<style scoped>
.node-panel {
  width: 250px;
  background: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.panel-header h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.node-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: move;
  transition: all 0.2s;
}

.node-item:hover {
  background: #efefef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.node-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  flex-shrink: 0;
}

.node-info {
  flex: 1;
  min-width: 0;
}

.node-label {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-desc {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 14px;
}
</style>

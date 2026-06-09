<template>
  <div :class="['node', `node-${node.data.type || 'default'}`]">
    <div class="node-header">
      <span class="node-title">{{ node.data.label }}</span>
    </div>
    <div class="node-body">
      <div class="node-content">
        {{ node.data.description || node.type }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  data: {
    type: Object,
    required: true
  },
  isConnecting: {
    type: Boolean
  },
  xPos: {
    type: Number
  },
  yPos: {
    type: Number
  }
})
</script>

<style scoped>
.node {
  background: white;
  border: 2px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  min-width: 160px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.node:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.node.selected {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.node-header {
  padding: 8px 12px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.node-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.node-body {
  padding: 8px 12px;
  min-height: 50px;
  display: flex;
  align-items: center;
}

.node-content {
  font-size: 12px;
  color: #666;
  white-space: pre-wrap;
  word-break: break-word;
}

.node-trigger {
  border-color: #67c23a;
}

.node-trigger .node-header {
  background: #f0f9ff;
}

.node-action {
  border-color: #409eff;
}

.node-action .node-header {
  background: #f0f9ff;
}

.node-transform {
  border-color: #e6a23c;
}

.node-transform .node-header {
  background: #fdf6ec;
}

.node-condition {
  border-color: #f56c6c;
}

.node-condition .node-header {
  background: #fef0f0;
}
</style>

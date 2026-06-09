<template>
  <div class="logger">
    <div class="logger-header">
      <h4>执行日志</h4>
      <el-button-group>
        <el-button size="small" @click="clearLogs">
          <el-icon><Delete /></el-icon>
        </el-button>
      </el-button-group>
    </div>

    <div class="logger-content">
      <div v-if="logs.length === 0" class="empty-logs">
        <p>暂无日志</p>
      </div>

      <div v-for="(log, index) in logs" :key="index" :class="['log-item', `log-${log.type}`]">
        <div class="log-time">{{ formatTime(log.timestamp) }}</div>
        <div class="log-message">{{ log.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWorkflowStore } from '../stores/workflowStore.js'
import { formatDate } from '@workflow-editor/core'
import { Delete } from '@element-plus/icons-vue'

const workflowStore = useWorkflowStore()

const logs = computed(() => workflowStore.logs)

const clearLogs = () => {
  workflowStore.clearLogs()
}

const formatTime = (date) => {
  if (!(date instanceof Date)) return ''
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
</script>

<style scoped>
.logger {
  height: 150px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.logger-header {
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.logger-header h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.logger-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.log-item {
  display: flex;
  gap: 8px;
  padding: 4px 0;
  line-height: 1.4;
}

.log-time {
  color: #999;
  flex-shrink: 0;
}

.log-message {
  color: #666;
  flex: 1;
  word-break: break-all;
}

.log-info {
  color: #0066cc;
}

.log-success {
  color: #67c23a;
}

.log-warning {
  color: #e6a23c;
}

.log-error {
  color: #f56c6c;
}

.empty-logs {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 12px;
}
</style>

<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="workflow-name">
        <el-input
          v-model="workflow.name"
          placeholder="输入工作流名称"
          style="width: 200px"
          @blur="saveWorkflow"
        />
      </div>
    </div>

    <div class="toolbar-center">
      <el-button-group>
        <el-button @click="handleUndo" :disabled="!canUndo">
          <el-icon><Back /></el-icon>
          撤销
        </el-button>
        <el-button @click="handleRedo" :disabled="!canRedo">
          <el-icon><Forward /></el-icon>
          重做
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleSave">
          <el-icon><DocumentCopy /></el-icon>
          保存
        </el-button>
        <el-button @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleClear" type="danger">
          <el-icon><Delete /></el-icon>
          清空
        </el-button>
      </el-button-group>
    </div>

    <div class="toolbar-right">
      <span v-if="hasUnsavedChanges" class="unsaved-indicator">
        <el-icon><Warning /></el-icon>
        未保存
      </span>
      <span class="status-text">节点: {{ workflow.nodes.length }} | 连接: {{ workflow.edges.length }}</span>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="onFileImport"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWorkflowStore } from '../stores/workflowStore.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Back,
  Forward,
  DocumentCopy,
  Download,
  Upload,
  Delete,
  Warning
} from '@element-plus/icons-vue'

const workflowStore = useWorkflowStore()
const fileInput = ref(null)
const canUndo = ref(false)
const canRedo = ref(false)

const workflow = workflowStore.workflow
const hasUnsavedChanges = workflowStore.hasUnsavedChanges

const handleUndo = () => {
  ElMessage.info('撤销功能暂未实现')
}

const handleRedo = () => {
  ElMessage.info('重做功能暂未实现')
}

const handleSave = () => {
  workflowStore.saveWorkflow()
}

const handleExport = () => {
  workflowStore.exportWorkflow()
}

const handleImport = () => {
  fileInput.value.click()
}

const handleClear = () => {
  ElMessageBox.confirm(
    '确认要清空所有节点和连接吗？此操作无法撤销。',
    '警告',
    {
      confirmButtonText: '确��',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      workflowStore.clearWorkflow()
      ElMessage.success('工作流已清空')
    })
    .catch(() => {
      ElMessage.info('已取消')
    })
}

const onFileImport = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = workflowStore.importWorkflow(e.target.result)
    if (result) {
      ElMessage.success('工作流导入成功')
    }
  }
  reader.readAsText(file)
  fileInput.value.value = ''
}

const saveWorkflow = () => {
  workflowStore.saveWorkflow()
}
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  gap: 16px;
}

.toolbar-left {
  flex: 0 0 auto;
}

.toolbar-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.toolbar-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: #666;
}

.workflow-name {
  display: flex;
  align-items: center;
}

.unsaved-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #e6a23c;
  font-weight: 500;
}

.status-text {
  color: #999;
  font-size: 12px;
}
</style>

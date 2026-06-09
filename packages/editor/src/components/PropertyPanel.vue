<template>
  <div class="property-panel">
    <div class="panel-header">
      <h3>{{ selectedNode ? '节点属性' : '属性编辑' }}</h3>
    </div>

    <div class="panel-content">
      <div v-if="!selectedNode" class="empty-state">
        <p>选择节点查看属性</p>
      </div>

      <div v-else class="property-form">
        <el-form label-width="80px" size="small">
          <el-form-item label="节点ID">
            <el-input v-model="selectedNode.id" disabled />
          </el-form-item>

          <el-form-item label="节点类型">
            <el-input v-model="selectedNode.type" disabled />
          </el-form-item>

          <el-form-item label="节点标签">
            <el-input
              v-model="selectedNode.label"
              @blur="updateNode('label', selectedNode.label)"
            />
          </el-form-item>

          <el-form-item label="描述">
            <el-input
              v-model="selectedNode.data.description"
              type="textarea"
              rows="3"
              @blur="updateNode('data', { ...selectedNode.data })"
            />
          </el-form-item>

          <el-divider />

          <div class="section-title">位置信息</div>

          <el-form-item label="X">
            <el-input-number
              v-model="selectedNode.position.x"
              @change="updatePosition"
            />
          </el-form-item>

          <el-form-item label="Y">
            <el-input-number
              v-model="selectedNode.position.y"
              @change="updatePosition"
            />
          </el-form-item>

          <el-divider />

          <div class="section-title">其他</div>

          <el-form-item label="启用">
            <el-switch
              v-model="selectedNode.disabled"
              :active-value="false"
              :inactive-value="true"
              @change="updateNode('disabled', selectedNode.disabled)"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWorkflowStore } from '../stores/workflowStore.js'

const workflowStore = useWorkflowStore()

const selectedNode = computed(() => workflowStore.selectedNode)

const updateNode = (field, value) => {
  if (!selectedNode.value) return
  const updates = {}
  updates[field] = value
  workflowStore.updateNode(selectedNode.value.id, updates)
}

const updatePosition = () => {
  if (!selectedNode.value) return
  updateNode('position', { ...selectedNode.value.position })
}
</script>

<style scoped>
.property-panel {
  width: 280px;
  background: white;
  border-left: 1px solid #e0e0e0;
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
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 14px;
}

.property-form {
  width: 100%;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin: 8px 0 8px 0;
  text-transform: uppercase;
}
</style>

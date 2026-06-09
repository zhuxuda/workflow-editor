import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORAGE_KEYS, generateId, deepClone } from '@workflow-editor/core'

export const useWorkflowStore = defineStore('workflow', () => {
  // State
  const workflow = ref({
    id: generateId(),
    name: 'Untitled Workflow',
    description: '',
    nodes: [],
    edges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const selectedNodeId = ref(null)
  const selectedEdgeId = ref(null)
  const isDirty = ref(false)
  const logs = ref([])

  // Computed
  const selectedNode = computed(() => {
    return workflow.value.nodes.find(n => n.id === selectedNodeId.value) || null
  })

  const selectedEdge = computed(() => {
    return workflow.value.edges.find(e => e.id === selectedEdgeId.value) || null
  })

  const hasUnsavedChanges = computed(() => isDirty.value)

  // Methods
  function addNode(node) {
    workflow.value.nodes.push({
      id: node.id || generateId(),
      type: node.type,
      label: node.label || node.type,
      position: node.position || { x: 0, y: 0 },
      data: node.data || {},
      ...node
    })
    markDirty()
  }

  function removeNode(nodeId) {
    workflow.value.nodes = workflow.value.nodes.filter(n => n.id !== nodeId)
    workflow.value.edges = workflow.value.edges.filter(
      e => e.source !== nodeId && e.target !== nodeId
    )
    if (selectedNodeId.value === nodeId) {
      selectedNodeId.value = null
    }
    markDirty()
  }

  function updateNode(nodeId, updates) {
    const node = workflow.value.nodes.find(n => n.id === nodeId)
    if (node) {
      Object.assign(node, updates)
      markDirty()
    }
  }

  function addEdge(edge) {
    workflow.value.edges.push({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle || 'out-0',
      targetHandle: edge.targetHandle || 'in-0',
      ...edge
    })
    markDirty()
  }

  function removeEdge(edgeId) {
    workflow.value.edges = workflow.value.edges.filter(e => e.id !== edgeId)
    if (selectedEdgeId.value === edgeId) {
      selectedEdgeId.value = null
    }
    markDirty()
  }

  function selectNode(nodeId) {
    selectedNodeId.value = nodeId
    selectedEdgeId.value = null
  }

  function selectEdge(edgeId) {
    selectedEdgeId.value = edgeId
    selectedNodeId.value = null
  }

  function deselectAll() {
    selectedNodeId.value = null
    selectedEdgeId.value = null
  }

  function saveWorkflow() {
    workflow.value.updatedAt = new Date()
    localStorage.setItem(STORAGE_KEYS.WORKFLOW, JSON.stringify(workflow.value))
    isDirty.value = false
    addLog('Workflow saved successfully', 'success')
  }

  function loadWorkflow() {
    const saved = localStorage.getItem(STORAGE_KEYS.WORKFLOW)
    if (saved) {
      try {
        workflow.value = JSON.parse(saved)
        isDirty.value = false
        addLog('Workflow loaded successfully', 'success')
      } catch (error) {
        addLog('Failed to load workflow: ' + error.message, 'error')
      }
    }
  }

  function clearWorkflow() {
    workflow.value = {
      id: generateId(),
      name: 'Untitled Workflow',
      description: '',
      nodes: [],
      edges: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    deselectAll()
    markDirty()
  }

  function exportWorkflow() {
    const json = JSON.stringify(workflow.value, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${workflow.value.name}.json`
    link.click()
    URL.revokeObjectURL(url)
    addLog('Workflow exported successfully', 'success')
  }

  function importWorkflow(jsonData) {
    try {
      const imported = JSON.parse(jsonData)
      workflow.value = {
        ...imported,
        id: imported.id || generateId(),
        updatedAt: new Date()
      }
      deselectAll()
      isDirty.value = false
      addLog('Workflow imported successfully', 'success')
      return true
    } catch (error) {
      addLog('Failed to import workflow: ' + error.message, 'error')
      return false
    }
  }

  function addLog(message, type = 'info', timestamp = new Date()) {
    logs.value.push({
      message,
      type,
      timestamp
    })
    // Keep only last 100 logs
    if (logs.value.length > 100) {
      logs.value.shift()
    }
  }

  function clearLogs() {
    logs.value = []
  }

  function markDirty() {
    isDirty.value = true
  }

  return {
    // State
    workflow,
    selectedNodeId,
    selectedEdgeId,
    isDirty,
    logs,

    // Computed
    selectedNode,
    selectedEdge,
    hasUnsavedChanges,

    // Methods
    addNode,
    removeNode,
    updateNode,
    addEdge,
    removeEdge,
    selectNode,
    selectEdge,
    deselectAll,
    saveWorkflow,
    loadWorkflow,
    clearWorkflow,
    exportWorkflow,
    importWorkflow,
    addLog,
    clearLogs,
    markDirty
  }
})

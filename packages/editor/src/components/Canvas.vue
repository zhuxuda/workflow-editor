<template>
  <div class="canvas-container">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :node-types="nodeTypes"
      @nodes-change="onNodesChange"
      @edges-change="onEdgesChange"
      @connect="onConnect"
      @dragover="onDragOver"
      @drop="onDrop"
      @node-click="onNodeClick"
      @pane-click="onPaneClick"
    >
      <Background />
      <Controls />
      <MiniMap />
    </VueFlow>
  </div>
</template>

<script setup>
import { ref, computed, h, markRaw } from 'vue'
import { VueFlow, Background, Controls, MiniMap, useVueFlow } from '@vue-flow/core'
import { useWorkflowStore } from '../stores/workflowStore.js'
import { generateEdgeId } from '@workflow-editor/core'
import BaseNode from './nodes/BaseNode.vue'

const workflowStore = useWorkflowStore()
const { project, addNodes, addEdges, setEdges, setNodes, getNode } = useVueFlow()

const nodes = computed(() => {
  return workflowStore.workflow.nodes.map(node => ({
    ...node,
    selected: node.id === workflowStore.selectedNodeId
  }))
})

const edges = computed(() => {
  return workflowStore.workflow.edges.map(edge => ({
    ...edge,
    selected: edge.id === workflowStore.selectedEdgeId
  }))
})

const nodeTypes = {
  default: markRaw(BaseNode)
}

const onNodesChange = (changes) => {
  changes.forEach(change => {
    if (change.type === 'position' && change.position) {
      workflowStore.updateNode(change.id, {
        position: change.position
      })
    } else if (change.type === 'remove') {
      workflowStore.removeNode(change.id)
    } else if (change.type === 'select') {
      if (change.selected) {
        workflowStore.selectNode(change.id)
      } else if (workflowStore.selectedNodeId === change.id) {
        workflowStore.deselectAll()
      }
    }
  })
}

const onEdgesChange = (changes) => {
  changes.forEach(change => {
    if (change.type === 'remove') {
      workflowStore.removeEdge(change.id)
    } else if (change.type === 'select') {
      if (change.selected) {
        workflowStore.selectEdge(change.id)
      } else if (workflowStore.selectedEdgeId === change.id) {
        workflowStore.deselectAll()
      }
    }
  })
}

const onConnect = (connection) => {
  const edgeId = generateEdgeId(
    connection.source,
    connection.target,
    connection.sourceHandle,
    connection.targetHandle
  )
  workflowStore.addEdge({
    id: edgeId,
    source: connection.source,
    target: connection.target,
    sourceHandle: connection.sourceHandle,
    targetHandle: connection.targetHandle
  })
}

const onDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const onDrop = (event) => {
  event.preventDefault()
  const nodeData = event.dataTransfer.getData('application/node')
  if (!nodeData) return

  try {
    const node = JSON.parse(nodeData)
    const position = project({
      x: event.clientX,
      y: event.clientY
    })

    workflowStore.addNode({
      type: node.type,
      label: node.label,
      position,
      data: {
        label: node.label
      }
    })
  } catch (error) {
    console.error('Failed to drop node:', error)
  }
}

const onNodeClick = (event) => {
  workflowStore.selectNode(event.node.id)
}

const onPaneClick = () => {
  workflowStore.deselectAll()
}
</script>

<style scoped>
.canvas-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

:deep(.vue-flow) {
  width: 100%;
  height: 100%;
}
</style>

import { ref, computed } from 'vue'
import { useWorkflowStore } from '../stores/workflowStore.js'

/**
 * Composable for node operations
 */
export function useNodeOperations() {
  const workflowStore = useWorkflowStore()
  const selectedNode = computed(() => workflowStore.selectedNode)

  const addNode = (nodeData) => {
    workflowStore.addNode(nodeData)
  }

  const removeNode = (nodeId) => {
    workflowStore.removeNode(nodeId)
  }

  const updateNode = (nodeId, updates) => {
    workflowStore.updateNode(nodeId, updates)
  }

  const selectNode = (nodeId) => {
    workflowStore.selectNode(nodeId)
  }

  const deselectNode = () => {
    workflowStore.deselectAll()
  }

  const duplicateNode = (nodeId) => {
    const node = workflowStore.workflow.nodes.find(n => n.id === nodeId)
    if (node) {
      const newNode = {
        ...JSON.parse(JSON.stringify(node)),
        id: `${node.id}-copy-${Date.now()}`,
        position: {
          x: node.position.x + 50,
          y: node.position.y + 50
        }
      }
      addNode(newNode)
      return newNode.id
    }
    return null
  }

  return {
    selectedNode,
    addNode,
    removeNode,
    updateNode,
    selectNode,
    deselectNode,
    duplicateNode
  }
}

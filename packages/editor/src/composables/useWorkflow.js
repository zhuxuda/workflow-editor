import { ref, computed } from 'vue'
import { useWorkflowStore } from '../stores/workflowStore.js'

/**
 * Composable for workflow operations
 */
export function useWorkflow() {
  const workflowStore = useWorkflowStore()

  const workflow = computed(() => workflowStore.workflow)
  const nodes = computed(() => workflowStore.workflow.nodes)
  const edges = computed(() => workflowStore.workflow.edges)
  const hasUnsavedChanges = computed(() => workflowStore.hasUnsavedChanges)

  const save = () => workflowStore.saveWorkflow()
  const load = () => workflowStore.loadWorkflow()
  const clear = () => workflowStore.clearWorkflow()
  const export_ = () => workflowStore.exportWorkflow()
  const import_ = (data) => workflowStore.importWorkflow(data)

  return {
    workflow,
    nodes,
    edges,
    hasUnsavedChanges,
    save,
    load,
    clear,
    export: export_,
    import: import_
  }
}

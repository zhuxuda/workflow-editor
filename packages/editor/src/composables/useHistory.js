import { ref, computed } from 'vue'

/**
 * Composable for undo/redo history management
 */
export function useHistory(maxHistorySize = 50) {
  const history = ref([])
  const currentIndex = ref(-1)

  const canUndo = computed(() => currentIndex.value > 0)
  const canRedo = computed(() => currentIndex.value < history.value.length - 1)

  const push = (state) => {
    // Remove any redo history when new state is added
    if (currentIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, currentIndex.value + 1)
    }

    // Add new state
    history.value.push(JSON.parse(JSON.stringify(state)))
    currentIndex.value++

    // Limit history size
    if (history.value.length > maxHistorySize) {
      history.value.shift()
      currentIndex.value--
    }
  }

  const undo = () => {
    if (canUndo.value) {
      currentIndex.value--
      return history.value[currentIndex.value]
    }
    return null
  }

  const redo = () => {
    if (canRedo.value) {
      currentIndex.value++
      return history.value[currentIndex.value]
    }
    return null
  }

  const clear = () => {
    history.value = []
    currentIndex.value = -1
  }

  return {
    canUndo,
    canRedo,
    push,
    undo,
    redo,
    clear
  }
}

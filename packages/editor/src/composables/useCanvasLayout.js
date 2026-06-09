import dagre from 'dagre'
import { GRID_SIZE } from '@workflow-editor/core'

/**
 * Composable for canvas layout operations
 */
export function useCanvasLayout() {
  /**
   * Auto-layout using Dagre algorithm
   */
  const autoLayout = (nodes, edges, direction = 'TB') => {
    const g = new dagre.graphlib.Graph()
    g.setGraph({ rankdir: direction, nodesep: 50, ranksep: 80 })
    g.setDefaultEdgeLabel(() => ({}))

    // Add nodes
    nodes.forEach(node => {
      g.setNode(node.id, {
        width: node.width || 200,
        height: node.height || 100
      })
    })

    // Add edges
    edges.forEach(edge => {
      g.setEdge(edge.source, edge.target)
    })

    // Run layout
    dagre.layout(g)

    // Extract positions
    const layoutedNodes = nodes.map(node => {
      const pos = g.node(node.id)
      return {
        ...node,
        position: {
          x: Math.round((pos.x - (node.width || 200) / 2) / GRID_SIZE) * GRID_SIZE,
          y: Math.round((pos.y - (node.height || 100) / 2) / GRID_SIZE) * GRID_SIZE
        }
      }
    })

    return layoutedNodes
  }

  /**
   * Align nodes
   */
  const alignNodes = (nodeIds, nodes, direction) => {
    const selectedNodes = nodes.filter(n => nodeIds.includes(n.id))
    if (selectedNodes.length < 2) return nodes

    let reference
    switch (direction) {
      case 'left':
        reference = Math.min(...selectedNodes.map(n => n.position.x))
        return nodes.map(n => 
          nodeIds.includes(n.id) ? { ...n, position: { ...n.position, x: reference } } : n
        )
      case 'right':
        reference = Math.max(...selectedNodes.map(n => n.position.x))
        return nodes.map(n => 
          nodeIds.includes(n.id) ? { ...n, position: { ...n.position, x: reference } } : n
        )
      case 'top':
        reference = Math.min(...selectedNodes.map(n => n.position.y))
        return nodes.map(n => 
          nodeIds.includes(n.id) ? { ...n, position: { ...n.position, y: reference } } : n
        )
      case 'bottom':
        reference = Math.max(...selectedNodes.map(n => n.position.y))
        return nodes.map(n => 
          nodeIds.includes(n.id) ? { ...n, position: { ...n.position, y: reference } } : n
        )
      default:
        return nodes
    }
  }

  /**
   * Distribute nodes evenly
   */
  const distributeNodes = (nodeIds, nodes, direction) => {
    const selectedNodes = nodes.filter(n => nodeIds.includes(n.id))
    if (selectedNodes.length < 3) return nodes

    const sortedNodes = [...selectedNodes]
    let spacing

    if (direction === 'horizontal') {
      sortedNodes.sort((a, b) => a.position.x - b.position.x)
      const minX = sortedNodes[0].position.x
      const maxX = sortedNodes[sortedNodes.length - 1].position.x
      spacing = (maxX - minX) / (sortedNodes.length - 1)

      return nodes.map(n => {
        const idx = sortedNodes.findIndex(sn => sn.id === n.id)
        if (idx !== -1) {
          return {
            ...n,
            position: { ...n.position, x: minX + idx * spacing }
          }
        }
        return n
      })
    } else {
      sortedNodes.sort((a, b) => a.position.y - b.position.y)
      const minY = sortedNodes[0].position.y
      const maxY = sortedNodes[sortedNodes.length - 1].position.y
      spacing = (maxY - minY) / (sortedNodes.length - 1)

      return nodes.map(n => {
        const idx = sortedNodes.findIndex(sn => sn.id === n.id)
        if (idx !== -1) {
          return {
            ...n,
            position: { ...n.position, y: minY + idx * spacing }
          }
        }
        return n
      })
    }
  }

  return {
    autoLayout,
    alignNodes,
    distributeNodes
  }
}

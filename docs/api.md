# API 文档

## 核心导出

### 常量 (constants.js)

```javascript
import {
  NODE_TYPES,
  CONNECTION_TYPES,
  EXECUTION_STATUS,
  HANDLE_POSITION,
  NODE_SIZE,
  GRID_SIZE,
  CANVAS_DEFAULT_ZOOM,
  STORAGE_KEYS,
  ERROR_MESSAGES
} from '@workflow-editor/core'
```

### 工具函数 (utils.js)

```javascript
import {
  generateId,
  generateEdgeId,
  snapToGrid,
  snapPositionToGrid,
  validateNode,
  validateConnection,
  validateWorkflow,
  deepClone,
  getUnique,
  findNodeById,
  findEdgeById,
  getConnectedNodes,
  calculateBoundingBox,
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
  formatDate
} from '@workflow-editor/core'
```

### 节点注册 (nodeRegistry.js)

```javascript
import {
  registerNodeType,
  unregisterNodeType,
  getNodeDefinition,
  getAllNodeTypes,
  hasNodeType,
  getNodesByCategory,
  clearRegistry,
  registerNodeTypes
} from '@workflow-editor/core'
```

## Pinia Store API

### useWorkflowStore()

```javascript
const {
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
} = useWorkflowStore()
```

## Composables

### useWorkflow()

```javascript
const {
  workflow,      // 当前工作流
  nodes,         // 所有节点
  edges,         // 所��连接
  hasUnsavedChanges, // 是否有未保存更改
  save,          // 保存工作流
  load,          // 加载工作流
  clear,         // 清空工作流
  export,        // 导出工作流
  import         // 导入工作流
} = useWorkflow()
```

### useNodeOperations()

```javascript
const {
  selectedNode,      // 当前选中节点
  addNode,          // 添加节点
  removeNode,       // 删除节点
  updateNode,       // 更新节点
  selectNode,       // 选中节点
  deselectNode,     // 取消选择
  duplicateNode     // 复制节点
} = useNodeOperations()
```

### useHistory(maxHistorySize)

```javascript
const {
  canUndo,  // 是否可撤销
  canRedo,  // 是否可重做
  push,     // 推送状态
  undo,     // 撤销
  redo,     // 重做
  clear     // 清空历史
} = useHistory(50)
```

### useCanvasLayout()

```javascript
const {
  autoLayout,      // 自动布局（使用 Dagre）
  alignNodes,      // 对齐节点（left/right/top/bottom）
  distributeNodes  // 均匀分布节点（horizontal/vertical）
} = useCanvasLayout()
```

## 节点定义接口

```javascript
{
  // 必需字段
  type: 'node-type',           // 节点类型标识
  label: 'Node Label',         // 显示标签
  component: ComponentDefinition, // Vue 组件
  
  // 可选字段
  description: '',             // 节点描述
  icon: 'icon-name',          // 图标名称
  category: 'custom',          // 节点分类
  inputs: [],                  // 输入端口
  outputs: [],                 // 输出端口
  properties: {}               // 属性定义
}
```

## 工作流对象结构

```javascript
{
  id: 'workflow-1',           // 工作流 ID
  name: 'My Workflow',        // 工作流名称
  description: '',            // 描述
  nodes: [                    // 节点数组
    {
      id: 'node-1',
      type: 'trigger',
      label: 'Trigger',
      position: { x: 0, y: 0 },
      data: {},
      disabled: false
    }
  ],
  edges: [                    // 连接数组
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      sourceHandle: 'out-0',
      targetHandle: 'in-0'
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## 事件和钩子

### VueFlow 事件

```javascript
<VueFlow
  @nodes-change="onNodesChange"
  @edges-change="onEdgesChange"
  @connect="onConnect"
  @node-click="onNodeClick"
  @pane-click="onPaneClick"
  @drag-start="onDragStart"
  @drag-stop="onDragStop"
/>
```

## 常见操作示例

### 创建新节点

```javascript
const { addNode } = useNodeOperations()

addNode({
  type: 'http-request',
  label: 'API Call',
  position: { x: 100, y: 100 },
  data: {
    url: 'https://api.example.com',
    method: 'GET'
  }
})
```

### 连接两个节点

```javascript
const workflowStore = useWorkflowStore()

workflowStore.addEdge({
  id: 'edge-1',
  source: 'node-1',
  target: 'node-2',
  sourceHandle: 'out-0',
  targetHandle: 'in-0'
})
```

### 导出工作流

```javascript
const { exportWorkflow } = useWorkflow()

exportWorkflow() // 下载 JSON 文件
```

### 自动布局

```javascript
const { autoLayout } = useCanvasLayout()
const { workflow } = useWorkflow()

const layoutedNodes = autoLayout(workflow.nodes, workflow.edges, 'TB')
```

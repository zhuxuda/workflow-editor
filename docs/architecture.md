# 项目架构

## 整体架构

```
┌─────────────────────────────────────────────┐
│         Workflow Editor UI                  │
│  (Vue 3 Components)                         │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────┬─────────┬──────────────┐ │
│  │   Toolbar    │ Canvas  │ PropertyPanel│ │
│  ├───────────────┼─────────┼──────────────┤ │
│  │  NodePanel   │ VueFlow │    Logger    │ │
│  └───────────────┴─────────┴──────────────┘ │
│                                             │
├─────────────────────────────────────────────┤
│         Pinia Store (State Management)      │
│  (useWorkflowStore)                         │
├─────────────────────────────────────────────┤
│         Composables (Business Logic)        │
│  - useWorkflow                              │
│  - useNodeOperations                        │
│  - useHistory                               │
│  - useCanvasLayout                          │
├─────────────────────────────────────────────┤
│    Core Package (@workflow-editor/core)    │
│  - Constants                                │
│  - Utils & Validators                       │
│  - Node Registry                            │
├─────────────────────────────────────────────┤
│    Built-in Nodes (@workflow-editor/nodes) │
│  - Trigger Nodes                            │
│  - Action Nodes                             │
│  - Transform Nodes                          │
├─────────────────────────────────────────────┤
│        Storage Layer (localStorage)         │
└─────────────────────────────────────────────┘
```

## 数据流

### 工作流数据流

```
User Input
    ↓
UI Components (Vue)
    ↓
Composables / Store
    ↓
Core Functions
    ↓
localStorage
```

### 节点创建流程

```
1. 用户从节点面板拖拽节点
   ↓
2. Canvas 组件的 onDrop 事件触发
   ↓
3. 解析拖拽数据，获取节点类型
   ↓
4. 计算节点位置（canvas 坐标）
   ↓
5. 调用 workflowStore.addNode()
   ↓
6. 更新 store 中的 nodes 数组
   ↓
7. Vue 响应式更新 UI
   ↓
8. VueFlow 渲染新节点
```

### 连接创建流程

```
1. 用户从输出端口拖拽到输入端口
   ↓
2. VueFlow onConnect 事件触发
   ↓
3. 验证连接有效性
   ↓
4. 生成唯一的 edge ID
   ↓
5. 调用 workflowStore.addEdge()
   ↓
6. 更新 store 中的 edges 数组
   ↓
7. UI 自动更新显示连接线
```

## 文件结构详解

### packages/core

**常量定义** (constants.js)
- 节点类型、连接类型、执行状态等常量
- UI 配置常量（网格大小、缩放范围等）
- 存储键和错误消息

**工具函数** (utils.js)
- ID 生成
- 位置计算和网格对齐
- 数据验证
- 深拷贝和数组操作
- 本地存储操作
- 日期格式化

**节点注册系统** (nodeRegistry.js)
- 全局节点注册表（Map）
- 节点注册/注销/查询接口
- 节点分类查询

### packages/editor

**组件** (components/)
- `Toolbar.vue` - 操作工具栏
- `Canvas.vue` - VueFlow 画布
- `NodePanel.vue` - 节点库面板
- `PropertyPanel.vue` - 属性编辑面板
- `Logger.vue` - 执行日志面板
- `nodes/BaseNode.vue` - 基础节点组件

**Store** (stores/)
- `workflowStore.js` - 工作流全局状态
  - workflow 对象（节点和连接）
  - 选中状态
  - 脏标志
  - 日志记录

**Composables** (composables/)
- `useWorkflow.js` - 工作流操作接口
- `useNodeOperations.js` - 节点操作接口
- `useHistory.js` - 撤销/重做管理
- `useCanvasLayout.js` - 布局算法

### packages/nodes

**内置节点**
- `trigger/` - 触发器节点（手动、定时、Webhook）
- `action/` - 操作节点（HTTP、数据库、邮件等）
- `transform/` - 转换节点（JS、JSON、映射等）

## 状态管理设计

### Pinia Store 结构

```javascript
{
  // 核心数据
  workflow: {
    id,
    name,
    description,
    nodes: [],
    edges: [],
    createdAt,
    updatedAt
  },
  
  // UI 状态
  selectedNodeId,
  selectedEdgeId,
  isDirty,
  logs: []
}
```

### 响应式计算

```javascript
- selectedNode: 基于 selectedNodeId 计算当前选中节点
- selectedEdge: 基于 selectedEdgeId 计算当前选中连接
- hasUnsavedChanges: isDirty 的计算属性
```

## 关键设计决策

1. **Monorepo 结构**
   - 核心逻辑与 UI 分离
   - 支持在其他项目中使用核心功能

2. **无 TypeScript**
   - 降低学习成本
   - 更快的开发速度
   - 清晰的 JavaScript 代码

3. **局部存储持久化**
   - 无需后端
   - 用户数据完全本地化
   - 支持多标签页隔离

4. **Pinia 集中式状态管理**
   - 单一数据源
   - 便于调试和追踪
   - 支持时间旅行调试

5. **组件化节点系统**
   - 易于扩展
   - 节点定义与渲染分离
   - 支持自定义节点

## 扩展点

### 1. 添加新节点类型

```javascript
// 定义节点
const MyNode = { /* ... */ }

// 注册节点
registerNodeType('my-node', MyNode)
```

### 2. 自定义 Vue 组件

创建自定义节点渲染组件，扩展基础节点功能。

### 3. 集成执行引擎

实现工作流执行逻辑，根据节点类型执行不同操作。

### 4. 后端集成

替换 localStorage 为后端 API，支持云同步。

### 5. 实时协作

使用 WebSocket 或 Operational Transformation 支持多用户编辑。

## 性能考虑

1. **虚拟滚动** - 大型节点列表使用虚拟滚动
2. **防抖/节流** - 保存和布局操作防抖
3. **懒加载** - 组件和功能按需加载
4. **缓存** - 缓存节点定义和计算结果
5. **Web Workers** - 复杂计算在 Worker 中执行

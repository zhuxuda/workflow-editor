# 快速开始

## 安装

### 1. 克隆仓库

```bash
git clone https://github.com/zhuxuda/workflow-editor.git
cd workflow-editor
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
cd packages/editor
pnpm dev
```

打开浏览器访问 `http://localhost:5173`

## 基础使用

### 创建工作流

1. **从节点库中拖拽节点**到画布上
   - 左侧节点面板显示所有可用节点
   - 支持搜索功能快速查找节点

2. **连接节点**
   - 从一个节点的输出端口拖拽到另一个节点的输入端口
   - 创建数据流连接

3. **配置节点属性**
   - 点击节点选中
   - 在右侧属性面板修改节点参数

4. **保存工作流**
   - 点击工具栏的"保存"按钮
   - 工作流自动保存到浏览器本地存储

### 导出和导入

**导出工作流**
```bash
# 点击工具栏的"导出"按钮
# 工作流将以 JSON 格式下载
```

**导入工作流**
```bash
# 点击工具栏��"导入"按钮
# 选择之前导出的 JSON 文件
```

## 工作流结构

```javascript
{
  id: 'workflow-1',
  name: '我的工作流',
  description: '工作流描述',
  nodes: [
    {
      id: 'node-1',
      type: 'manual-trigger',
      label: '手动触发',
      position: { x: 0, y: 0 },
      data: {}
    }
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      sourceHandle: 'out-0',
      targetHandle: 'in-0'
    }
  ],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
}
```

## 键盘快捷键

| 快捷键 | 功能 |
|-------|------|
| `Delete` | 删除选中节点 |
| `Ctrl+Z` | 撤销 |
| `Ctrl+Y` | 重做 |
| `Ctrl+S` | 保存 |
| `Ctrl+A` | 全选 |
| `Escape` | 取消选择 |

## 常见问题

### 工作流没有保存

确保浏览器允许本地存储。检查浏览器设置中的隐私/存储权限。

### 节点无法连接

检查节点的输入/输出端口类型是否兼容。不同类型的端口无法直接连接。

### 性能问题

大型工作流（超过 100 个节点）可能会影响性能。建议将大型工作流分解为多个较小的工作流。

## 下一步

- 了解如何[创建自定义节点](./custom-nodes.md)
- 查看[完整 API 文档](./api.md)
- 探索[项目架构](./architecture.md)

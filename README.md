# 🎯 Workflow Editor - 开源工作流编辑器

一个基于 Vue 3 + VueFlow 的轻量级、高扩展性的工作流编辑器框架。灵感来自 [n8n](https://github.com/n8n-io/n8n)，专为开发者设计。

![License](https://img.shields.io/badge/license-MIT-green)
![Vue](https://img.shields.io/badge/vue-3.x-green)
![Vite](https://img.shields.io/badge/vite-5.x-green)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow)

## ✨ 特性

- 🎨 **可视化编辑** - 基于 VueFlow 的拖拽式节点编辑
- 🔗 **灵活连接** - 支持节点间的多种连接方式
- 📦 **节点系统** - 完整的节点注册和管理系统
- ⚙️ **配置面板** - 直观的节点属性编辑
- 💾 **持久化** - 工作流保存/加载/导出
- ↩️ **历史记录** - 撤销/重做功能
- 🎯 **自动布局** - Dagre 智能布局
- 📝 **日志系统** - 实时执行日志显示
- 🧩 **可扩展** - 轻松添加自定义节点
- 🚀 **轻量级** - 无 TypeScript，代码简洁易懂

## 🚀 快速开始

### 前置要求

- Node.js >= 16
- pnpm >= 8

### 安装

```bash
# 克隆仓库
git clone https://github.com/zhuxuda/workflow-editor.git
cd workflow-editor

# 安装依赖
pnpm install

# 启动开发服务器
cd packages/editor
pnpm dev
```

打开 http://localhost:5173 查看编辑器。

## 📁 项目结构

```
workflow-editor/
├── packages/
│   ├── core/                    # 核心引擎
│   │   ├── src/
│   │   │   ├── constants.js     # 常量定义
│   │   │   ├── utils.js         # 工具函数
│   │   │   ├── nodeRegistry.js  # 节点注册系统
│   │   │   └── index.js
│   │   └── package.json
│   │
│   ├── editor/                  # Vue3 编辑器应用
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── composables/
│   │   │   ├── stores/
│   │   │   ├── styles/
│   │   │   ├── App.vue
│   │   │   ├── main.js
│   │   │   └── index.html
│   │   ├── vite.config.js
│   │   └── package.json
│   │
│   └── nodes/                   # 内置节点库
│       ├── src/
│       │   ├── trigger/
│       │   ├── action/
│       │   ├── transform/
│       │   └── index.js
│       └── package.json
│
├── examples/                    # 示例工作流
├── docs/                        # 文档
├── .github/workflows/           # CI/CD
├── package.json
└── README.md
```

## 📚 文档

- [快速开始](./docs/getting-started.md)
- [自定义节点](./docs/custom-nodes.md)
- [API 文档](./docs/api.md)
- [架构说明](./docs/architecture.md)

## 🎯 核心概念

### 节点 (Node)
工作流的基本单元，代表一个操作或处理。

### 连接 (Edge)
节点之间的数据流连接。

### 工作流 (Workflow)
节点和连接的组合。

## 🧩 创建自定义节点

```javascript
// myCustomNode.js
export const MyCustomNode = {
  type: 'myCustom',
  label: '我的自定义节点',
  description: '自定义节点示例',
  icon: 'icon-name',
  inputs: [
    { id: 'input1', label: '输入1', type: 'main' }
  ],
  outputs: [
    { id: 'output1', label: '输出1', type: 'main' }
  ]
}
```

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 获取详情。

## 📝 许可证

MIT License © 2024

## 🔗 相关项目

- [n8n](https://github.com/n8n-io/n8n) - 灵感来源
- [VueFlow](https://vueflow.dev/) - 底层图编辑库
- [Pinia](https://pinia.vuejs.org/) - 状态管理

---

**让我们一起构建更强大的工作流编辑器！** 🚀

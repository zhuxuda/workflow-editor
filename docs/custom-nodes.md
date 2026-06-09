# 自定义节点开发

## 节点结构

每个节点都是一个 JavaScript 对象，定义了节点的类型、属性、输入/输出等信息。

### 基本示例

```javascript
import { registerNodeType } from '@workflow-editor/core'

const MyCustomNode = {
  // 节点类型标识符（必需）
  type: 'my-custom',
  
  // 显示标签（必需）
  label: '我的自定义节点',
  
  // 节点描述
  description: '这是一个自定义节点的示例',
  
  // 节点图标
  icon: 'icon-name',
  
  // 节点分类
  category: 'custom',
  
  // 输入端口定义
  inputs: [
    {
      id: 'in-0',
      label: '输入',
      type: 'main'
    }
  ],
  
  // 输出端口定义
  outputs: [
    {
      id: 'out-0',
      label: '输出',
      type: 'main'
    },
    {
      id: 'out-error',
      label: '错误',
      type: 'error'
    }
  ],
  
  // 节点属性定义
  properties: {
    name: {
      type: 'string',
      default: '',
      description: '节点名称'
    },
    value: {
      type: 'number',
      default: 0,
      description: '数值参数'
    },
    options: {
      type: 'enum',
      enum: ['option1', 'option2', 'option3'],
      default: 'option1',
      description: '选择选项'
    }
  }
}

// 注册节点
registerNodeType('my-custom', MyCustomNode)
```

## 节点属性类型

### 基本类型

```javascript
{
  properties: {
    // 字符串
    text: {
      type: 'string',
      default: '',
      description: '文本输入'
    },
    
    // 数字
    count: {
      type: 'number',
      default: 0,
      min: 0,
      max: 100,
      description: '数字输入'
    },
    
    // 布尔值
    enabled: {
      type: 'boolean',
      default: true,
      description: '开关'
    },
    
    // 枚举
    status: {
      type: 'enum',
      enum: ['pending', 'running', 'completed'],
      default: 'pending',
      description: '状态选择'
    },
    
    // 对象
    config: {
      type: 'object',
      default: {},
      description: '配置对象'
    },
    
    // 数组
    items: {
      type: 'array',
      default: [],
      description: '数组列表'
    }
  }
}
```

## 输入/输出端口

### 端口类型

```javascript
{
  inputs: [
    // 主数据流
    { id: 'in-0', label: '输入', type: 'main' },
    
    // 数据端口
    { id: 'in-data', label: '数据', type: 'data' },
    
    // 错误处理
    { id: 'in-error', label: '错误', type: 'error' }
  ],
  outputs: [
    { id: 'out-0', label: '成功', type: 'main' },
    { id: 'out-error', label: '失败', type: 'error' }
  ]
}
```

## 完整示例：HTTP 请求节点

```javascript
export const CustomHttpNode = {
  type: 'custom-http',
  label: '自定义 HTTP',
  description: '发送自定义 HTTP 请求',
  icon: 'globe',
  category: 'action',
  
  inputs: [
    { id: 'in-0', label: '触发', type: 'main' }
  ],
  
  outputs: [
    { id: 'out-0', label: '响应', type: 'main' },
    { id: 'out-error', label: '错误', type: 'error' }
  ],
  
  properties: {
    url: {
      type: 'string',
      default: 'https://api.example.com',
      description: 'API URL'
    },
    method: {
      type: 'enum',
      enum: ['GET', 'POST', 'PUT', 'DELETE'],
      default: 'GET',
      description: 'HTTP 方法'
    },
    timeout: {
      type: 'number',
      default: 30000,
      description: '请求超时（毫秒）'
    },
    headers: {
      type: 'object',
      default: {
        'Content-Type': 'application/json'
      },
      description: 'HTTP 头'
    }
  }
}

// 在应用中注册
import { registerNodeType } from '@workflow-editor/core'
registerNodeType('custom-http', CustomHttpNode)
```

## 在编辑器中使用

```javascript
import { registerNodeType } from '@workflow-editor/core'
import { CustomHttpNode } from './customHttpNode.js'

// 应用启动时注册
registerNodeType(CustomHttpNode.type, CustomHttpNode)
```

## 注意事项

1. **节点 ID 唯一性** - 每个节点类型的 `type` 必须全局唯一
2. **端口 ID** - 同一节点内的输入/输出端口 ID 必须唯一
3. **属性默认值** - 为所有属性提供合理的默认值
4. **文档** - 为每个属性提供清晰的 `description`
5. **分类** - 使用合适的 `category` 帮助用户分组和查找

## 调试

在浏览器开发者工具中查看日志：

```javascript
import { getAllNodeTypes } from '@workflow-editor/core'

// 查看所有已注册的节点
console.log(getAllNodeTypes())
```

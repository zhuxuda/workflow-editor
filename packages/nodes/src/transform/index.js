import { NODE_TYPES } from '@workflow-editor/core'

/**
 * Transform Nodes - Transform data
 */

export const JavaScriptCode = {
  type: 'javascript-code',
  label: 'JavaScript 代码',
  description: '执行 JavaScript 代码',
  icon: 'code',
  category: 'transform',
  inputs: [
    { id: 'in-0', label: '输入', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '输出', type: 'main' }
  ],
  properties: {
    code: {
      type: 'string',
      default: '// 输入在 data 变量中\nreturn data',
      description: 'JavaScript 代码'
    }
  }
}

export const JsonTransform = {
  type: 'json-transform',
  label: 'JSON 转换',
  description: '转换 JSON 数据结构',
  icon: 'json',
  category: 'transform',
  inputs: [
    { id: 'in-0', label: '输入', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '输出', type: 'main' }
  ],
  properties: {
    template: {
      type: 'object',
      default: {},
      description: '输出模板'
    }
  }
}

export const DataMapping = {
  type: 'data-mapping',
  label: '数据映射',
  description: '映射字段数据',
  icon: 'shuffle',
  category: 'transform',
  inputs: [
    { id: 'in-0', label: '输入', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '输出', type: 'main' }
  ],
  properties: {
    mappings: {
      type: 'array',
      default: [],
      description: '字段映射规则'
    }
  }
}

export const Merge = {
  type: 'merge',
  label: '合并',
  description: '合并多个数据源',
  icon: 'merge',
  category: 'transform',
  inputs: [
    { id: 'in-0', label: '输入 1', type: 'main' },
    { id: 'in-1', label: '输入 2', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '���出', type: 'main' }
  ],
  properties: {
    mode: {
      type: 'enum',
      enum: ['merge', 'combine', 'append'],
      default: 'merge'
    }
  }
}

export const Filter = {
  type: 'filter',
  label: '筛选',
  description: '根据条件筛选数据',
  icon: 'filter',
  category: 'transform',
  inputs: [
    { id: 'in-0', label: '输入', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '通过', type: 'main' },
    { id: 'out-1', label: '不通过', type: 'main' }
  ],
  properties: {
    condition: {
      type: 'string',
      default: '',
      description: '筛选条件'
    }
  }
}

import { NODE_TYPES } from '@workflow-editor/core'

/**
 * Action Nodes - Perform actions
 */

export const HttpRequest = {
  type: 'http-request',
  label: 'HTTP 请求',
  description: '发送 HTTP 请求',
  icon: 'globe',
  category: 'action',
  inputs: [
    { id: 'in-0', label: '输入', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '成功', type: 'main' },
    { id: 'out-error', label: '错误', type: 'error' }
  ],
  properties: {
    url: {
      type: 'string',
      default: 'https://api.example.com',
      description: '请求 URL'
    },
    method: {
      type: 'enum',
      enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      default: 'GET'
    },
    headers: {
      type: 'object',
      default: {}
    },
    body: {
      type: 'string',
      default: ''
    }
  }
}

export const DatabaseQuery = {
  type: 'database-query',
  label: '数据库查询',
  description: '执行数据库查询',
  icon: 'database',
  category: 'action',
  inputs: [
    { id: 'in-0', label: '输入', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '结果', type: 'main' },
    { id: 'out-error', label: '错误', type: 'error' }
  ],
  properties: {
    connection: {
      type: 'string',
      default: '',
      description: '数据库连接'
    },
    query: {
      type: 'string',
      default: 'SELECT * FROM table',
      description: 'SQL 查询语句'
    }
  }
}

export const SendEmail = {
  type: 'send-email',
  label: '发送邮件',
  description: '发送电子邮件',
  icon: 'mail',
  category: 'action',
  inputs: [
    { id: 'in-0', label: '输入', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '成功', type: 'main' },
    { id: 'out-error', label: '错误', type: 'error' }
  ],
  properties: {
    to: {
      type: 'string',
      default: '',
      description: '收件人邮箱'
    },
    subject: {
      type: 'string',
      default: '',
      description: '邮件主题'
    },
    body: {
      type: 'string',
      default: '',
      description: '邮件内容'
    }
  }
}

export const SendNotification = {
  type: 'send-notification',
  label: '发送通知',
  description: '发送通知消息',
  icon: 'bell',
  category: 'action',
  inputs: [
    { id: 'in-0', label: '输入', type: 'main' }
  ],
  outputs: [
    { id: 'out-0', label: '输出', type: 'main' }
  ],
  properties: {
    channel: {
      type: 'enum',
      enum: ['email', 'sms', 'slack', 'webhook'],
      default: 'email'
    },
    message: {
      type: 'string',
      default: '',
      description: '通知消息'
    }
  }
}

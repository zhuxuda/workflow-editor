import { NODE_TYPES } from '@workflow-editor/core'

/**
 * Trigger Nodes - Start workflow execution
 */

export const ManualTrigger = {
  type: 'manual-trigger',
  label: '手动触发',
  description: '手动触发工作流执行',
  icon: 'play',
  category: 'trigger',
  outputs: [
    { id: 'out-0', label: '输出', type: 'main' }
  ],
  properties: {}
}

export const ScheduleTrigger = {
  type: 'schedule-trigger',
  label: '定时触发',
  description: '按照定时计划触发工作流',
  icon: 'timer',
  category: 'trigger',
  outputs: [
    { id: 'out-0', label: '输出', type: 'main' }
  ],
  properties: {
    schedule: {
      type: 'string',
      default: '0 0 * * *',
      description: 'Cron expression'
    }
  }
}

export const WebhookTrigger = {
  type: 'webhook-trigger',
  label: 'Webhook 触发',
  description: '通过 Webhook 触发工作流',
  icon: 'webhook',
  category: 'trigger',
  outputs: [
    { id: 'out-0', label: '输出', type: 'main' }
  ],
  properties: {
    method: {
      type: 'enum',
      enum: ['GET', 'POST', 'PUT', 'DELETE'],
      default: 'POST'
    }
  }
}

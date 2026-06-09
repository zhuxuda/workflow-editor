/**
 * Built-in nodes registry
 */

import { registerNodeTypes } from '@workflow-editor/core'

// Import trigger nodes
import { ManualTrigger, ScheduleTrigger, WebhookTrigger } from './trigger/index.js'

// Import action nodes
import { HttpRequest, DatabaseQuery, SendEmail, SendNotification } from './action/index.js'

// Import transform nodes
import { JavaScriptCode, JsonTransform, DataMapping, Merge, Filter } from './transform/index.js'

/**
 * Register all built-in nodes
 */
export function registerBuiltInNodes() {
  const nodes = {
    // Trigger nodes
    'manual-trigger': ManualTrigger,
    'schedule-trigger': ScheduleTrigger,
    'webhook-trigger': WebhookTrigger,

    // Action nodes
    'http-request': HttpRequest,
    'database-query': DatabaseQuery,
    'send-email': SendEmail,
    'send-notification': SendNotification,

    // Transform nodes
    'javascript-code': JavaScriptCode,
    'json-transform': JsonTransform,
    'data-mapping': DataMapping,
    'merge': Merge,
    'filter': Filter
  }

  registerNodeTypes(nodes)
}

// Export all nodes
export {
  // Trigger
  ManualTrigger,
  ScheduleTrigger,
  WebhookTrigger,
  // Action
  HttpRequest,
  DatabaseQuery,
  SendEmail,
  SendNotification,
  // Transform
  JavaScriptCode,
  JsonTransform,
  DataMapping,
  Merge,
  Filter
}

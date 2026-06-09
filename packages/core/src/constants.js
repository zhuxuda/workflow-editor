/**
 * Workflow Editor Core Constants
 */

// Node types
export const NODE_TYPES = {
  TRIGGER: 'trigger',
  ACTION: 'action',
  TRANSFORM: 'transform',
  CONDITION: 'condition',
  LOOP: 'loop',
  MERGE: 'merge',
  SWITCH: 'switch',
  CODE: 'code'
};

// Connection types
export const CONNECTION_TYPES = {
  MAIN: 'main',
  DATA: 'data',
  ERROR: 'error',
  LOOP_DATA: 'loop-data'
};

// Execution status
export const EXECUTION_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  SUCCESS: 'success',
  ERROR: 'error',
  WAITING: 'waiting',
  STOPPED: 'stopped'
};

// Handle positions
export const HANDLE_POSITION = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
};

// Node size
export const NODE_SIZE = {
  DEFAULT_WIDTH: 200,
  DEFAULT_HEIGHT: 100,
  MIN_WIDTH: 150,
  MIN_HEIGHT: 60,
  MAX_WIDTH: 400,
  MAX_HEIGHT: 300
};

// Grid settings
export const GRID_SIZE = 20;
export const SNAP_TO_GRID = true;

// Canvas settings
export const CANVAS_DEFAULT_ZOOM = 1;
export const CANVAS_MIN_ZOOM = 0.1;
export const CANVAS_MAX_ZOOM = 3;

// Local storage keys
export const STORAGE_KEYS = {
  WORKFLOW: 'workflow_editor_workflow',
  HISTORY: 'workflow_editor_history',
  SETTINGS: 'workflow_editor_settings'
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_NODE: 'Invalid node configuration',
  INVALID_CONNECTION: 'Invalid connection',
  INVALID_WORKFLOW: 'Invalid workflow structure',
  NODE_NOT_FOUND: 'Node not found',
  CONNECTION_NOT_FOUND: 'Connection not found',
  DUPLICATE_NODE_ID: 'Node ID already exists'
};

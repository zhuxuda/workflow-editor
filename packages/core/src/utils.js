/**
 * Utility functions for workflow editor
 */

import { NODE_SIZE, GRID_SIZE, SNAP_TO_GRID } from './constants.js';

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate edge ID from source and target
 * @param {string} sourceId - Source node ID
 * @param {string} targetId - Target node ID
 * @param {string} sourceHandle - Source handle ID
 * @param {string} targetHandle - Target handle ID
 * @returns {string} Edge ID
 */
export function generateEdgeId(sourceId, targetId, sourceHandle = 'out-0', targetHandle = 'in-0') {
  return `${sourceId}-${sourceHandle}_${targetId}-${targetHandle}`;
}

/**
 * Snap position to grid
 * @param {number} value - Position value
 * @returns {number} Snapped position
 */
export function snapToGrid(value) {
  if (!SNAP_TO_GRID) return value;
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

/**
 * Snap position object to grid
 * @param {{x: number, y: number}} position - Position object
 * @returns {{x: number, y: number}} Snapped position
 */
export function snapPositionToGrid(position) {
  return {
    x: snapToGrid(position.x),
    y: snapToGrid(position.y)
  };
}

/**
 * Validate node structure
 * @param {Object} node - Node object
 * @returns {boolean} True if valid
 */
export function validateNode(node) {
  if (!node || typeof node !== 'object') return false;
  if (!node.id || !node.type) return false;
  if (!node.position || typeof node.position.x !== 'number' || typeof node.position.y !== 'number') {
    return false;
  }
  return true;
}

/**
 * Validate connection structure
 * @param {Object} connection - Connection/edge object
 * @returns {boolean} True if valid
 */
export function validateConnection(connection) {
  if (!connection || typeof connection !== 'object') return false;
  if (!connection.source || !connection.target) return false;
  if (!connection.id) return false;
  return true;
}

/**
 * Validate workflow structure
 * @param {Object} workflow - Workflow object
 * @returns {boolean} True if valid
 */
export function validateWorkflow(workflow) {
  if (!workflow || typeof workflow !== 'object') return false;
  if (!Array.isArray(workflow.nodes) || !Array.isArray(workflow.edges)) return false;
  if (!workflow.nodes.every(validateNode)) return false;
  if (!workflow.edges.every(validateConnection)) return false;
  return true;
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * Get unique array
 * @param {Array} array - Array to deduplicate
 * @returns {Array} Unique array
 */
export function getUnique(array) {
  return [...new Set(array)];
}

/**
 * Find node by ID in array
 * @param {Array} nodes - Nodes array
 * @param {string} id - Node ID
 * @returns {Object|null} Found node or null
 */
export function findNodeById(nodes, id) {
  return nodes.find(node => node.id === id) || null;
}

/**
 * Find edge by ID in array
 * @param {Array} edges - Edges array
 * @param {string} id - Edge ID
 * @returns {Object|null} Found edge or null
 */
export function findEdgeById(edges, id) {
  return edges.find(edge => edge.id === id) || null;
}

/**
 * Get nodes connected to a specific node
 * @param {Array} nodes - All nodes
 * @param {Array} edges - All edges
 * @param {string} nodeId - Target node ID
 * @param {string} direction - 'in' for incoming, 'out' for outgoing
 * @returns {Array} Connected nodes
 */
export function getConnectedNodes(nodes, edges, nodeId, direction = 'both') {
  const connectedNodeIds = new Set();
  
  edges.forEach(edge => {
    if (direction === 'in' && edge.target === nodeId) {
      connectedNodeIds.add(edge.source);
    } else if (direction === 'out' && edge.source === nodeId) {
      connectedNodeIds.add(edge.target);
    } else if (direction === 'both') {
      if (edge.target === nodeId) connectedNodeIds.add(edge.source);
      if (edge.source === nodeId) connectedNodeIds.add(edge.target);
    }
  });
  
  return Array.from(connectedNodeIds)
    .map(id => findNodeById(nodes, id))
    .filter(node => node !== null);
}

/**
 * Calculate bounding box for multiple nodes
 * @param {Array} nodes - Nodes array
 * @returns {{x: number, y: number, width: number, height: number}} Bounding box
 */
export function calculateBoundingBox(nodes) {
  if (nodes.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let minX = nodes[0].position.x;
  let minY = nodes[0].position.y;
  let maxX = nodes[0].position.x + NODE_SIZE.DEFAULT_WIDTH;
  let maxY = nodes[0].position.y + NODE_SIZE.DEFAULT_HEIGHT;

  nodes.forEach(node => {
    const width = node.width || NODE_SIZE.DEFAULT_WIDTH;
    const height = node.height || NODE_SIZE.DEFAULT_HEIGHT;
    
    minX = Math.min(minX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxX = Math.max(maxX, node.position.x + width);
    maxY = Math.max(maxY, node.position.y + height);
  });

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

/**
 * Save to local storage
 * @param {string} key - Storage key
 * @param {*} value - Value to save
 */
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Load from local storage
 * @param {string} key - Storage key
 * @returns {*} Loaded value or null
 */
export function loadFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}

/**
 * Remove from local storage
 * @param {string} key - Storage key
 */
export function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
export function formatDate(date) {
  if (!(date instanceof Date)) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

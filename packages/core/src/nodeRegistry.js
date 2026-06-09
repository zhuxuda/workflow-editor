/**
 * Node Registry - Centralized node type management
 */

const registry = new Map();

/**
 * Register a node type
 * @param {string} type - Node type identifier
 * @param {Object} definition - Node definition
 */
export function registerNodeType(type, definition) {
  if (!type || !definition) {
    throw new Error('Type and definition are required');
  }
  
  if (registry.has(type)) {
    console.warn(`Node type "${type}" is already registered. Overwriting...`);
  }
  
  // Validate required fields
  const requiredFields = ['label', 'component'];
  const missingFields = requiredFields.filter(field => !definition[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  registry.set(type, {
    type,
    label: definition.label,
    description: definition.description || '',
    icon: definition.icon || 'default',
    component: definition.component,
    inputs: definition.inputs || [{ id: 'in-0', label: 'Input', type: 'main' }],
    outputs: definition.outputs || [{ id: 'out-0', label: 'Output', type: 'main' }],
    properties: definition.properties || {},
    ...definition
  });
}

/**
 * Unregister a node type
 * @param {string} type - Node type identifier
 */
export function unregisterNodeType(type) {
  registry.delete(type);
}

/**
 * Get node definition
 * @param {string} type - Node type identifier
 * @returns {Object|null} Node definition or null
 */
export function getNodeDefinition(type) {
  return registry.get(type) || null;
}

/**
 * Get all registered node types
 * @returns {Array} Array of node definitions
 */
export function getAllNodeTypes() {
  return Array.from(registry.values());
}

/**
 * Check if node type exists
 * @param {string} type - Node type identifier
 * @returns {boolean} True if exists
 */
export function hasNodeType(type) {
  return registry.has(type);
}

/**
 * Get nodes by category
 * @param {string} category - Category name
 * @returns {Array} Nodes in category
 */
export function getNodesByCategory(category) {
  return Array.from(registry.values()).filter(node => node.category === category);
}

/**
 * Clear all registered types
 */
export function clearRegistry() {
  registry.clear();
}

/**
 * Register multiple node types
 * @param {Object} definitions - Object with type as key and definition as value
 */
export function registerNodeTypes(definitions) {
  Object.entries(definitions).forEach(([type, definition]) => {
    registerNodeType(type, definition);
  });
}

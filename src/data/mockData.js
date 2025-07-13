/**
 * Mock Data and Configuration
 * 
 * This file contains static data and configuration used throughout the application.
 * It includes node types, default messages, and canvas settings.
 */

import { 
  BiMessageRounded, 
  BiQuestionMark, 
  BiGitBranch, 
  BiSolidZap, 
  BiEdit, 
  BiGlobe, 
  BiTime, 
  BiFlag,
  BiUser,
  BiCog,
  BiPlay
} from 'react-icons/bi';

/**
 * Available Node Types
 * Defines all node types that can be used in the flow builder
 */
export const nodeTypes = [
  { 
    id: 'message', 
    name: 'Message Node', 
    icon: BiMessageRounded, 
    description: 'Send a message to user',
    category: 'communication',
    color: '#25D366',
  },
  { 
    id: 'question', 
    name: 'Question Node', 
    icon: BiQuestionMark, 
    description: 'Ask user a question',
    category: 'interaction',
    color: '#667eea',
  },
  { 
    id: 'condition', 
    name: 'Condition Node', 
    icon: BiGitBranch, 
    description: 'Add conditional logic',
    category: 'logic',
    color: '#f093fb',
  },
  { 
    id: 'action', 
    name: 'Action Node', 
    icon: BiSolidZap, 
    description: 'Perform an action',
    category: 'action',
    color: '#ffeaa7',
  },
  { 
    id: 'input', 
    name: 'Input Node', 
    icon: BiEdit, 
    description: 'Collect user input',
    category: 'interaction',
    color: '#667eea',
  },
  { 
    id: 'api', 
    name: 'API Call', 
    icon: BiGlobe, 
    description: 'Make external API call',
    category: 'action',
    color: '#ffeaa7',
  },
  { 
    id: 'delay', 
    name: 'Delay Node', 
    icon: BiTime, 
    description: 'Add time delay',
    category: 'action',
    color: '#ffeaa7',
  },
  { 
    id: 'end', 
    name: 'End Node', 
    icon: BiFlag, 
    description: 'End conversation',
    category: 'flow',
    color: '#fd79a8',
  },
];

/**
 * Default Messages for Each Node Type
 * These are the initial messages displayed when a node is created
 */
export const defaultMessages = {
  message: 'Hello! How can I help you today?',
  question: 'What would you like to know?',
  condition: 'If condition is true...',
  action: 'Execute action',
  input: 'Please provide your input',
  api: 'Making API call...',
  delay: 'Please wait...',
  end: 'Thank you for using our service!',
};

/**
 * Canvas Configuration
 * Settings for canvas behavior and appearance
 */
export const canvasSettings = {
  gridSize: 20,                           // Grid snap size in pixels
  defaultNodePosition: { x: 200, y: 200 }, // Default position for new nodes
  nodeSpacing: 50,                        // Spacing between auto-placed nodes
  minZoom: 0.1,                          // Minimum zoom level
  maxZoom: 3.0,                          // Maximum zoom level
  defaultZoom: 1.0,                      // Default zoom level
  panSpeed: 1.0,                         // Pan sensitivity
  zoomSpeed: 0.1,                        // Zoom sensitivity
};

/**
 * Node Categories
 * Used for organizing nodes in the sidebar
 */
export const nodeCategories = [
  {
    id: 'communication',
    name: 'Communication',
    color: '#25D366',
    icon: BiMessageRounded,
    description: 'Nodes for sending messages and communicating with users',
  },
  {
    id: 'interaction',
    name: 'User Interaction',
    color: '#667eea',
    icon: BiUser,
    description: 'Nodes for collecting user input and interactions',
  },
  {
    id: 'logic',
    name: 'Logic & Flow',
    color: '#f093fb',
    icon: BiGitBranch,
    description: 'Nodes for conditional logic and flow control',
  },
  {
    id: 'action',
    name: 'Actions',
    color: '#ffeaa7',
    icon: BiSolidZap,
    description: 'Nodes for performing actions and API calls',
  },
  {
    id: 'flow',
    name: 'Flow Control',
    color: '#fd79a8',
    icon: BiPlay,
    description: 'Nodes for managing conversation flow',
  },
];

/**
 * Application Theme Settings
 */
export const themes = {
  dark: {
    name: 'Dark',
    primary: '#1a1a1a',
    secondary: '#262626',
    accent: '#1a5a1a',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#404040',
    background: '#0d0d0d',
  },
  light: {
    name: 'Light',
    primary: '#ffffff',
    secondary: '#f5f5f5',
    accent: '#4a90e2',
    text: '#333333',
    textSecondary: '#666666',
    border: '#e0e0e0',
    background: '#ffffff',
  },
};

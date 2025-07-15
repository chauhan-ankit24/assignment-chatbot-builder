import { 
  BiMessageRounded, 
  BiPlayCircle,
  BiStopCircle
} from 'react-icons/bi';

export const nodeTypes = [
  { 
    id: 'start', 
    name: 'Start Node', 
    icon: BiPlayCircle, 
    description: 'Start of the conversation flow',
    category: 'flow',
    color: '#00b894',
  },
  { 
    id: 'message', 
    name: 'Message Node', 
    icon: BiMessageRounded, 
    description: 'Send a message to user',
    category: 'communication',
    color: '#25D366',
  },
  { 
    id: 'end', 
    name: 'End Node', 
    icon: BiStopCircle, 
    description: 'End conversation',
    category: 'flow',
    color: '#e17055',
  },
];

export const defaultMessages = {
  start: 'Flow started - ready to begin!',
  message: 'Hello! How can I help you today?',
  end: 'Thank you for using our service! Have a great day!',
};

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
    id: 'flow',
    name: 'Flow Control',
    color: '#00b894',
    icon: BiPlayCircle,
    description: 'Nodes for managing conversation flow',
  },
  {
    id: 'communication',
    name: 'Communication',
    color: '#25D366',
    icon: BiMessageRounded,
    description: 'Nodes for sending messages and communicating with users',
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

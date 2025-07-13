export const nodeTypes = [
  { 
    id: 'message', 
    name: 'Message Node', 
    icon: '💬', 
    description: 'Send a message to user',
    category: 'communication'
  },
  { 
    id: 'question', 
    name: 'Question Node', 
    icon: '❓', 
    description: 'Ask user a question',
    category: 'interaction'
  },
  { 
    id: 'condition', 
    name: 'Condition Node', 
    icon: '🔀', 
    description: 'Add conditional logic',
    category: 'logic'
  },
  { 
    id: 'action', 
    name: 'Action Node', 
    icon: '⚡', 
    description: 'Perform an action',
    category: 'action'
  },
  { 
    id: 'input', 
    name: 'Input Node', 
    icon: '📝', 
    description: 'Collect user input',
    category: 'interaction'
  },
  { 
    id: 'api', 
    name: 'API Call', 
    icon: '🌐', 
    description: 'Make external API call',
    category: 'action'
  },
  { 
    id: 'delay', 
    name: 'Delay Node', 
    icon: '⏱️', 
    description: 'Add time delay',
    category: 'action'
  },
  { 
    id: 'end', 
    name: 'End Node', 
    icon: '🏁', 
    description: 'End conversation',
    category: 'flow'
  }
];

export const defaultMessages = {
  message: 'If you like this project, give it a star on GitHub! ⭐ and connect with me on LinkedIn 🚀. See top right corner or in bottom bar (mobile)',
  question: 'What would you like to know?',
  condition: 'If condition is true...',
  action: 'Execute action',
  input: 'Please provide your input',
  api: 'Making API call...',
  delay: 'Waiting...',
  end: 'Conversation ended'
};

export const canvasSettings = {
  gridSize: 20,
  defaultNodePosition: { x: 200, y: 200 },
  nodeSpacing: 50
};

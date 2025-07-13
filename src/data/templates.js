export const flowTemplates = [
  {
    id: 'customer_support',
    name: 'Customer Support Flow',
    description: 'A basic customer support chatbot flow',
    nodes: [
      {
        id: 'start_1',
        type: 'message',
        position: { x: 100, y: 100 },
        data: {
          message: 'Hello! How can I help you today?'
        }
      },
      {
        id: 'question_1',
        type: 'question',
        position: { x: 100, y: 250 },
        data: {
          message: 'What type of issue are you experiencing?',
          options: ['Technical Issue', 'Billing Question', 'General Inquiry']
        }
      }
    ],
    connections: [
      { from: 'start_1', to: 'question_1' }
    ]
  },
  {
    id: 'lead_generation',
    name: 'Lead Generation Flow',
    description: 'Collect leads and qualify prospects',
    nodes: [
      {
        id: 'welcome_1',
        type: 'message',
        position: { x: 100, y: 100 },
        data: {
          message: 'Welcome! Let me help you find the perfect solution.'
        }
      },
      {
        id: 'input_1',
        type: 'input',
        position: { x: 100, y: 250 },
        data: {
          message: 'What\'s your name?',
          inputType: 'text'
        }
      }
    ],
    connections: [
      { from: 'welcome_1', to: 'input_1' }
    ]
  }
];

export const nodeCategories = [
  {
    id: 'communication',
    name: 'Communication',
    color: '#25D366',
    icon: '💬'
  },
  {
    id: 'interaction',
    name: 'User Interaction',
    color: '#667eea',
    icon: '👤'
  },
  {
    id: 'logic',
    name: 'Logic & Flow',
    color: '#f093fb',
    icon: '🔀'
  },
  {
    id: 'action',
    name: 'Actions',
    color: '#ffeaa7',
    icon: '⚡'
  },
  {
    id: 'flow',
    name: 'Flow Control',
    color: '#fd79a8',
    icon: '🏁'
  }
];

export const connectionTypes = [
  {
    id: 'default',
    name: 'Default',
    color: '#1a5a1a',
    style: 'solid'
  },
  {
    id: 'conditional',
    name: 'Conditional',
    color: '#f093fb',
    style: 'dashed'
  },
  {
    id: 'fallback',
    name: 'Fallback',
    color: '#ff6b6b',
    style: 'dotted'
  }
];

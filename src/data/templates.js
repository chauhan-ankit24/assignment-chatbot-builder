/**
 * Flow Templates and Presets
 * 
 * This file contains pre-built flow templates that users can start with,
 * as well as configuration for connections and node categories.
 */

/**
 * Pre-built Flow Templates
 * These templates provide starting points for common use cases
 */
export const flowTemplates = [
  {
    id: 'customer_support',
    name: 'Customer Support Flow',
    description: 'A comprehensive customer support chatbot flow with escalation paths',
    thumbnail: '🎧',
    category: 'support',
    nodes: [
      {
        id: 'welcome_1',
        type: 'message',
        position: { x: 100, y: 100 },
        data: {
          message: 'Hello! Welcome to our customer support. How can I help you today?',
        },
      },
      {
        id: 'support_question',
        type: 'question',
        position: { x: 100, y: 250 },
        data: {
          message: 'What type of issue are you experiencing?',
          options: [
            'Technical Issue',
            'Billing Question',
            'General Inquiry',
            'Report a Bug',
          ],
        },
      },
      {
        id: 'escalation',
        type: 'condition',
        position: { x: 100, y: 400 },
        data: {
          message: 'Would you like to speak with a human agent?',
          conditions: ['technical_issue', 'billing_question'],
        },
      },
    ],
    connections: [
      { from: 'welcome_1', to: 'support_question' },
      { from: 'support_question', to: 'escalation' },
    ],
  },
  {
    id: 'lead_generation',
    name: 'Lead Generation Flow',
    description: 'Collect leads and qualify prospects effectively',
    thumbnail: '📈',
    category: 'marketing',
    nodes: [
      {
        id: 'welcome_lead',
        type: 'message',
        position: { x: 100, y: 100 },
        data: {
          message: 'Welcome! Let me help you find the perfect solution for your needs.',
        },
      },
      {
        id: 'name_input',
        type: 'input',
        position: { x: 100, y: 250 },
        data: {
          message: 'What\'s your name?',
          inputType: 'text',
          required: true,
        },
      },
      {
        id: 'email_input',
        type: 'input',
        position: { x: 100, y: 400 },
        data: {
          message: 'What\'s your email address?',
          inputType: 'email',
          required: true,
        },
      },
      {
        id: 'qualification',
        type: 'question',
        position: { x: 100, y: 550 },
        data: {
          message: 'What\'s your company size?',
          options: ['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees'],
        },
      },
    ],
    connections: [
      { from: 'welcome_lead', to: 'name_input' },
      { from: 'name_input', to: 'email_input' },
      { from: 'email_input', to: 'qualification' },
    ],
  },
  {
    id: 'simple_faq',
    name: 'Simple FAQ Bot',
    description: 'Basic FAQ chatbot with common questions and answers',
    thumbnail: '❓',
    category: 'support',
    nodes: [
      {
        id: 'faq_welcome',
        type: 'message',
        position: { x: 100, y: 100 },
        data: {
          message: 'Hi! I\'m here to answer your frequently asked questions.',
        },
      },
      {
        id: 'faq_categories',
        type: 'question',
        position: { x: 100, y: 250 },
        data: {
          message: 'What would you like to know about?',
          options: [
            'Pricing',
            'Features',
            'Getting Started',
            'Troubleshooting',
            'Contact Us',
          ],
        },
      },
    ],
    connections: [
      { from: 'faq_welcome', to: 'faq_categories' },
    ],
  },
  {
    id: 'onboarding',
    name: 'User Onboarding Flow',
    description: 'Guide new users through the onboarding process',
    thumbnail: '🚀',
    category: 'onboarding',
    nodes: [
      {
        id: 'onboarding_welcome',
        type: 'message',
        position: { x: 100, y: 100 },
        data: {
          message: 'Welcome to our platform! Let\'s get you set up in just a few steps.',
        },
      },
      {
        id: 'role_selection',
        type: 'question',
        position: { x: 100, y: 250 },
        data: {
          message: 'What\'s your role?',
          options: [
            'Developer',
            'Designer',
            'Product Manager',
            'Marketing',
            'Other',
          ],
        },
      },
      {
        id: 'setup_complete',
        type: 'message',
        position: { x: 100, y: 400 },
        data: {
          message: 'Great! Your account is now set up. Let\'s explore the features!',
        },
      },
    ],
    connections: [
      { from: 'onboarding_welcome', to: 'role_selection' },
      { from: 'role_selection', to: 'setup_complete' },
    ],
  },
];

/**
 * Template Categories
 * Used for organizing templates in the UI
 */
export const templateCategories = [
  {
    id: 'support',
    name: 'Customer Support',
    icon: '🎧',
    color: '#4a90e2',
    description: 'Templates for customer service and support workflows',
  },
  {
    id: 'marketing',
    name: 'Marketing & Sales',
    icon: '📈',
    color: '#7ed321',
    description: 'Templates for lead generation and marketing campaigns',
  },
  {
    id: 'onboarding',
    name: 'User Onboarding',
    icon: '🚀',
    color: '#f5a623',
    description: 'Templates for guiding new users through setup processes',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛒',
    color: '#d0021b',
    description: 'Templates for online shopping and order management',
  },
];

/**
 * Connection Types Configuration
 * Defines how nodes can be connected with different styles
 */
export const connectionTypes = [
  {
    id: 'default',
    name: 'Default',
    color: '#1a5a1a',
    style: 'solid',
    description: 'Standard connection between nodes',
  },
  {
    id: 'conditional',
    name: 'Conditional',
    color: '#f093fb',
    style: 'dashed',
    description: 'Connection based on conditions',
  },
  {
    id: 'fallback',
    name: 'Fallback',
    color: '#ff6b6b',
    style: 'dotted',
    description: 'Fallback or error handling path',
  },
  {
    id: 'timeout',
    name: 'Timeout',
    color: '#ffa500',
    style: 'dashed',
    description: 'Connection after timeout',
  },
];

/**
 * Node Categories (re-export from mockData for consistency)
 */
export { nodeCategories } from './mockData';

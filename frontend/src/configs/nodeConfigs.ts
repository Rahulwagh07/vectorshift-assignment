import { Position } from 'reactflow';

export const nodeConfigs = {
  input: {
    id:1,
    label: 'Input',
    fields: [
      { 
        name: 'Field Name', 
        type: 'text' as const,
        placeholder: 'input_1', 
        initialValue: 'input_1',
        handleId: 'value'
      },
      {
        name: 'Type',
        type: 'select' as const,
        options: ['text', 'file'],
        initialValue: 'text'
      }
    ],
    handles: [
      {
        type: 'source' as const,
        position: Position.Right,
        id: 'value',
        label: 'Value'
      }
    ],
  },

  output: {
    id:2,
    label: 'Output',
    fields: [
      { 
        name: 'Field Name', 
        type: 'text',
        handleId: 'input'
      },
      {
        name: 'Type',
        type: 'select' as const,
        options: ['text', 'file'],
        initialValue: 'text'
      }
    ],
    handles: [
      { 
        type: 'target', 
        position: Position.Left, 
        id: 'input',
        label: 'Input' 
      }
    ],
  },

  llm: {
    id:3,
    label: 'LLM',
    fields: [
      { 
        name: 'System Message', 
        type: 'textArea',
        placeholder: 'Enter system message',
        handleId: 'system'
      },
      { 
        name: 'Prompt Template', 
        type: 'textArea',
        placeholder: 'Enter prompt template',
        handleId: 'prompt'
      },
      {
        name: 'Model',
        type: 'select',
        options: ['GPT-3.5', 'GPT-4', 'Claude'],
        initialValue: 'GPT-3.5'
      }
    ],
    handles: [
      { 
        type: 'target', 
        position: Position.Left, 
        id: 'system',
        label: 'System' 
      },
      { 
        type: 'target', 
        position: Position.Left, 
        id: 'prompt',
        label: 'Prompt' 
      },
      { 
        type: 'source', 
        position: Position.Right, 
        id: 'response',
        label: 'Response' 
      }
    ],
  },

  text: {
    id:4,
    label: 'Text',
    fields: [
      { 
        name: 'Text Input', 
        type: 'textNode', 
        placeholder: 'Enter text',
        initialValue: '',
        handleId: '0'
      }
    ],
    handles: [
      { 
        type: 'source', 
        position: Position.Right, 
        id: '0',
        label: 'Output' 
      }
    ],
  },

  integration: {
    id:5,
    label: 'Integration',
    fields: [
      {
        name: 'Action',
        type: 'select',
        options: ['Send Email', 'HTTP Request', 'Database Query'],
        initialValue: 'Send Email'
      },
      {
        name: 'Button',
        type: 'button',
        icon: 'FiSend',
        text: 'Execute',
        variant: 'primary'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'input',
        label: 'Input'
      },
      {
        type: 'source',
        position: Position.Right,
        id: 'output',
        label: 'Output'
      }
    ]
  },
}

export type NodeConfigType = typeof nodeConfigs;
export type NodeTypes = keyof NodeConfigType;


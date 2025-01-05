import { Position } from 'reactflow';
import { NodeField } from '../types/node';

export const nodeConfigs = {
  input: {
    id: 1,
    label: 'Input',
    fields: [
      {
        name: 'Field Name',
        type: NodeField.Text,
        placeholder: 'input_1',
        initialValue: 'input_1',
        handleId: 'Value'
      },
      {
        name: 'Type',
        type: NodeField.Select,
        options: ['Text', 'File'],
        initialValue: 'Text'
      }
    ],
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: 'value',
        label: 'Input'
      }
    ],
  },

  output: {
    id: 2,
    label: 'Output',
    fields: [
      {
        name: 'Field Name',
        type: NodeField.Text,
        handleId: 'input'
      },
      {
        name: 'Type',
        type: NodeField.Select,
        options: ['text', 'file'],
        initialValue: 'text'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'input',
        label: ''
      }
    ],
  },

  llm: {
    id: 3,
    label: 'LLM',
    fields: [
      {
        name: 'System Message',
        type: NodeField.TextArea,
        handleId: 'system'
      },
      {
        name: 'Prompt Template',
        type: NodeField.TextArea,
        handleId: 'prompt'
      },
      {
        name: 'Model',
        type: NodeField.Select,
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
        label: 'Output'
      }
    ],
  },

  text: {
    id: 4,
    label: 'Text',
    fields: [
      {
        name: 'Text Input',
        type: NodeField.TextEditor,
        placeholder: '',
        initialValue: '',
        handleId: '0'
      }
    ],
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: 'Text Input',
        label: 'Output'
      }
    ],
  },

  integration: {
    id: 5,
    label: 'Integration',
    fields: [
      {
        name: 'Action',
        type: NodeField.Select,
        options: ['Send Email', 'Send Email', 'Send Reply'],
        initialValue: 'Send Email'
      },
      {
        type: NodeField.Button,
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


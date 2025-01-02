import { Position } from 'reactflow';

export const nodeConfigs = {
  input: {
    label: 'Input',
    fields: [
      { name: 'Field Name', type: 'text', placeholder: 'input_1', initialValue:'input_1' },
      { name: 'Type', type: 'select', options: ['Text', 'File'] },
    ],
    handles: [
      { type: 'source', position: Position.Right, id: 'value' },
    ],
  },
  output: {
    label: 'Output',
    fields: [
      { name: 'Field Name', type: 'text' },
      { name: 'Type', type: 'select', options: ['Text', 'File'] },
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'value' },
    ],
  },
  llm: {
    label: 'LLM',
    fields: [
      { name: 'model', type: 'number' },
      { name: 'prompt', type: 'number' }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'system'},
      { type: 'target', position: Position.Left, id: 'prompt'},
      { type: 'source', position: Position.Right, id: 'response' },
    ],
  },
};

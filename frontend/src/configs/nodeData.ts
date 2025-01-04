import { NodeType } from '../types/node';
import { IconName } from './icons';

interface NodeDataConfig {
  type: NodeType;
  label: string;
  icon: IconName;
}

const createNode = (type: NodeType, label: string, icon: IconName): NodeDataConfig => {
  return { type, label, icon };
};

export const nodes: NodeDataConfig[] = [
  createNode('input', 'Input', 'input'),
  createNode('output', 'Output', 'output'),
  createNode('text', 'Text', 'text'),
  createNode('llm', 'LLM', 'llm'),
  createNode('integration', 'Integration', 'integration'),
];


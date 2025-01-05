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
  createNode(NodeType.Input, 'Input', 'input'),
  createNode(NodeType.Output, 'Output', 'output'),
  createNode(NodeType.Text, 'Text', 'text'),
  createNode(NodeType.Llm, 'LLM', 'llm'),
  createNode(NodeType.Integration, 'Integration', 'integration'),
];


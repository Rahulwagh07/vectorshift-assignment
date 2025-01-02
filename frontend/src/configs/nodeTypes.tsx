import React from 'react';
import { NodeProps, NodeTypes } from 'reactflow';
import { BaseNode } from '../components/nodes/BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const nodeTypes: NodeTypes = Object.keys(nodeConfigs).reduce((acc, key) => {
  acc[key] = (props: NodeProps) => <BaseNode {...props} config={nodeConfigs[key]} handles={nodeConfigs[key].handles} />;
  return acc;
}, {} as NodeTypes);


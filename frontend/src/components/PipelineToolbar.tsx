import React from 'react';
import { DraggableNode } from './nodes/DraggableNode';
import { nodes } from '../configs/nodeData';

export const PipelineToolbar: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Pipeline Builder</h2>
      <div className="flex flex-wrap gap-4">
        {nodes.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} iconName={node.iconName} />
        ))}
      </div>
    </div>
  );
};


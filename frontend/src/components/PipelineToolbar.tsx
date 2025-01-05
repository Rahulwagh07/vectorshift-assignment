import React from "react";
import { DraggableNode } from "./nodes/DraggableNode";
import { nodes } from "../configs/nodeData";

export const PipelineToolbar: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white border border-gray-200 rounded-lg relative z-10">
      {nodes.map((node) => (
        <DraggableNode
          key={node.type}
          type={node.type}
          label={node.label}
          icon={node.icon}
        />
      ))}
    </div>
  );
};

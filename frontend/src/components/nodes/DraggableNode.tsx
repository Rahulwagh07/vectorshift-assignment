import React from "react";
import { NodeTypes } from "../../configs/nodeConfigs";
import { nodeConfigs } from "../../configs/nodeConfigs";
import { Icons, IconName } from "../../configs/icons";
import { IconRenderer } from "../ui/RenderIcon";
import { useStore } from "../../store";

interface NodeProps {
  type: NodeTypes;
  label: string;
  icon: IconName;
}

export const DraggableNode: React.FC<NodeProps> = ({ type, label, icon }) => {
  const IconComponent = Icons[icon];
  const { getNodeID, addNode } = useStore();

  const onClick = () => {
    const newNode = {
      id: getNodeID(type),
      type: type,
      position: { x: 100, y: 100 },
      data: {
        config: nodeConfigs[type as keyof typeof nodeConfigs],
      },
    };

    addNode(newNode);
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        nodeType: type,
        config: nodeConfigs[type as keyof typeof nodeConfigs],
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 p-3 rounded-lg bg-white border border-gray-200 cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm"
      onDragStart={onDragStart}
      onClick={onClick}
      draggable
    >
      {IconComponent && (
        <IconRenderer
          icon={IconComponent}
          className="w-6 h-6 text-gray-700 mb-2"
        />
      )}
      <span className="text-xs text-gray-600 text-center font-medium">
        {label}
      </span>
    </div>
  );
};

import React from 'react';
import * as Icons from 'react-icons/fi';

interface NodeProps {
  type: string;
  label: string;
  iconName: keyof typeof Icons;
}

export const DraggableNode: React.FC<NodeProps> = ({ type, label, iconName }) => {
  const Icon = Icons[iconName];

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.cursor = 'grabbing';
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.cursor = 'grab';
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-24 h-20 rounded-lg bg-white shadow-md cursor-grab transition-all hover:shadow-lg"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      <Icon size={24} className="text-gray-600 mb-2" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};


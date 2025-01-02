import React, { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../../store';
import { X } from 'lucide-react';
import * as Icons from "react-icons/fi";
import { nodes } from '../../configs/nodeData';

interface NodeProps {
  id: string;
  data: Record<string, any>;
  type: string;
  handles: {
    type: 'source' | 'target';
    position: Position;
    id: string;
    style?: React.CSSProperties;
  }[];
  config?: {
    label: string;
    fields: { name: string; type: string; placeholder?: string, initialValue?: string; options?: string[] }[];
  };
}

export const BaseNode = memo(({ id, data, type, handles, config }: NodeProps) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const onNodesChange = useStore((state) => state.onNodesChange);

  const handleChange = useCallback(
    (field: string, value: any) => {
      updateNodeData(id, { [field]: value });
    },
    [id, updateNodeData]
  );

  const handleRemoveNode = useCallback(() => {
    onNodesChange([{ type: 'remove', id }]);
  }, [id, onNodesChange]);

  const nodeConfig = nodes.find((node) => node.label === config?.label);
  const iconName = nodeConfig ? nodeConfig.iconName : null;
  const Icon = iconName ? Icons[iconName] : null;
  
  const baseHandleStyles = {
    width: 8,
    height: 8,
    background: '#22c55e',
    border: '2px solid white',
    borderRadius: '50%',
    zIndex: 1,
  };

  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow-sm relative">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <div className='flex items-center justify-center'>
          {Icon && <Icon size={12} className="text-gray-600 mr-2" />}
          <span className="text-xs font-medium text-gray-700">{config?.label || type}</span>
        </div>
        <button
          onClick={handleRemoveNode}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Remove node"
        >
          <X size={12} />
        </button>
      </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            ...baseHandleStyles,
            ...handle.style,
          }}
        />
      ))}

      <div className="p-3 space-y-3">
        {config?.fields?.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="text-xs text-start text-gray-500">{field.name}</label>
            {field.type === 'select' ? (
              <select
                value={data[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select {field.name}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={data[field.name] || field.initialValue}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={`${field?.placeholder ? field?.placeholder : ""}`}
                className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

BaseNode.displayName = 'BaseNode';
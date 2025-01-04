import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../../store';
import { X } from 'lucide-react';
import { Icons } from '../../configs/icons';
import { nodes } from '../../configs/nodeData';
import { NodeHandleConfig, NodeProps } from '../../types/node';
import { generateVariableHandles } from '../../lib/utils';
import { RenderField } from './RenderField';
import { IconRenderer } from '../ui/RenderIcon';

export const BaseNode = memo(({ id, data, type, handles, config, selected }: NodeProps) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const updateNodeHandles = useStore((state) => state.updateNodeHandles);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const updateNodeInternals = useUpdateNodeInternals();

  const [localData, setLocalData] = useState(data);
  const [previousHandles, setPreviousHandles] = useState<any[]>(data.dynamicHandles || []);

  useEffect(() => {
    if (data['Text Input']) {
      handleChange('Text Input', data['Text Input']);
    }
  }, []);

  const handleChange = useCallback(
    (field: string, value: any) => {
      const updatedData = { ...localData, [field]: value };
      setLocalData(updatedData);
      updateNodeData(id, updatedData);
  
      if (field === 'Text Input') {
        const staticHandlesCount = handles.length;
        const variables = generateVariableHandles(value);
        const newVariableHandles = variables.map((_, index) => ({
          type: 'target' as const,
          position: Position.Left,
          id: `${id}-dhandle-${index}`,
          label: variables[index].slice(0, 12),
          style: { 
            top: `${index === 0 ? '' : `${(index + staticHandlesCount) * 14}px`}`,
          },
        }));
        
        updateNodeHandles(id, newVariableHandles, previousHandles);
        setPreviousHandles(newVariableHandles);
        updateNodeInternals(id);
      }
    },
    [id, localData, updateNodeData, updateNodeHandles, previousHandles, updateNodeInternals, handles]
  );

  const handleRemoveNode = useCallback(() => {
    onNodesChange([{ type: 'remove', id }]);
  }, [id, onNodesChange]);

  const nodeConfig = nodes.find((node) => node.label === config?.label);
  const IconComponent = nodeConfig ? Icons[nodeConfig.icon] : null;
  
  const handlesByFieldId = useMemo(() => 
    handles.reduce<Record<string, any>>((acc, handle) => {
      acc[handle.id] = handle;
      return acc;
    }, {}),
    [handles]
  );

  const dynamicHandlesElements = useMemo(() => 
    localData?.dynamicHandles?.map((handle: NodeHandleConfig) => (
      <React.Fragment key={handle.id}>
        <Handle
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
        <span 
          className="absolute text-[10px] text-gray-400"
          style={{
            right: -60,
            top: handle.style?.top || '50%',
            transform: 'translateY(-50%)'
          }}
        >
          {handle.label}
        </span>
      </React.Fragment>
    )),
    [localData?.dynamicHandles]
  );

  const fieldHandleIds = useMemo(() => 
    new Set(config?.fields?.map(field => field.handleId).filter(Boolean) || []),
    [config?.fields]
  );

  const remainingHandles = useMemo(() => 
    handles.filter(handle => !fieldHandleIds.has(handle.id)),
    [handles, fieldHandleIds]
  );

  const remainingHandlesElements = useMemo(() => 
    remainingHandles.map(handle => (
      <React.Fragment key={handle.id}>
        <Handle
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            ...(handle.style || {}),
            position: 'absolute',
            top: handle.style?.top || '50%',
            transform: 'translateX(0)',
            ...(handle.position === Position.Left 
              ? { left: -7 } 
              : { right: -7 })
          }}
        />
        {handle.label && (
          <span 
            className="absolute text-[10px] text-gray-400"
            style={{
              ...(handle.position === Position.Left 
                ? { left: -60 } 
                : { right: -60 }),
              top: handle.style?.top || '50%',
              transform: 'translateY(-50%)'
            }}
          >
            {handle.label}
          </span>
        )}
      </React.Fragment>
    )),
    [remainingHandles]
  );

  return (
    <div className={`bg-white border rounded-lg shadow-sm relative min-h-[100px] transition-all !important
      ${selected 
        ? '!border-blue-500 !shadow-md !ring-2 !ring-blue-200' 
        : '!border-gray-200'
      }`}
    >
      <div className={`flex items-center justify-between px-3 py-2 border-b transition-colors
        ${selected ? '!border-blue-200' : '!border-gray-100'}`}
      >
        <div className='flex items-center justify-center'>
          {IconComponent && (
            <IconRenderer 
              icon={IconComponent} 
              className="w-4 h-4 text-gray-600 mr-2" 
            />
          )}
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

      {dynamicHandlesElements}
      {remainingHandlesElements}

      <div className="p-3 space-y-3">
        {config?.fields?.map((field) => (
          <div key={field.name} className="flex flex-col gap-1 relative">
            <label className="text-xs text-start text-gray-500">{field.name}</label>
            {field.handleId && handlesByFieldId[field.handleId] && (
              <>
                <Handle
                  type={handlesByFieldId[field.handleId].type}
                  position={handlesByFieldId[field.handleId].position}
                  id={handlesByFieldId[field.handleId].id}
                  style={{
                    ...(handlesByFieldId[field.handleId].style || {}),
                    top: '70%',
                    transform: 'translateY(-50%)',
                    ...(handlesByFieldId[field.handleId].position === Position.Left 
                      ? { left: -20 } 
                      : { right: -20 })
                  }}
                />
                <span 
                  className="absolute text-[10px] text-gray-400"
                  style={{
                    ...(handlesByFieldId[field.handleId].position === Position.Left 
                      ? { left: -60 } 
                      : { right: -60 }),
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  {handlesByFieldId[field.handleId].label}
                </span>
              </>
            )}
            {RenderField(field, localData[field.name] || field.initialValue || '', (value) => handleChange(field.name, value))}
          </div>
        ))}
      </div>
    </div>
  );
});

BaseNode.displayName = 'BaseNode';
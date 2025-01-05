import { useState, useCallback, useEffect } from 'react';
import { Position } from 'reactflow';
import { useStore } from '../store';
import { generateVariableHandles } from '../lib/utils';
import { NodeHandleConfig } from '../types/node';

export const useNodeData = (id: string, initialData: any, initialHandles: any[]) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const updateNodeHandles = useStore((state) => state.updateNodeHandles);
  const [localData, setLocalData] = useState(initialData);
  const [previousHandles, setPreviousHandles] = useState<NodeHandleConfig[]>(initialData.dynamicHandles || []);

  useEffect(() => {
    if (initialData['Text Input']) {
      handleChange('Text Input', initialData['Text Input']);
    }
  }, []);

  const handleChange = useCallback(
    (field: string, value: any) => {
      const updatedData = { ...localData, [field]: value };
      setLocalData(updatedData);
      updateNodeData(id, updatedData);

      if (field === 'Text Input') {
        const staticHandlesCount = initialHandles.length;
        const variables = generateVariableHandles(value);
        const newVariableHandles = variables.map((_variable, index) => ({
          type: 'target' as const,
          position: Position.Left,
          id: `${id}-dhandle-${index}`,
          // label: variable.slice(0, 12),
          label: '',
          style: {
            top: `${index === 0 ? '' : `${(index + staticHandlesCount) * 14}px`}`,
          },
        }));

        updateNodeHandles(id, newVariableHandles, previousHandles);
        setPreviousHandles(newVariableHandles);
      }
    },
    [id, localData, updateNodeData, updateNodeHandles, previousHandles, initialHandles]
  );

  return { localData, handleChange, previousHandles };
};


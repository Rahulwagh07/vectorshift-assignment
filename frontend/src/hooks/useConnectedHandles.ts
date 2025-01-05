import { useCallback } from 'react';
import { useStore } from '../store';

export const useConnectedHandles = (nodeId: string) => {
  const edges = useStore((state) => state.edges);

  const isHandleConnected = useCallback((handleId: string) => {
    return edges.some(edge =>
      (edge.sourceHandle === handleId && edge.source === nodeId) ||
      (edge.targetHandle === handleId && edge.target === nodeId)
    );
  }, [edges, nodeId]);

  return { isHandleConnected };
};

